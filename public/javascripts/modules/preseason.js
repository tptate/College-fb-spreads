const buttons = document.querySelectorAll('.team');
let champNum = 0;

function selectWinner(button, hide=true) {
  const name = button.getAttribute('name');
  const matchUp = document.getElementsByName(name);
  const teamName = button.getAttribute('value');
  const teamRadios = document.querySelectorAll(`input[value="${teamName}"]`);
  teamRadios.forEach(teamRadio => teamRadio.checked = true);
  if(hide) {
    matchUp.forEach(team => {
      team.classList.remove('active');
      team.classList.toggle('hidden');
    });
    button.classList.add('active');
    button.classList.toggle('hidden');
  } else {
    matchUp.forEach(team => {
      team.classList.remove('active');
      team.classList.remove('hidden');
    });
  }

  const pointsDisplay = document.querySelectorAll('.points');
  pointsDisplay.forEach((pointDisplay, i) => {
    if(pointDisplay.getAttribute('id') === button.getAttribute('name')) {
      pointDisplay.classList.toggle('hiddenPoints');
      if(`${teamName.split(" ").length}` > 1) {
        pointDisplay.classList.toggle(`${teamName.split(" ")[0]}`);
        pointDisplay.classList.toggle(`${teamName.split(" ")[1]}`);
      } else {
        pointDisplay.classList.toggle(`${teamName}`);
      };
      pointDisplay.innerHTML = `Worth ${button.getAttribute('data-points')} Point(s)`;
      champNum = ((i+1) % 3)

      if(!hide) {
        pointDisplay.classList = 'points hiddenPoints';
      }
    }
    
  });

  const pointsInput = document.getElementsByName(`${name}Points`);
  pointsInput.forEach(point => {
    point.setAttribute('value', `${button.getAttribute('data-points')}`);
  });
}

buttons.forEach(button => button.addEventListener('click', function(e) {
  e.preventDefault;
  const name = this.getAttribute('name');
  const teamName = this.getAttribute('value');
  selectWinner(this);

  // Championship Games
  const championshipTeams = document.querySelectorAll(`.${this.getAttribute('data-conference')}`);
  if(champNum !== 0) {
    const divisionLabel = (championshipTeams[(champNum-1)*2]);
    const divisionInput = (championshipTeams[(champNum-1)*2+1]);
    divisionLabel.innerHTML = `<p>${teamName}</p>`;
    divisionLabel.setAttribute('value', `${teamName}`);
    divisionLabel.setAttribute('data-points', `${this.getAttribute('data-points')*2}`);
    if(`${teamName.split(" ").length}` > 1) {
      divisionLabel.classList.toggle(`${teamName.split(" ")[0]}`);
      divisionLabel.classList.toggle(`${teamName.split(" ")[1]}`);
    } else {
      divisionLabel.classList.toggle(`${teamName}`);
    };
    divisionLabel.classList.remove('active');
    divisionInput.value = `${teamName}`;
    console.log(divisionLabel);
    selectWinner(divisionLabel, false);
  
  }
}));

const b12Buttons = document.querySelectorAll('.teamB12');
let clicks = 0;

b12Buttons.forEach(button => button.addEventListener('click', function(e) {
  const name = this.getAttribute('name');
  const teamName = this.getAttribute('value');
  clicks++;
  console.log(clicks % 2);
}));


const buttons = document.querySelectorAll('.team');
let champNum = 0;
let selected;

function selectWinner(button, divisionTeam = true) {
  const name = button.getAttribute('name');
  const matchUp = document.getElementsByName(name);
  const teamName = button.getAttribute('value');
  const teamRadios = document.querySelectorAll(`input[value="${teamName}"]`);
  teamRadios.forEach(teamRadio => teamRadio.checked = true);
  if(divisionTeam) {
    button.classList.contains('active') ? selected = false : selected = true;

    // matchUp.forEach(team => selected ? team.classList.add('hidden') : team.classList.remove('hidden'));
    
    const pointInput = document.querySelector(`input[name=${button.getAttribute('for')}Points`);
    if(selected) {
      button.classList.add('active');
      pointInput.value = `${button.getAttribute('data-points')}`;
    } else {
      button.classList.remove('active');
      pointInput.value = '';
    }
    console.log(pointInput);
    // button.classList.remove('hidden');
  } else {
    matchUp.forEach(team => {
      team.classList.remove('active');
      // team.classList.remove('hidden');
    });
  }

  // const pointInput = document.querySelector(`input[name=${button.getAttribute('for')}Points`);
  // pointInput.value = `${button.getAttribute('data-points')}`;
  
  if((button.getAttribute('name') === button.getAttribute('data-conference')) && !divisionTeam) {
    const conference = button.getAttribute('data-conference')
    const radioButtons = document.querySelectorAll(`input[name="${conference}"]`);
    const pointsInput = document.querySelector(`input[name="${conference}Points"]`)
    radioButtons.forEach(radio => radio.checked = false);
    pointsInput.value = '';
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
      champNum = ((i+1) % 3);

      if(!divisionTeam) {
        pointDisplay.classList = 'points hiddenPoints';
      }
    }
  });
}

buttons.forEach(button => button.addEventListener('mousedown', function(e) {
  // e.preventDefault;
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
    selectWinner(divisionLabel, false); 
  }
}));

// Big 12 Games
function b12ChampUpdate(button, teamName, points) {
  button.setAttribute('value', teamName);
  button.setAttribute('data-points', points*2);

  button.classList = `col-lg-3 btn btn-lg ${teamName} teamB12`;
  button.innerHTML = `<p>${teamName}</p>`;
}

let b12NumTeams = 0;

const b12Buttons = document.querySelectorAll('label[name="Big12d"]');
const b12ChampButtons = document.querySelectorAll('label[name="Big12"]');;
const b12RadioButtons = document.querySelectorAll('input[name="Big12"]');
const b12DivisionInput1 = document.querySelector('[name="Big12d1"]');
const b12DivisionInput2 = document.querySelector('[name="Big12d2"]');
const b12DivisionPointsInput1 = document.querySelector('[name="Big12d1Points"]');
const b12DivisionPointsInput2 = document.querySelector('[name="Big12d2Points"]');

b12Buttons.forEach(button => {
  if (button.classList.contains('active')) {
    b12NumTeams++;
  }
});

b12Buttons.forEach(button => button.addEventListener('mousedown', function(e) {
  const teamName = this.getAttribute('value');
  let teamFound = false;
  b12ChampButtons.forEach(b12Champ => {
    if(teamName === b12Champ.getAttribute('value')) {
      teamFound = true;
    };
  });
  if (teamFound) {
    // team being unselected
    this.classList.remove('active');
    b12NumTeams--;
    const matchUp = document.querySelectorAll('[data-conference="Big12"]');
    matchUp.forEach(team => {
      team.classList.remove('hidden');
    });
    b12ChampButtons.forEach((b12Champ, i) => {
      b12Champ.classList.remove('active');
      if(teamName === b12Champ.getAttribute('value')) {
        if(i===0) {
          b12ChampUpdate(b12ChampButtons[0], b12ChampButtons[1].getAttribute('value'), (b12ChampButtons[1].getAttribute('data-points')/2));
          b12DivisionInput1.value = b12DivisionInput2.value;
          b12DivisionPointsInput1.value = b12DivisionPointsInput2.value;
        } 
        b12ChampUpdate(b12ChampButtons[1], 'Big12 Team', '0');
        b12DivisionInput2.value = "";
        b12DivisionPointsInput2.value = "";
      };
    });
  } else {
    // team being selected
    this.classList.add('active');
    b12ChampButtons.forEach(b12Champ => b12Champ.classList.remove('active'));
    b12RadioButtons.forEach(b12Radio => b12Radio.checked = false);
    const pointInput = document.querySelector('[name="Big12Points"]');
    pointInput.value = '';
    if (b12NumTeams === 0) {
      // first team is selected
      b12ChampUpdate(b12ChampButtons[0], teamName, this.getAttribute('data-points'));
      b12DivisionInput1.value = teamName;
      b12DivisionPointsInput1.value = this.getAttribute('data-points');

      b12NumTeams++;
    } else {
      // second team is selected
      b12ChampUpdate(b12ChampButtons[1], teamName, this.getAttribute('data-points'));  
      b12DivisionInput2.value = teamName;
      b12DivisionPointsInput2.value = this.getAttribute('data-points');
      b12NumTeams++;
    }

  }

  const pointsDisplay = document.querySelectorAll('.Big12d');
  pointsDisplay.forEach((point, i) => {
    if(i === 0 && b12DivisionInput1.value) {
      point.innerHTML = `${b12DivisionInput1.value} is Worth ${b12DivisionPointsInput1.value} Points`
      point.classList = `points ${b12DivisionInput1.value} Big12d`;
    } else if (i === 1 && b12DivisionInput2.value) {
      point.innerHTML = `${b12DivisionInput2.value} is Worth ${b12DivisionPointsInput2.value} Points`
      point.classList = `points ${b12DivisionInput2.value} Big12d`;
    } else {
      point.classList = `points hiddenPoints Big12d`;
    }
  })

  if(b12NumTeams > 1 ) {
    const matchUp = document.querySelectorAll('label[name="Big12d"]');
    matchUp.forEach(team => {
      if(!team.classList.contains('active')) {
        team.classList.add('hidden');
      }
    });
  }

  b12ChampButtons.forEach(button => {
    const pointDisplay = document.querySelector('#Big12');
    pointDisplay.classList = "points hiddenPoints";
  })
}));

b12ChampButtons.forEach((button, i) => button.addEventListener('click', function(e) {
  const pointInput = document.querySelector('[name="Big12Points"]');
  const pointDisplay = document.querySelector('#Big12');
  if(!this.classList.contains('active')) {
    this.classList.add('active');
    const matchUp = document.querySelectorAll('label[name="Big12"]');
    b12RadioButtons[i].checked = true;
    b12RadioButtons[i].value = this.getAttribute('value');
    pointInput.value = this.getAttribute('data-points');
    pointDisplay.innerHTML = `<p>${this.getAttribute('value')} is Worth ${this.getAttribute('data-points')} Points`;
    pointDisplay.classList = `points ${this.getAttribute('value')}`;

    matchUp.forEach(team => {
      if(!team.classList.contains('active')) {
        team.classList.add('hidden');
      }
    });
  } else {
    const matchUp = document.querySelectorAll('label[name="Big12"]');
    b12RadioButtons[i].checked = false;
    b12RadioButtons[i].value = 'Big 12 Team';
    pointInput.value = '';
    pointDisplay.innerHTML = `<p>Worth X Points`;
    pointDisplay.classList = `points hiddenPoints`;

    matchUp.forEach(team => {
      team.classList.remove('active');
      team.classList.remove('hidden');
    });
  }
}));
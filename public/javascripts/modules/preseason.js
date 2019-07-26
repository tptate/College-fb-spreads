const buttons = document.querySelectorAll('.team');
let champNum = 0;

buttons.forEach(button => button.addEventListener('click', function(e) {
  e.preventDefault;
  const name = this.getAttribute('name');
  const matchUp = document.getElementsByName(name);
  const teamName = this.getAttribute('value');
  const teamRadios = document.querySelectorAll(`input[value="${teamName}"]`);
  teamRadios.forEach(teamRadio => teamRadio.checked = true);
  matchUp.forEach(team => {
    team.classList.remove('active');
    team.classList.toggle('hidden');
  });
  this.classList.add('active');
  this.classList.toggle('hidden');

  const pointsDisplay = document.querySelectorAll('.points');
  pointsDisplay.forEach((pointDisplay, i) => {
    if(pointDisplay.getAttribute('id') === this.getAttribute('name')) {
      pointDisplay.classList.toggle('hiddenPoints');
      if(`${teamName.split(" ").length}` > 1) {
        pointDisplay.classList.toggle(`${teamName.split(" ")[0]}`);
        pointDisplay.classList.toggle(`${teamName.split(" ")[1]}`);
      } else {
        pointDisplay.classList.toggle(`${teamName}`);
      };
      pointDisplay.innerHTML = `Worth ${this.getAttribute('data-points')} Point(s)`;
      champNum = ((i+1) % 3)
    }

  });

  const pointsInput = document.getElementsByName(`${name}Points`);
  pointsInput.forEach(point => {
    point.setAttribute('value', `${this.getAttribute('data-points')}`);
  });

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
    divisionInput.value = `${teamName}`;
  }

  const champPoints = document.querySelectorAll(`input[name="${this.getAttribute('data-conference')}Points"]`);
  champPoints.forEach(champPoint => champPoint.setAttribute('value', `${this.getAttribute('data-points')}`));
  const champPointsDisplay = document.getElementById(`${this.getAttribute('data-conference')}`);
  console.log(this.getAttribute('data-points'))
  champPointsDisplay.innerHTML = `Worth ${this.getAttribute('data-points')} Points`
}));


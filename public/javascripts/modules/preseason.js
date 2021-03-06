const buttons = document.querySelectorAll('.team');
let champNum = 0;
let selected;

function selectTeam(button, teamName, division, conference, teamRadio, pointDisplay, points, pointInput) {
  button.classList.toggle('active');
  teamRadio.checked ? teamRadio.checked = false : teamRadio.checked = true;
  pointDisplay.classList.toggle('hiddenPoints');
  pointDisplay.innerHTML = `<p>Worth ${points} Point(s)</p>`;
  if(`${teamName.split(" ").length}` > 1) {
    pointDisplay.classList.toggle(`${teamName.split(" ")[0]}`);
    pointDisplay.classList.toggle(`${teamName.split(" ")[1]}`);
  } else {
    pointDisplay.classList.toggle(`${teamName}`);
  };
  button.classList.contains('active') ? pointInput.setAttribute('value', `${points}`) : pointInput.setAttribute('value', '');

  if(division !== conference) {
    //division team
    const pointDisplays = document.querySelectorAll('input[type="number"]');
    let pointIndex;
    pointDisplays.forEach((point, i) => {
      if(point.name === `${pointDisplay.id}Points`) {
        pointIndex = i % 3;
      }
    });
    const champTeams = document.getElementsByName(`${conference}`);
    if(button.classList.contains('active')) {
      if(`${teamName.split(" ").length}` > 1) {
        champTeams[pointIndex*2].classList = `col-lg-3 btn btn-lg ${teamName.split(" ")[0]} ${teamName.split(" ")[1]} team`;
      } else {
        champTeams[pointIndex*2].classList = `col-lg-3 btn btn-lg ${teamName} team`;
      }
      champTeams[pointIndex*2].innerHTML = `<p>${teamName}</p>`;
      champTeams[pointIndex*2].setAttribute('value', teamName);
      champTeams[pointIndex*2+1].setAttribute('value', teamName);
      champTeams[pointIndex*2].setAttribute('data-points', `${points *2}`);
    } else {
      champTeams[pointIndex*2].classList = `col-lg-3 btn btn-lg team`;
      champTeams[pointIndex*2].innerHTML = `<p>ACC Team</p>`;
      champTeams[pointIndex*2].setAttribute('value', 'ACC Team');
      champTeams[pointIndex*2+1].setAttribute('value', 'ACC Team');
      champTeams[pointIndex*2].setAttribute('data-points', '0');
      champTeams.forEach((champ,i) => {
        if(i%2 === 0) {
          champ.classList.remove('hidden');
          champ.classList.remove('active');
        } else {
          champ.checked = false;
        }
      });
      const conferenceId = `#${conference}`;
      const champPointDisplay = document.querySelector(`${conferenceId}`);
      const conferencePoints = `${conference}Points`;
      const champPointInput = document.querySelector(`input[name="${conferencePoints}"]`)
      champPointDisplay.innerHTML = `<p>Worth X Points</p>`;
      champPointDisplay.classList = 'points hiddenPoints';
      champPointInput.setAttribute('value', '');
    }
  }
}

function hideTeam(button) {
  button.classList.toggle('hidden');
}

buttons.forEach(button => button.addEventListener('mousedown', function(e) {
  const name = this.getAttribute('name');
  const matchUp = document.getElementsByName(name);
  const teamName = button.getAttribute('value');
  const division = button.getAttribute('name');
  const conference = this.getAttribute('data-conference');
  const teamRadio = document.querySelector(`input[value="${teamName}"][name="${division}"]`);
  const pointDisplay = document.querySelector(`#${division}`);
  const points = this.getAttribute('data-points');
  const divisionPoints = `${division}Points`;
  const pointInput = document.querySelector(`input[name="${divisionPoints}"]`);
  
  this.classList.contains('active') ? selected = false : selected = true;
  matchUp.forEach(team => {
    team === this ? selectTeam(this, teamName, division, conference, teamRadio, pointDisplay, points, pointInput) : hideTeam(team);
  });
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


// Playoff Games
function deselectPlayoffTeam(nextLevel) {
  const matchUp = document.getElementsByName(`${nextLevel}`);
  const nextLevelDisplay = `${nextLevel}Display`;
  const pointsDisplay = document.getElementsByName(`${nextLevelDisplay}`);
  const nextLevelPoints = `${nextLevel}Points`
  const nextLevelInputs = document.querySelectorAll(`input[data-name="${nextLevel}"]`);
  const nextLevelPointInputs = document.querySelectorAll(`input[data-name="${nextLevelPoints}"]`);
  matchUp.forEach(team => team.classList = `btn btn-lg ${team.getAttribute('value')} Playoff`);
  pointsDisplay.forEach(display => display.classList = 'points hiddenPoints');
  nextLevelInputs.forEach(input => input.setAttribute('value', ''));
  nextLevelPointInputs.forEach(input => input.setAttribute('value', ''));
}

function selectPlayoffTeam(button, division, maxTeams, nextLevel) {
  const teamName = button.getAttribute('value');
  const points = button.getAttribute('data-points');
  const matchUp = document.getElementsByName(`${division}`);
  const divisionPoints = `${division}Points`
  const divisionInputs = document.querySelectorAll(`input[data-name="${division}"]`);
  const divisionPointInputs = document.querySelectorAll(`input[data-name="${divisionPoints}"]`);
  button.classList.toggle('active');
  button.classList.contains('active') ? selected = true : selected = false;
  const nextButtons = document.getElementsByName(`${nextLevel}`);
  const divisionDisplay = `${division}Display`;
  const pointsDisplay = document.getElementsByName(`${divisionDisplay}`);
  let numTeams = 0;
  matchUp.forEach(team => team.classList.contains('active') ? numTeams++ : '')

  if (selected) {
    divisionInputs[numTeams-1].setAttribute('value', `${teamName}`);
    divisionPointInputs[numTeams-1].setAttribute('value', `${points}`);    
    if(numTeams > (maxTeams-1)) {
      matchUp.forEach(team => !team.classList.contains('active') ? team.classList.add('hidden') : '');
    }
    nextLevel ? nextButtons[numTeams-1].innerHTML = `<p>${points*2} - ${teamName}</p>` : '';
    nextLevel ? nextButtons[numTeams-1].classList = `btn btn-lg ${teamName} ${nextLevel}` : '';
    nextLevel ? nextButtons[numTeams-1].setAttribute('value', `${teamName}`) : '';
    nextLevel ? nextButtons[numTeams-1].setAttribute('data-points', `${points*2}`) : '';
    pointsDisplay[numTeams-1].innerHTML = `<p>${teamName} is worth ${points} point(s)</p>`;
    pointsDisplay[numTeams-1].classList = `points ${teamName}`;
    nextLevel ? deselectPlayoffTeam(nextLevel) : '';
    nextLevel==='Playoff' ? deselectPlayoffTeam('ChampTeam') : '';
  } else {
    nextLevel ? deselectPlayoffTeam(nextLevel) : '';
    nextLevel==='Playoff' ? deselectPlayoffTeam('ChampTeam') : '';
    let oldTeam = '';
    let oldValue = '';
    let newTeam = '';
    let newValue = '';
    let foundTeam = false;
    Array.from(divisionInputs).slice().reverse().forEach((team, i) => {
      if(button.getAttribute('value') === team.getAttribute('value')){
        team.setAttribute('value', oldTeam);
        divisionPointInputs[(maxTeams-1) - i].setAttribute('value', oldValue);
        nextLevel ? nextButtons[(maxTeams-1)-i].innerHTML=`<p>${oldValue*2 || '0'} - ${oldTeam || 'Team'}</p>` : '';
        nextLevel ? nextButtons[(maxTeams-1)-i].classList = `btn btn-lg ${oldTeam || 'Team'} playoff` : '';
        nextLevel ? nextButtons[(maxTeams-1)-i].setAttribute('value', `${oldTeam || ''}`) : '';
        nextLevel ? nextButtons[(maxTeams-1)-i].setAttribute('data-points', `${oldValue*2 || 0}`) : '';
        pointsDisplay[(maxTeams-1)-i].innerHTML = `<p>${oldTeam} is worth ${oldValue} point(s)</p>`;
        pointsDisplay[(maxTeams-1)-i].classList = `points ${oldTeam || 'hiddenPoints'}`;
        foundTeam = true;
      } else if (!foundTeam) {
        newTeam = team.getAttribute('value') || '';
        newValue = divisionPointInputs[(maxTeams-1) - i].getAttribute('value') || '';
        team.setAttribute('value', oldTeam);
        divisionPointInputs[(maxTeams-1) - i].setAttribute('value', oldValue);
        nextLevel ? nextButtons[(maxTeams-1)-i].innerHTML=`<p>${oldValue*2 || '0'} - ${oldTeam || 'Team'}</p>` : '';
        nextLevel ? nextButtons[(maxTeams-1)-i].classList = `btn btn-lg ${oldTeam} playoff` : '';
        nextLevel ? nextButtons[(maxTeams-1)-i].setAttribute('value', `${oldTeam || ''}`) : '';
        nextLevel ? nextButtons[(maxTeams-1)-i].setAttribute('data-points', `${oldValue*2 || 0}`) : '';
        pointsDisplay[(maxTeams-1)-i].innerHTML = `<p>${oldTeam} is worth ${oldValue} point(s)</p>`;
        pointsDisplay[(maxTeams-1)-i].classList = `points ${oldTeam || 'hiddenPoints'}`;
        oldTeam = newTeam;
        oldValue = newValue;
      }
    });

    if(numTeams < maxTeams) {
      matchUp.forEach(team => !team.classList.contains('active') ? team.classList.remove('hidden') : '');
    }
  }
}

const top25Buttons = document.getElementsByName('Top25');
top25Buttons.forEach(top25 => top25.addEventListener('mousedown', function() {
  const division = this.getAttribute('name');
  const maxTeams = 4;
  const nextLevel = 'Playoff';
  selectPlayoffTeam(this, division, maxTeams, nextLevel);
}));

const playoffButtons = document.getElementsByName('Playoff');
playoffButtons.forEach(playoff => playoff.addEventListener('mousedown', function() {
  const division = this.getAttribute('name');
  const maxTeams = 2;
  const nextLevel = 'ChampTeam'
  selectPlayoffTeam(this, division, maxTeams, nextLevel);
}));

const championshipButtons = document.getElementsByName('ChampTeam');
championshipButtons.forEach(champTeam => champTeam.addEventListener('mousedown', function() {
  const division = this.getAttribute('name');
  const maxTeams = 1;
  selectPlayoffTeam(this, division, maxTeams);
}))
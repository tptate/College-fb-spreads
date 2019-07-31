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

buttons.forEach(button => button.addEventListener('mousedown', function(e) {
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

const b12Buttons = document.querySelectorAll('[data-conference="Big12d"]');
const b12ChampButtons = document.querySelectorAll('[data-conference="Big12c"]');

b12Buttons.forEach(button => button.addEventListener('mousedown', function(e) {
  const teamName = this.getAttribute('value');
  let teamFound = false;
  b12ChampButtons.forEach(b12Champ => {
    if(teamName === b12Champ.getAttribute('value')) {
      teamFound = true;
    };
  });
  if (teamFound) {
    this.classList.remove('active');
    b12NumTeams--;
    const matchUp = document.querySelectorAll('[data-conference="Big12d"]');
    matchUp.forEach(team => {
      if(team.classList.contains('hidden')) {
        team.classList.remove('hidden');
      }
    });
    b12ChampButtons.forEach((b12Champ, i) => {
      if(teamName === b12Champ.getAttribute('value')) {
        if(i===0) {
          b12ChampUpdate(b12ChampButtons[0], b12ChampButtons[1].getAttribute('value'), b12ChampButtons[1].getAttribute('data-points'));
        } 
        b12ChampUpdate(b12ChampButtons[1], 'Big12 Team', '0'); 
      };
    });
  } else {
    this.classList.add('active');
    if (b12NumTeams === 0) {
      b12ChampUpdate(b12ChampButtons[0], teamName, this.getAttribute('data-points'));  
      b12NumTeams++;
    } else {
      b12ChampUpdate(b12ChampButtons[1], teamName, this.getAttribute('data-points'));  
      b12NumTeams++;
    }

  }

  if(b12NumTeams > 1 ) {
    const matchUp = document.querySelectorAll('[data-conference="Big12d"]');
    matchUp.forEach(team => {
      if(!team.classList.contains('active')) {
        team.classList.add('hidden');
      }
    });
  }

}));



// let b12ChampTeams = [];
// let b12ChampPoints = [];
// b12ChampButtons.forEach(champ => {
//   b12ChampTeams.push(champ.innerText)
//   b12ChampPoints.push(champ.getAttribute('data-points'));

//   champ.addEventListener('mousedown', (e) => {
//     const matchUp = document.querySelectorAll('[data-conference="Big12c"]');
//     matchUp.forEach(team => {
//       team.classList.remove('active');
//       team.classList.toggle('hidden');
//     });
//     champ.classList.add('active');
//     champ.classList.toggle('hidden');
//   })
// });

// b12Buttons.forEach(button => button.addEventListener('mousedown', function(e) {
//   this.classList.toggle('active');
//   const teamName = this.getAttribute('value');

//   if(!b12ChampTeams.includes(teamName)){
//     const index = b12ChampTeams.indexOf('0 - Big12 Team');
//     if(index) {
//       b12ChampTeams[index] = teamName;
//       b12ChampPoints[index] = this.getAttribute('data-points');
//     } else {
//       b12ChampTeams[0] = b12ChampTeams[1];
//       b12ChampPoints[0] = b12ChampPoints[1];
//       b12ChampTeams[1] = teamName;
//       b12ChampPoints[1] = this.getAttribute('data-points');
//     }
//   } else {
//     const index = b12ChampTeams.indexOf(teamName);
//     b12ChampTeams[index] = '0 - Big12 Team';
//     b12ChampPoints[index] = '0';
//   }

//   const matchUp = document.querySelectorAll('[data-conference="Big12d"]');
//   matchUp.forEach(team => {
//     if (!b12ChampTeams.includes('0 - Big12 Team')) {
//       if (!b12ChampTeams.includes(`${team.getAttribute('value')}`)) {
//         team.classList.add('hide');
//       }
//     } else {
//       team.classList.remove('hide');
//     }
//   });
  
//   b12ChampButtons.forEach((champButton, i) => {
//     champButton.innerHTML = `<p>${b12ChampTeams[i]}</p>`
//     champButton.classList = 'col-lg-3 btn btn-lg Big12 Team teamB12';
//     if(`${b12ChampTeams[i].split(" ").length}` > 1) {
//       champButton.classList.add(`${b12ChampTeams[i].split(" ")[0]}`);
//       champButton.classList.add(`${b12ChampTeams[i].split(" ")[1]}`);
//     } else {
//       champButton.classList.add(`${b12ChampTeams[i]}`);
//     };
//     champButton.setAttribute('data-points', `${this.getAttribute('data-points')*2}`);
//   })
// }));

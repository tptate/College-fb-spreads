"use strict";

var buttons = document.querySelectorAll('.team');
var champNum = 0;
var selected;

function selectWinner(button) {
  var name = button.getAttribute('name');
  var matchUp = document.getElementsByName(name);
  var teamName = button.getAttribute('value');
  var division = button.getAttribute('for');
  var conference = button.getAttribute('data-conference');
  var divisionTeam;
  conference === division ? divisionTeam = false : divisionTeam = true;
  var pointDisplay = document.querySelector("#".concat(division));
  pointDisplay.classList.toggle('hiddenPoints');
  var pointDisplays = document.querySelectorAll('input[type="number"]');
  var pointIndex;
  pointDisplays.forEach(function (point, i) {
    if (point.name === "".concat(pointDisplay.id, "Points")) {
      pointIndex = i % 3;
    }
  });
  var teamRadio = document.querySelector("input[value=\"".concat(teamName, "\"][name=\"").concat(division, "\"]"));
  button.classList.contains('active') ? selected = false : selected = true;
  matchUp.forEach(function (team) {
    return selected ? team.classList.add('hidden') : team.classList.remove('hidden');
  });
  var pointInput = document.querySelector("input[name=".concat(button.getAttribute('for'), "Points"));
  var champTeams = document.getElementsByName("".concat(conference));

  if (selected && divisionTeam) {
    if ("".concat(teamName.split(" ").length) > 1) {
      champTeams[pointIndex * 2].classList = "col-lg-3 btn btn-lg ".concat(teamName.split(" ")[0], " ").concat(teamName.split(" ")[1], " team");
    } else {
      champTeams[pointIndex * 2].classList = "col-lg-3 btn btn-lg ".concat(teamName, " team");
    }
  }

  if (selected) {
    button.classList.add('active');
    button.classList.remove('hidden');
    pointInput.value = "".concat(button.getAttribute('data-points'));
    teamRadio.checked = true;

    if ("".concat(teamName.split(" ").length) > 1) {
      pointDisplay.classList.toggle("".concat(teamName.split(" ")[0]));
      pointDisplay.classList.toggle("".concat(teamName.split(" ")[1]));
    } else {
      pointDisplay.classList.toggle("".concat(teamName));
    }

    ;
    pointDisplay.innerHTML = "Worth ".concat(button.getAttribute('data-points'), " Point(s)");
  } else {
    button.classList.remove('active');
    pointInput.value = '';
    teamRadio.checked = false;
    pointDisplay.innerHTML = "Worth X Point(s)";
  }

  if (divisionTeam) {
    if (selected) {
      champTeams[pointIndex * 2].innerHTML = "<p>".concat(teamName, "</p>");
      champTeams[pointIndex * 2].setAttribute('value', teamName);
      champTeams[pointIndex * 2 + 1].setAttribute('value', teamName);
      champTeams[pointIndex * 2].setAttribute('data-points', "".concat(button.getAttribute('data-points') * 2));
    } else {
      champTeams[pointIndex * 2].innerHTML = "<p>ACC Team</p>";
      champTeams[pointIndex * 2].classList = 'col-lg-3 btn btn-lg ACC Atlantic team';
      champTeams[pointIndex * 2].setAttribute('value', 'ACC Team');
      champTeams[pointIndex * 2 + 1].setAttribute('value', 'ACC Team');
      champTeams[pointIndex * 2].setAttribute('data-points', '0');
      champTeams.forEach(function (champTeam, i) {
        if (i % 2 === 0) {
          // show label
          champTeam.classList.remove('active');
          champTeam.classList.remove('hidden');
        } else {
          // uncheck radio
          champTeam.checked = false;
        }
      });
      var champPointDisplay = document.querySelector("#".concat(conference));
      var champPointInput = document.querySelector("input[name=\"".concat(conference, "Points\"]"));
      champPointDisplay.innerHTML = "<p>Worth X Points</p>";
      champPointDisplay.classList = 'points hiddenPoints';
      champPointInput.value = '';
    }
  }
}

buttons.forEach(function (button) {
  return button.addEventListener('mousedown', function (e) {
    selectWinner(this);
  });
}); // Big 12 Games

function b12ChampUpdate(button, teamName, points) {
  button.setAttribute('value', teamName);
  button.setAttribute('data-points', points * 2);
  button.classList = "col-lg-3 btn btn-lg ".concat(teamName, " teamB12");
  button.innerHTML = "<p>".concat(teamName, "</p>");
}

var b12NumTeams = 0;
var b12Buttons = document.querySelectorAll('label[name="Big12d"]');
var b12ChampButtons = document.querySelectorAll('label[name="Big12"]');
;
var b12RadioButtons = document.querySelectorAll('input[name="Big12"]');
var b12DivisionInput1 = document.querySelector('[name="Big12d1"]');
var b12DivisionInput2 = document.querySelector('[name="Big12d2"]');
var b12DivisionPointsInput1 = document.querySelector('[name="Big12d1Points"]');
var b12DivisionPointsInput2 = document.querySelector('[name="Big12d2Points"]');
b12Buttons.forEach(function (button) {
  if (button.classList.contains('active')) {
    b12NumTeams++;
  }
});
b12Buttons.forEach(function (button) {
  return button.addEventListener('mousedown', function (e) {
    var teamName = this.getAttribute('value');
    var teamFound = false;
    b12ChampButtons.forEach(function (b12Champ) {
      if (teamName === b12Champ.getAttribute('value')) {
        teamFound = true;
      }

      ;
    });

    if (teamFound) {
      // team being unselected
      this.classList.remove('active');
      b12NumTeams--;
      var matchUp = document.querySelectorAll('[data-conference="Big12"]');
      matchUp.forEach(function (team) {
        team.classList.remove('hidden');
      });
      b12ChampButtons.forEach(function (b12Champ, i) {
        b12Champ.classList.remove('active');

        if (teamName === b12Champ.getAttribute('value')) {
          if (i === 0) {
            b12ChampUpdate(b12ChampButtons[0], b12ChampButtons[1].getAttribute('value'), b12ChampButtons[1].getAttribute('data-points') / 2);
            b12DivisionInput1.value = b12DivisionInput2.value;
            b12DivisionPointsInput1.value = b12DivisionPointsInput2.value;
          }

          b12ChampUpdate(b12ChampButtons[1], 'Big12 Team', '0');
          b12DivisionInput2.value = "";
          b12DivisionPointsInput2.value = "";
        }

        ;
      });
    } else {
      // team being selected
      this.classList.add('active');
      b12ChampButtons.forEach(function (b12Champ) {
        return b12Champ.classList.remove('active');
      });
      b12RadioButtons.forEach(function (b12Radio) {
        return b12Radio.checked = false;
      });
      var pointInput = document.querySelector('[name="Big12Points"]');
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

    var pointsDisplay = document.querySelectorAll('.Big12d');
    pointsDisplay.forEach(function (point, i) {
      if (i === 0 && b12DivisionInput1.value) {
        point.innerHTML = "".concat(b12DivisionInput1.value, " is Worth ").concat(b12DivisionPointsInput1.value, " Points");
        point.classList = "points ".concat(b12DivisionInput1.value, " Big12d");
      } else if (i === 1 && b12DivisionInput2.value) {
        point.innerHTML = "".concat(b12DivisionInput2.value, " is Worth ").concat(b12DivisionPointsInput2.value, " Points");
        point.classList = "points ".concat(b12DivisionInput2.value, " Big12d");
      } else {
        point.classList = "points hiddenPoints Big12d";
      }
    });

    if (b12NumTeams > 1) {
      var _matchUp = document.querySelectorAll('label[name="Big12d"]');

      _matchUp.forEach(function (team) {
        if (!team.classList.contains('active')) {
          team.classList.add('hidden');
        }
      });
    }

    b12ChampButtons.forEach(function (button) {
      var pointDisplay = document.querySelector('#Big12');
      pointDisplay.classList = "points hiddenPoints";
    });
  });
});
b12ChampButtons.forEach(function (button, i) {
  return button.addEventListener('click', function (e) {
    var pointInput = document.querySelector('[name="Big12Points"]');
    var pointDisplay = document.querySelector('#Big12');

    if (!this.classList.contains('active')) {
      this.classList.add('active');
      var matchUp = document.querySelectorAll('label[name="Big12"]');
      b12RadioButtons[i].checked = true;
      b12RadioButtons[i].value = this.getAttribute('value');
      pointInput.value = this.getAttribute('data-points');
      pointDisplay.innerHTML = "<p>".concat(this.getAttribute('value'), " is Worth ").concat(this.getAttribute('data-points'), " Points");
      pointDisplay.classList = "points ".concat(this.getAttribute('value'));
      matchUp.forEach(function (team) {
        if (!team.classList.contains('active')) {
          team.classList.add('hidden');
        }
      });
    } else {
      var _matchUp2 = document.querySelectorAll('label[name="Big12"]');

      b12RadioButtons[i].checked = false;
      b12RadioButtons[i].value = 'Big 12 Team';
      pointInput.value = '';
      pointDisplay.innerHTML = "<p>Worth X Points";
      pointDisplay.classList = "points hiddenPoints";

      _matchUp2.forEach(function (team) {
        team.classList.remove('active');
        team.classList.remove('hidden');
      });
    }
  });
});
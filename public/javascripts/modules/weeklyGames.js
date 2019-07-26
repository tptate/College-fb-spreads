const buttons = document.querySelectorAll('.team');
buttons.forEach(button => button.addEventListener('click', function(e) {
  const name = this.getAttribute('name');
  const matchUp = document.getElementsByName(name);
  const teamName = this.getAttribute('value');
  const teamRadio = document.querySelector(`input[value="${teamName}"]`);
  teamRadio.checked = true;
  matchUp.forEach(team => team.classList.remove('active'));
}));
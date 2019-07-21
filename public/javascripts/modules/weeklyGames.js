const formPicks = document.querySelector('.card');
console.log(formPicks.getAttribute('name'));
if (formPicks.getAttribute('name') !== 'done') {
  const buttons = document.querySelectorAll('.team');
  buttons.forEach(button => button.addEventListener('mousedown', function(e) {
    const name = this.getAttribute('name');
    const matchUp = document.getElementsByName(name);
    const teamName = this.getAttribute('value');
    const teamRadio = document.querySelector(`input[value="${teamName}"]`);
    teamRadio.checked = true;
    matchUp.forEach(team => team.classList.remove('active'));

    this.classList.add('active');
  }));
};
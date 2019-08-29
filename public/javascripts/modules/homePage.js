const homeButtons = document.getElementsByName('homePageOptions');
const homePageCards = document.getElementsByName('homePageCards');

homeButtons.forEach(button => button.addEventListener('click', function() {
  homeButtons.forEach(homeButton => homeButton.classList.remove('active'));
  homePageCards.forEach(homeCard => homeCard.classList.add('hidden'));
  document.getElementById((this.getAttribute('value'))).classList.remove('hidden');
}));
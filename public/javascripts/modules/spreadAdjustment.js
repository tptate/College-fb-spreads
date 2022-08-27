const spreadButton = document.querySelector('input[name="spread"]');
const spreadWords = document.querySelector('label[for="spread"]');
// const homeButton = document.querySelector('input[name="home"]');
// // const homeTeam = homeButton.value;
// const awayButton = document.querySelector('input[name="away"]');
// // const awayTeam = awayButton.value;
// let spread = 0;
// let home = "";
// let away = "";
// let favorite = "";

// homeButton.addEventListener('change', function(e) {
//   home = parseInt(this.value);
// };

// awayButton.addEventListener('change', function(e) {
//   away = parseInt(this.value);
// };

// spreadButton.addEventListener('change', function(e) {
//   this.value > 0 ? spread = parseInt(this.value) + 0.5 : spread = parseInt(this.value) - 0.5;
//   this.value > 0 ? favorite = home + spread : favorite = away + spread;
//   spreadWords.innerHTML = `Point Spread: ${favorite}`

spreadButton.addEventListener('change', function(e) {
  this.value > 0 ? spread = parseInt(this.value) + 0.5 : spread = parseInt(this.value) - 0.5;
  spreadWords.innerHTML = `Point Spread: ${spread}`

});
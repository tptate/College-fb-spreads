const spreadButton = document.querySelector('input[name="spread"]');
const spreadWords = document.querySelector('label[for="spread"]');
let spread = 0;

spreadButton.addEventListener('change', function(e) {
  this.value > 0 ? spread = parseInt(this.value) + 0.5 : spread = parseInt(this.value) - 0.5;
  spreadWords.innerHTML = `Point Spread: ${spread}`

});
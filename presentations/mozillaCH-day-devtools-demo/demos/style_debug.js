(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#calculateButton').addEventListener('click', calculate, false);
  });

  function calculate() {
    for (var i = 0; i < 10; i++) {
      var square = i*i;
      console.log(square);
    }
  }

  localStorage.setItem('demo', 'HI MOZILLA!');
})();

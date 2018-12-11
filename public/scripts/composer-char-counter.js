$(document).ready(function() {
  // --- our code goes here ---
  $('.new-tweet textarea').keyup(function() {
    const remaining = 140 - $(this).val().length;
    const remainingCounter = $(this).siblings('.counter')[0];
    remainingCounter.innerText = remaining;
    if (remaining < 0) {
      remainingCounter.classList.add('limit-exceeded');
    } else {
      remainingCounter.classList.remove('limit-exceeded');
    }
  });
});

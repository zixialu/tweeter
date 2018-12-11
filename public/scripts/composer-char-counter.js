$(document).ready(function() {
  $('.new-tweet textarea').keyup(function() {
    const remaining = 140 - $(this).val().length;
    const characterCounter = $(this).siblings('.counter')[0];
    characterCounter.innerText = remaining;
    if (remaining < 0) {
      $(characterCounter).addClass('limit-exceeded');
    } else {
      $(characterCounter).removeClass('limit-exceeded');
    }
  });
});

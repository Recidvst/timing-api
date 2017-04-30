$(document).ready(function() {
  var timingList = '';
  var timingData = window.performance.timing;
  $.each( timingData, function( a, b ) {
    timingList += '<li>' + a + ': <span class="value">' + b + '</span></li>';
  });
  $('#nav-timing').html(timingList);
});

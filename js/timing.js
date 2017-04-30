try {
  $(document).ready(function() {
  var timingList = '';
  var timeFormat = function(x) {
    var date = new Date(null);
    date.setSeconds(x / 1000);
    return date.toISOString().substr(11, 8);
  }
  //check dom load
  if ( window.performance.timing.domComplete > 1 || 1 == 1 ) {
    // navigation timings
    var timingData = window.performance.timing;
    var initialise = window.performance.timing.navigationStart;
    $.each( timingData, function( a, b ) {
      if ( a != 'toJSON' ) {
        if ( b > 0 ) {
          c = b - initialise;
        }
        else {
          c = null;
        }
        timingList += '<li>' + a + ': <span class="value">' + b + (c != null ? ' / ' + c + 'ms' : '') + '</span></li>';
      }
    });
    $('#nav-timing').html(timingList);
    // user timings
      performance.mark('DOMready');
      //click functions
      $('#button1').click(function() {
        performance.mark('button1click');
        performance.measure('DOMtoClick','DOMready','button1click');
        var x = performance.getEntriesByName('DOMtoClick')[0].duration;
        $('#user-timing1').text(timeFormat(x));
        $(this).unbind( "click" ).attr("clickable","false").text("Triggered");
        $('#button2').attr("ready","true");
      });
      $('#button2').click(function() {
        if ( performance.getEntriesByName('button1click').length > 0 ) {
          performance.mark('button2click');
          performance.measure('ClicktoClick','button1click','button2click');
          var y = performance.getEntriesByName('ClicktoClick')[0].duration;
          $('#user-timing2').append('<li>' + timeFormat(y) + '</li>');
          performance.clearMeasures('ClicktoClick');
          $(this).attr("clicked","true").text("Try me a few more times!");
        }
      });
    }
  });
}
catch (e) {
console.log(e);
}

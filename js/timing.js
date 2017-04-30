try {
  $(document).ready(function() {
    var timingList = '';
    var timingData = window.performance.timing;

    $.each( timingData, function( a, b ) {
      if ( a != 'toJSON' ) {
        timingList += '<li>' + a + ': <span class="value">' + b + '</span></li>';
      }
    });
    $('#nav-timing').html(timingList);
  });

  $(document).ready(function() {
    var loadedDom = false;
    var timeFormat = function(x) {
      var date = new Date(null);
      date.setSeconds(x / 1000);
      date.toISOString().substr(14, 5);
      return date.toISOString().substr(11, 8);
    }
    //check dom load
    if ( window.performance.timing.domComplete > 1 || 1 == 1 ) {
      loadedDom = true;
      performance.mark('DOMready');
      //click functions
      $('#button1').click(function() {
        performance.mark('button1click');
        performance.measure('DOMtoClick','DOMready','button1click');
        var x = performance.getEntriesByName('DOMtoClick')[0].duration;
        $('#user-timing1').text(timeFormat(x));
        $(this).unbind( "click" );
      });
      $('#button2').click(function() {
        performance.mark('button2click');
        performance.measure('ClicktoClick','button1click','button2click');
        var y = performance.getEntriesByName('ClicktoClick')[0].duration;
        $('#user-timing2').text(timeFormat(y));
        performance.clearMeasures('ClicktoClick');
      });
    }
  });
}
catch (e) {
console.log(e);
}

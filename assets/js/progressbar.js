$(document).ready(function() {
  var navbarHeight = $('#navbar').outerHeight(true);
  $('body').css({ 'padding-top': navbarHeight });
  $('progress-container').css({ 'padding-top': navbarHeight });
  var progressBar = $('#progress');
  progressBar.css({ 'top': navbarHeight });
  var getMax = function() { return $(document).height() - $(window).height(); }
  var getValue = function() { return $(window).scrollTop(); }
  // Check if the browser supports the progress element.
  if ('max' in document.createElement('progress')) {
    // Set the 'max' attribute for the first time.
    progressBar.attr({ max: getMax() });
    progressBar.attr({ value: getValue() });

    $(document).on('scroll', function() {
      // On scroll only the 'value' attribute needs to be calculated.
      progressBar.attr({ value: getValue() });
    });

    $(window).resize(function() {
      var navbarHeight = $('#navbar').outerHeight(true);
      $('body').css({ 'padding-top': navbarHeight });
      $('progress-container').css({ 'padding-top': navbarHeight });
      progressBar.css({ 'top': navbarHeight });
      // On resize, both the 'max' and 'value' attributes need to be calculated.
      progressBar.attr({ max: getMax(), value: getValue() });
    });
  } else {
    var max = getMax(), value, width;
    var getWidth = function() {
      // Calculate the window width as a percentage.
      value = getValue();
      width = (value/max) * 100;
      width = width + '%';
      return width;
    }
    var setWidth = function() { progressBar.css({ width: getWidth() }); };
    setWidth();
    $(document).on('scroll', setWidth);
    $(window).on('resize', function() {
      // Need to reset the 'max' attribute.
      max = getMax();
      setWidth();
    });
  }
});

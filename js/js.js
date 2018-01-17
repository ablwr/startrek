/* shoutout to this codepen: https://codepen.io/nickmoreton/pen/pRVMqE */

jQuery(document).ready(function() {
  var $sliderContainers = jQuery('.slider');
  var $body = jQuery('body');
  
  $sliderContainers.each(function() {
    var $sliderContainer = jQuery(this);
    var $sliderInner = $sliderContainer.find('.sliderInside');
    var $slides = $sliderContainer.find('.sliderSlide');
    $slides.removeClass('sliderSlide--active');
    jQuery($slides[0]).addClass('sliderSlide--active');
    var bg = $sliderContainer.find('.sliderSlide--active').children('.sliderSlideContent').data('background');
    var lightenBy = 15;
    var lighten = tinycolor(bg).lighten(lightenBy).toString();
    var lightenDouble = tinycolor(bg).lighten(lightenBy * 2).toString();
    $sliderContainer.css('background-color', lighten);
    $body.css('background-color', lightenDouble);
    var $first = $slides.filter(':first');
    var $last = $slides.filter(':last');
    $first.before($last);

    $sliderContainer.on('click', '.controls button', function() {
      $slides.addClass('sliderSlide--animate');
      var $clicked = jQuery(this);
      var $activeSlide = $sliderContainer.find('.sliderSlide--active');
      $first = $sliderContainer.find('.sliderSlide:first');
      $last = $sliderContainer.find('.sliderSlide:last');
      if($clicked.hasClass('next')) {
        var nextBg = $activeSlide.next().children('.sliderSlideContent').data('background');
        var nextLighten = tinycolor(nextBg).lighten(lightenBy).toString();
        var nextLightenDouble = tinycolor(nextBg).lighten(lightenBy * 2).toString();
        $sliderContainer.css('background-color', nextLighten);
        $body.css('background-color', nextLightenDouble);
        $activeSlide.removeClass('sliderSlide--active').next().addClass('sliderSlide--active');
        $last.after($first);
      } else if($clicked.hasClass('previous')) {
        var prevBg = $activeSlide.prev().children('.sliderSlideContent').data('background');
        var prevLighten = tinycolor(prevBg).lighten(lightenBy).toString();
        var prevLightenDouble = tinycolor(prevBg).lighten(lightenBy * 2).toString();
        $sliderContainer.css('background-color', prevLighten);
        $body.css('background-color', prevLightenDouble);
        $activeSlide.removeClass('sliderSlide--active').prev().addClass('sliderSlide--active');
        $first.before($last);
      }
    });
    $(window).resize(function(){
      $slides.removeClass('sliderSlide--animate');
    });
  });
});
// YouTube lazyloader
$(".help iframe").each(function() {
  var src = $(this).attr('src');
  if (src.indexOf('youtube')) {
    $(this).attr('data-src', src);
    $(this).attr('src', null);  
  }
});

$(window).on('load resize scroll', function() {
    $("iframe").each(function() {
      if(!$(this).attr('src')) {
        if ($('iframe').isInViewport()) {
            $(this).attr('src', $(this).attr('data-src'));  
        } 
      }
    });
});

$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};


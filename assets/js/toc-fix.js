$(document).ready(function () {
  // Initialize ScrollSpy
  $('body').scrollspy({
      target: 'nav[data-toggle="toc"]',
      offset: 90 
  });

  // Smooth Scroll and Force ScrollSpy Update on Click
  $('nav[data-toggle="toc"]').on("click", ".nav-link", function (e) {
      e.preventDefault();
      var targetId = $(this).attr("href");
      var target = $(targetId);

      if (target.length) {
          $("html, body").stop().animate(
              {
                  scrollTop: target.offset().top - 80
              },
              400,
              function () {
                  $('body').scrollspy('refresh');
              }
          );
      }
  });

  // Fix ScrollSpy Not Updating on Scroll
  $(window).on('scroll', function () {
      let scrollPos = $(document).scrollTop();

      // Iterate over each section and update active TOC item
      $('nav[data-toggle="toc"] .nav-link').each(function () {
          let currLink = $(this);
          let refElement = $(currLink.attr("href"));

          if (refElement.length) {
              let refTop = refElement.offset().top - 100; 
              let refBottom = refTop + refElement.outerHeight();

              if (scrollPos >= refTop && scrollPos < refBottom) {
                  $('nav[data-toggle="toc"] .nav-link').removeClass("active");
                  currLink.addClass("active");
              }
          }
      });
  });

  // Debugging: Log active section to console
  $(window).on('activate.bs.scrollspy', function () {
      console.log('Active Section:', $('.nav-link.active').text());
  });
});

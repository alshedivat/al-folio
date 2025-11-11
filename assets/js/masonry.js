$(document).ready(function () {
  const $grid = $('.grid');

  if (!$grid.length || typeof $grid.masonry !== 'function') {
    return;
  }

  $grid.masonry({
    gutter: 10,
    horizontalOrder: true,
    itemSelector: '.grid-item',
  });

  if (typeof $grid.imagesLoaded === 'function') {
    $grid.imagesLoaded().progress(() => {
      $grid.masonry('layout');
    });
  }
});

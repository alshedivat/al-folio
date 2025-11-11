$(document).ready(function () {
  const $links = $('a');

  const findEntryContainer = (link) => $(link).closest('.col-sm-8');

  $links.filter('.abstract').on('click', function (event) {
    event.preventDefault();

    const $entryContainer = findEntryContainer(this);
    $entryContainer.find('.abstract.hidden').toggleClass('open');
    $entryContainer.find('.bibtex.hidden.open').removeClass('open');
  });

  $links.filter('.bibtex').on('click', function (event) {
    event.preventDefault();

    const $entryContainer = findEntryContainer(this);
    $entryContainer.find('.bibtex.hidden').toggleClass('open');
    $entryContainer.find('.abstract.hidden.open').removeClass('open');
  });

  $links.removeClass('waves-effect waves-light');
});

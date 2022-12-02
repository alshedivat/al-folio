$(document).ready(function() {
    $('a.abstract').click(function() {
        $(this).parent().parent().find(".abstract.hidden").toggleClass('open');
    });
    $('a.coverage').click(function() {
        $(this).parent().parent().find(".coverage.hidden").toggleClass('open');
    });
    $('a.song').click(function() {
        $(this).parent().parent().find(".song.hidden").toggleClass('open');
    });
    $('a.bibtex').click(function() {
        $(this).parent().parent().find(".bibtex.hidden").toggleClass('open');
    });
    $('.navbar-nav').find('a').removeClass('waves-effect waves-light');
});

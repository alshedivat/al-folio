$(document).ready(function() {
    $('a.abstract').click(function() {
        $(this).parent().parent().find(".abstract.hidden").toggleClass('open');
    });
    $('a.bibtex').click(function() {
        $(this).parent().parent().find(".bibtex.hidden").toggleClass('open');
    });
    // Function to handle click event for "Coverage" button
    $('a.coverage').click(function() {
        $(this).parent().parent().find(".coverage.hidden").toggleClass('open');
    });
    $('a').removeClass('waves-effect waves-light');
});

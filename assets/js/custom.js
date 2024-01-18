$(document).ready(function () {
    $(".member-card").hover(
        function () {
            $(this).css("box-shadow", "0 4px 8px rgba(0, 0, 0, 0.2)");
        },
        function () {
            $(this).css("box-shadow", "0 2px 4px rgba(0, 0, 0, 0.1)");
        }
    );
});
//
//
//SmartBIB:  The SmartBIB Project allows you to present a BIB database (
//.bibtex files) containing your publications on the web. 
//It is ideal for personal and project websites.
//
//Copyright (C) 2012 Georgios Larkou - DMSL - University of Cyprus
//
//
//This program is free software: you can redistribute it and/or modify 
//it under the terms of the GNU General Public License as published by 
//the Free Software Foundation, either version 3 of the License, or 
//at your option) any later version. 
//
//This program is distributed in the hope that it will be useful, 
//but WITHOUT ANY WARRANTY; without even the implied warranty of 
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the 
//GNU General Public License for more details. 

//Υou should have received a copy of the GNU General Public License 
//along with this program. If not, see <http://www.gnu.org/licenses/>.
//
//

jQuery(document).ready(function () {
    // The height of the content block when it's not expanded
    var adjustheight = 0;

    // The "more" link text
    var moreText = "Show Abstract";

    // The "less" link text
    var lessText = "Hide Abstract";

    // Sets the .more-block div to the specified height and hides any content that overflows
    $(".more-less-p .more-block").css('height', adjustheight).css('overflow', 'hidden');

    // The section added to the bottom of the "more-less" div
    //$(".more-less-p").prepend('<a href="#" class="adjust"></a>');

    //$("a.adjusts").text(moreText);

    $(".adjusts").toggle(function () {
        $(this).parents("div:first").find(".more-block").css('height', 'auto').css('overflow', 'visible');
        // Hide the [...] when expanded
        $(this).parents("div:first").find("p.continued").css('display', 'none');
        //$(this).text(lessText);
        $('#classes-list').isotope('reLayout');
        $classesContainer.css('overflow', 'visible');
    }, function () {
        $(this).parents("div:first").find(".more-block").css('height', adjustheight).css('overflow', 'hidden');
        $(this).parents("div:first").find("p.continued").css('display', 'block');
        //$(this).text(moreText);
        $('#classes-list').isotope('reLayout');
        $classesContainer.css('overflow', 'visible');
    });

    /* ---------------------------------------------------------------------- */
    /*	Classes
     /* ---------------------------------------------------------------------- */

    // Needed variables
    var $classesContainer = $('#classes-list');
    var $classesFilter = $('#classes-filter');

    // Run Isotope
    $classesContainer.isotope({
        filter: '*',
        layoutMode: 'masonry',
        animationEngine: 'jquery',
        animationOptions: {
            duration: 150,
            easing: 'linear'
        }
    });

    // Isotope Filter
    $classesFilter.find('a').click(function () {
        var selector = $(this).attr('data-filter');
        $classesContainer.isotope({
            filter: selector,
            animationEngine: 'jquery',
            animationOptions: {
                duration: 150,
                easing: 'linear',
                queue: false
            }
        });
        return false;
    });

    $classesFilter.find('a').click(function () {
        var currentOption = $(this).attr('data-filter');
        $classesFilter.find('a').removeClass('current');
        $(this).addClass('current');
    });

    $classesContainer.css('overflow', 'visible');

});

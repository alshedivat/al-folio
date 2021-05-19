---
---

// get ihavecookies


// setup ihavecookies options
var options = {
    title: '&#x1F36A; Accept Cookies?',
    message: 'We use cookies to enhance your experience on this website ' +
             'and to display content from third party websites.',
    delay: 600,
    expires: 30,
    link: '{{site.cookie_info}}',
    acceptBtnLabel: 'Accept',
    moreInfoLabel: 'More information',
    cookieTypesTitle: 'Select which cookies you want to accept',
    fixedCookieTypeLabel: 'Essential',
    cookieTypes: [
        {
            type: 'Preferences',
            value: 'preferences',
            description: 'These are cookies that are related to your site preferences, e.g. remembering the color theme.'
        },
        {
            type: 'Social',
            value: 'social',
            description: 'Cookies needed for social features (e.g. reading and writing comments), ' +
                'as well as displaying external content (e.g. from YouTube or twitter)'
        },
        {
            type: 'Analytics',
            value: 'analytics',
            description: 'Cookies we use to analyse the site usage.'
        }
    ]
}

// run ihavecookies when document is ready
$(document).ready(function() {
    $('#ihavecookiePlaceholder').ihavecookies(options);

    $('.cookieSettings').on('click', function (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        $('#ihavecookiePlaceholder').ihavecookies(options, 'reinit');
    });
});

/* Helper function to enable / disable content based on the cookie setting
 cookieType: the type of cookie this code depends on
 elementId: the html element the content will be appended to
 contentEnables: content if cookie is enabled
 contentDisables: content if cookie is disabled
 */
function cookieDependentContent(cookieType, elementId, contentEnabled, contentDisabled) {
    function enableHelper() {
        if ($.fn.ihavecookies && $.fn.ihavecookies.preference(cookieType) == true) {
            $(elementId).html(contentEnabled);
        } else {
            $(elementId).html(contentDisabled);
        }
    }
    // run now to apply settings at page load
    enableHelper();
    // attach to callback, to apply on preferences change
    $.fn.ihavecookies.onPrefChange( function() {
        enableHelper();
    });
}


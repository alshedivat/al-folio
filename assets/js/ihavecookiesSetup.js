---
---

// setup ihavecookies options
var options = {
    title: '&#x1F36A; Accept Cookies?',
    message: 'We use cookies to enhance your experience on this website and to enable third party services.',
    delay: 600,
    expires: 30,
    link: '{{site.cookie_info}}',
    acceptBtnLabel: 'Accept All',
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
    $('body').ihavecookies(options);

    $('#footerCookieSettings').on('click', function(){
        $('body').ihavecookies(options, 'reinit');
    });
});
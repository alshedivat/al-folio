/*!
 * ihavecookies - jQuery plugin for displaying cookie/privacy message
 * v0.3.2
 *
 * Copyright (c) 2018 Ketan Mistry (https://iamketan.com.au)
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
(function($) {

    /*
    |--------------------------------------------------------------------------
    | Cookie Message
    |--------------------------------------------------------------------------
    |
    | Displays the cookie message on first visit or 30 days after their
    | last visit.
    |
    | @param event - 'reinit' to reopen the cookie message
    |
    */
    $.fn.ihavecookies = function(options, event) {

        var $element = $(this);

        // Set defaults
        var settings = $.extend({
            cookieTypes: [
                {
                    type: 'Site Preferences',
                    value: 'preferences',
                    description: 'These are cookies that are related to your site preferences, e.g. remembering your username, site colours, etc.'
                },
                {
                    type: 'Analytics',
                    value: 'analytics',
                    description: 'Cookies related to site visits, browser types, etc.'
                },
                {
                    type: 'Marketing',
                    value: 'marketing',
                    description: 'Cookies related to marketing, e.g. newsletters, social media, etc'
                }
            ],
            title: 'Cookies & Privacy',
            message: 'Cookies enable you to use shopping carts and to personalize your experience on our sites, tell us which parts of our websites people have visited, help us measure the effectiveness of ads and web searches, and give us insights into user behavior so we can improve our communications and products.',
            link: '/privacy-policy',
            delay: 2000,
            expires: 30,
            moreInfoLabel: 'More information',
            acceptBtnLabel: 'Accept Cookies',
            advancedBtnLabel: 'Customise Cookies',
            cookieTypesTitle: 'Select cookies to accept',
            fixedCookieTypeLabel:'Necessary',
            fixedCookieTypeDesc: 'These are cookies that are essential for the website to work correctly.',
            onAccept: function(){},
            uncheckBoxes: false
        }, options);

        var myCookie = getCookie('cookieControl');
        var myCookiePrefs = getCookie('cookieControlPrefs');
        if (!myCookie || !myCookiePrefs || event == 'reinit') {
            // Remove all instances of the cookie message so it's not duplicated
            $('#gdpr-cookie-message').remove();

            // Set the 'necessary' cookie type checkbox which can not be unchecked
            var cookieTypes = '<li><input type="checkbox" name="gdpr[]" value="necessary" checked="checked" disabled="disabled"> <label title="' + settings.fixedCookieTypeDesc + '">' + settings.fixedCookieTypeLabel + '</label></li>';

            // Generate list of cookie type checkboxes
            preferences = JSON.parse(myCookiePrefs);
            $.each(settings.cookieTypes, function(index, field) {
                if (field.type !== '' && field.value !== '') {
                    var cookieTypeDescription = '';
                    if (field.description !== false) {
                        cookieTypeDescription = ' title="' + field.description + '"';
                    }
                    cookieTypes += '<li><input type="checkbox" id="gdpr-cookietype-' + field.value + '" name="gdpr[]" value="' + field.value + '" data-auto="on"> <label for="gdpr-cookietype-' + field.value + '"' + cookieTypeDescription + '>' + field.type + '</label></li>';
                }
            });

            // Display cookie message on page
            var cookieMessage = '<div id="gdpr-cookie-message"><h4>' + settings.title + '</h4><p>' + settings.message + ' <a href="' + settings.link + '">' + settings.moreInfoLabel + '</a><div id="gdpr-cookie-types" style="display:none;"><h5>' + settings.cookieTypesTitle + '</h5><ul>' + cookieTypes + '</ul></div><p><button id="gdpr-cookie-accept" type="button">' + settings.acceptBtnLabel + '</button><button id="gdpr-cookie-advanced" type="button">' + settings.advancedBtnLabel + '</button></p></div>';
            setTimeout(function(){
                $($element).append(cookieMessage);
                $('#gdpr-cookie-message').hide().fadeIn('slow', function(){
                    // If reinit'ing, open the advanced section of message
                    // and re-check all previously selected options.
                    if (event == 'reinit') {
                        $('#gdpr-cookie-advanced').trigger('click');
                        $.each(preferences, function(index, field) {
                            $('input#gdpr-cookietype-' + field).prop('checked', true);
                        });
                    }
                });
            }, settings.delay);

            // When accept button is clicked drop cookie
            $('body').on('click','#gdpr-cookie-accept', function(){
                // Set cookie
                dropCookie(true, settings.expires);

                // If 'data-auto' is set to ON, tick all checkboxes because
                // the user hasn't clicked the customise cookies button
                $('input[name="gdpr[]"][data-auto="on"]').prop('checked', true);

                // Save users cookie preferences (in a cookie!)
                var prefs = [];
                $.each($('input[name="gdpr[]"]').serializeArray(), function(i, field){
                    prefs.push(field.value);
                });
                setCookie('cookieControlPrefs', encodeURIComponent(JSON.stringify(prefs)), 365);

                // Run callback function
                settings.onAccept.call(this);
            });

            // Toggle advanced cookie options
            $('body').on('click', '#gdpr-cookie-advanced', function(){
                // Uncheck all checkboxes except for the disabled 'necessary'
                // one and set 'data-auto' to OFF for all. The user can now
                // select the cookies they want to accept.
                $('input[name="gdpr[]"]:not(:disabled)').attr('data-auto', 'off').prop('checked', false);
                $('#gdpr-cookie-types').slideDown('fast', function(){
                    $('#gdpr-cookie-advanced').prop('disabled', true);
                });
            });

        } else {
            var cookieVal = true;
            if (myCookie == 'false') {
                cookieVal = false;
            }
            dropCookie(cookieVal, settings.expires);
        }

        // Uncheck any checkboxes on page load
        if (settings.uncheckBoxes === true) {
            $('input[type="checkbox"].ihavecookies').prop('checked', false);
        }

    };

    // Method to get cookie value
    $.fn.ihavecookies.cookie = function() {
        var preferences = getCookie('cookieControlPrefs');
        return JSON.parse(preferences);
    };

    // Method to check if user cookie preference exists
    $.fn.ihavecookies.preference = function(cookieTypeValue) {
        var control = getCookie('cookieControl');
        var preferences = getCookie('cookieControlPrefs');
        preferences = JSON.parse(preferences);
        if (control === false) {
            return false;
        }
        if (preferences === false || preferences.indexOf(cookieTypeValue) === -1) {
            return false;
        }
        return true;
    };

    /*
    |--------------------------------------------------------------------------
    | Drop Cookie
    |--------------------------------------------------------------------------
    |
    | Function to drop the cookie with a boolean value of true.
    |
    */
    var dropCookie = function(value, expiryDays) {
        setCookie('cookieControl', value, expiryDays);
        $('#gdpr-cookie-message').fadeOut('fast', function() {
            $(this).remove();
        });
    };

    /*
    |--------------------------------------------------------------------------
    | Set Cookie
    |--------------------------------------------------------------------------
    |
    | Sets cookie with 'name' and value of 'value' for 'expiry_days'.
    |
    */
    var setCookie = function(name, value, expiry_days) {
        var d = new Date();
        d.setTime(d.getTime() + (expiry_days*24*60*60*1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
        return getCookie(name);
    };

    /*
    |--------------------------------------------------------------------------
    | Get Cookie
    |--------------------------------------------------------------------------
    |
    | Gets cookie called 'name'.
    |
    */
    var getCookie = function(name) {
        var cookie_name = name + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(cookie_name) === 0) {
                return c.substring(cookie_name.length, c.length);
            }
        }
        return false;
    };

}(jQuery));

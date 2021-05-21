---
---

// funciton to enable analytics if cookie preferences allow it
function enableAnalyticsIfAllowed() {
    if ($.fn.ihavecookies && $.fn.ihavecookies.preference('analytics') == true) {
        {% if site.enable_google_analytics %}
        // google analytics
        var gaScript = document.createElement('script');
        gaScript.type = 'text/javascript';
        gaScript.src = 'https://www.googletagmanager.com/gtag/js?id={{ site.google_analytics }}';
        document.head.appendChild(gaScript);

        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', '{{ site.google_analytics }}');
        {% endif %}

        {% if site.enable_panelbear_analytics %}
        // Panelbear analytics
        var paScript = document.createElement('script');
        paScript.type = 'text/javascript';
        paScript.src = 'https://cdn.panelbear.com/analytics.js?site={{site.panelbear_analytics}}';
        document.head.appendChild(paScript);

        window.panelbear = window.panelbear || function() { (window.panelbear.q = window.panelbear.q || []).push(arguments); };
        panelbear('config', { site: '{{site.panelbear_analytics}}' });
        {% endif %}
    }
}

// try to enable analytics after preferences changed
$.fn.ihavecookies.onPrefChange( function() {
    enableAnalyticsIfAllowed();
});

// try to enable analytics now
enableAnalyticsIfAllowed();

// Smooth Page Transitions with Whoosh Effect
document.addEventListener('DOMContentLoaded', function() {
    // Create transition overlay
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'page-transition-overlay';
    document.body.appendChild(transitionOverlay);
    
    // Create swoosh effect element
    const swooshElement = document.createElement('div');
    swooshElement.className = 'swoosh-effect';
    transitionOverlay.appendChild(swooshElement);
    
    // Page load animation (fade in)
    function pageLoadAnimation() {
        document.body.classList.add('page-loading');
        
        setTimeout(() => {
            document.body.classList.remove('page-loading');
            document.body.classList.add('page-loaded');
        }, 100);
    }
    
    // Page exit animation (whoosh out)
    function pageExitAnimation(callback) {
        document.body.classList.add('page-exiting');
        transitionOverlay.classList.add('active');
        
        setTimeout(() => {
            transitionOverlay.classList.add('swoosh');
        }, 50);
        
        setTimeout(() => {
            if (callback) callback();
        }, 600);
    }
    
    // Initialize page load animation
    pageLoadAnimation();
    
    // Handle all internal link clicks
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        
        // Skip if no link or external link or special cases
        if (!link || 
            link.hostname !== window.location.hostname || 
            link.href.includes('#') ||
            link.href.includes('mailto:') ||
            link.href.includes('tel:') ||
            link.target === '_blank' ||
            e.ctrlKey || e.metaKey || e.shiftKey) {
            return;
        }
        
        // Skip if same page
        if (link.href === window.location.href) {
            return;
        }
        
        e.preventDefault();
        
        // Perform transition
        pageExitAnimation(() => {
            window.location.href = link.href;
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(e) {
        pageExitAnimation(() => {
            window.location.reload();
        });
    });
    
    // Handle form submissions with transitions
    document.addEventListener('submit', function(e) {
        const form = e.target;
        
        // Skip if external action or has specific class to skip transition
        if (form.action && !form.action.includes(window.location.hostname) || 
            form.classList.contains('no-transition')) {
            return;
        }
        
        e.preventDefault();
        
        pageExitAnimation(() => {
            form.submit();
        });
    });
    
    // Preload next page on hover (performance optimization)
    const prefetchedPages = new Set();
    
    document.addEventListener('mouseover', function(e) {
        const link = e.target.closest('a');
        
        if (!link || 
            link.hostname !== window.location.hostname || 
            prefetchedPages.has(link.href) ||
            link.href.includes('#') ||
            link.href === window.location.href) {
            return;
        }
        
        // Create prefetch link
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = link.href;
        document.head.appendChild(prefetchLink);
        
        prefetchedPages.add(link.href);
    });
});
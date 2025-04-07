import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Component that scrolls to the top of the page whenever the route changes
 * @returns {null} This component doesn't render anything
 */
function ScrollToTop() {
  // Get the current location object from react-router
  const { pathname } = useLocation();

  // Effect runs whenever the pathname changes
  useEffect(() => {
    // Scroll to the top of the page (0, 0 coordinates)
    window.scrollTo(0, 0);
  }, [pathname]); // Only re-run the effect if pathname changes

  // Component doesn't render anything
  return null;
}

export default ScrollToTop;

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopProps {
    children: React.ReactNode;
  }
function ScrollToTop({ children }: ScrollToTopProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on route change
  }, [pathname]);
  return children as React.ReactElement; // Use `as` to cast children as ReactElement

  return null; // This component doesn't render anything
}

export default ScrollToTop;
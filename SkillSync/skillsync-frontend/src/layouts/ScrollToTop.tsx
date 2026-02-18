import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: isFirstLoad.current ? "auto" : "smooth",
    });

    isFirstLoad.current = false;
  }, [pathname]);

  return null;
};

export default ScrollToTop;

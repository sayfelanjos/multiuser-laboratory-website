import { useState, useEffect } from "react";

const getCurrentBreakpoint = () => {
  const width = window.innerWidth;
  if (width >= 1400) return "xxl";
  if (width >= 1200) return "xl";
  if (width >= 992) return "lg";
  if (width >= 768) return "md";
  if (width >= 576) return "sm";
  return "xs";
};

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState(getCurrentBreakpoint());

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getCurrentBreakpoint());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
};

export default useBreakpoint;

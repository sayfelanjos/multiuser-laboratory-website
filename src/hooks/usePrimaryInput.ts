import { useEffect, useState } from "react";

/**
 * @hook usePrimaryInput
 * A custom hook to get primary user imput: "mouse" or "touch"
 */
export const usePrimaryInput = () => {
  // Default to 'mouse' for a desktop-first experience.
  const [primaryInput, setPrimaryInput] = useState<"mouse" | "touch">("mouse");

  useEffect(() => {
    // This media query is a great first-pass check for devices that are definitively touch-only.
    const isTouchOnlyDevice = window.matchMedia(
      "(hover: none) and (pointer: coarse)",
    ).matches;
    if (isTouchOnlyDevice) {
      setPrimaryInput("touch");
      return;
    }

    // For hybrid devices, we listen for the FIRST interaction to determine the user's intent.
    const handleMouseMove = () => {
      setPrimaryInput("mouse");
      cleanup();
    };

    const handleTouchStart = () => {
      setPrimaryInput("touch");
      cleanup();
    };

    // The cleanup function removes both listeners.
    const cleanup = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
    };

    // We add the listeners. The first one to fire will call cleanup().
    window.addEventListener("mousemove", handleMouseMove, { once: true });
    window.addEventListener("touchstart", handleTouchStart, { once: true });

    // Fallback cleanup if the component unmounts before any interaction.
    return cleanup;
  }, []);

  return primaryInput;
};

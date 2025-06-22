import { useEffect, useRef } from "react";

export function useLoseFocus({ onClickAway, preventbubbling = true, id }) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickAway = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClickAway();
      }
    };

    const handleDismiss = (e) => {
      if (e.key === "Escape") {
        onClickAway();
      }
    };

    const handleOtherMenuOpen = (event) => {
      if (event.detail !== id) {
        onClickAway();
      }
    };

    document.addEventListener("click", handleClickAway, preventbubbling);
    document.addEventListener("keydown", handleDismiss, preventbubbling);
    window.addEventListener("menu-open", handleOtherMenuOpen, preventbubbling);

    return () => {
      document.removeEventListener("click", handleClickAway, preventbubbling);
      document.removeEventListener("keydown", handleDismiss, preventbubbling);
      window.removeEventListener(
        "menu-open",
        handleOtherMenuOpen,
        preventbubbling,
      );
    };
  }, [onClickAway, preventbubbling, id]);

  return { ref };
}

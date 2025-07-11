import { useEffect, useRef, useState, ReactNode } from "react";
import { cn } from "../../utils/cn";

type ScrollableCarouselProps = {
  children: ReactNode;
  className?: string;
};

const ScrollableCarousel: React.FC<ScrollableCarouselProps> = ({
  children,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mask, setMask] = useState<string>("");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateMask = () => {
      const scrollLeft = el.scrollLeft;
      const scrollWidth = el.scrollWidth;
      const clientWidth = el.clientWidth;

      const atStart = scrollLeft <= 0;
      const atEnd = scrollLeft + clientWidth >= scrollWidth - 1;

      if (atStart) {
        setMask("linear-gradient(to right, black 94%, transparent 100%)");
      } else if (atEnd) {
        setMask("linear-gradient(to right, transparent 0%, black 6%)");
      } else {
        setMask(
          "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        );
      }
    };

    updateMask(); // Initial on mount
    el.addEventListener("scroll", updateMask);
    window.addEventListener("resize", updateMask);

    return () => {
      el.removeEventListener("scroll", updateMask);
      window.removeEventListener("resize", updateMask);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("flex space-x-4 overflow-x-auto p-2 pb-4", className)}
      style={{
        WebkitMaskImage: mask,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "100% 100%",
        maskImage: mask,
        maskRepeat: "no-repeat",
        maskSize: "100% 100%",
        transition: "mask-image 0.3s ease",
      }}
    >
      {children}
    </div>
  );
};

export default ScrollableCarousel;

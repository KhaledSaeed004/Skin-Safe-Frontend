import { motion } from "framer-motion";
import { useMeasure } from "@uidotdev/usehooks";

export function ResizablePanel({ children, classNames }) {
  const [ref, bounds] = useMeasure();
  return (
    <motion.div
      animate={{ height: bounds.height > 0 ? bounds.height : null }}
      className={classNames}
    >
      <div ref={ref}>{children}</div>
    </motion.div>
  );
}

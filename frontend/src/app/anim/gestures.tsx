import * as motion from "motion/react-client";
import { ReactNode } from "react";

export interface IAnimate {
  children: ReactNode;
}
export default function GesturesButton({ children }: IAnimate) {
  return (
    <motion.div className="rounded-md"
      initial={{ backgroundColor: "#050505" }}
      whileHover={{ scale: 1.1 ,backgroundColor: "#0a2381"}}
      whileTap={{ scale: 0.8 }}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
    }}
    >
      {children}
    </motion.div>
  );
}

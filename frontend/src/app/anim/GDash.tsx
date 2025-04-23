import * as motion from "motion/react-client";
import { ReactNode } from "react";

export interface IAnimate {
  children: ReactNode;
}
export default function GesturesButtonDash2({ children }: IAnimate) {
  return (
    <motion.div className="rounded-md mt-[100px]"
      initial={{ backgroundColor: "#050505" }}
      whileHover={{ scale: 1.05 }}
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


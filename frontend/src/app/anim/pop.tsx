"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export interface IAnimate {
  children: ReactNode;
}

export default function AnimasiPop({ children }: IAnimate) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{
        duration: 0.2,
        delay: 0.1,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      {children}
    </motion.div>
  );
}

"use client"
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface IAnimate {
    children:ReactNode
}

export default function AnimasiTransition2({children}:IAnimate) {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration:3,
        delay:1.4,
        ease: [0, 0.71, 0.2, 1.01]
      }}
    >
        {children}
    </motion.div>
  );
}




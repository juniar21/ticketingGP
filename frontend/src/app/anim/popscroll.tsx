"use client"
import { motion } from "framer-motion";
import React, { ReactNode } from "react";

export interface IAnimate {
  children: ReactNode;
}

export default function AnimasiPopScroll({ children }: IAnimate) {
  return (
    <motion.div>
      {React.Children.map(children, (child, index) => (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 1,
            delay: index * 0.3, // Set delay bertambah berdasarkan indeks
            ease: [0, 0.71, 0.2, 1.01]
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

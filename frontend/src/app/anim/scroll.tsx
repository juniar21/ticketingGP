"use client";
import { motion } from "framer-motion";
import React, { ReactNode } from "react";

export interface IAnimate {
  children: ReactNode;
}

export default function AnimasiScroll({ children }: IAnimate) {
  return (
    <motion.div>
      {React.Children.map(children, (child) => (
        <motion.div
          initial={{ y: 30, scale: 1, opacity: 0 }}
          whileInView={{ y: 0, scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.5, // Memberikan delay yang bertambah pada setiap elemen
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

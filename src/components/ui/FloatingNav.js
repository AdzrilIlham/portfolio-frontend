"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence
} from "framer-motion";
import { cn } from "../lib/utils"; // pastikan ini benar

const FloatingNav = ({ navItems, className }) => {
  // Set visible to true so navbar always shows
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.25 }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border rounded-full dark:bg-black bg-white shadow z-[5000] px-6 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((item, i) => (
          <a
            key={i}
            href={item.link}
            className="text-sm hover:text-neutral-400 dark:text-neutral-200"
          >
            {item.name}
          </a>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingNav;

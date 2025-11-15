"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "../lib/utils";

export const FloatingNav = ({ navItems, className }) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious();

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) setVisible(true);
        else setVisible(false);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className={cn(
          "flex max-w-fit fixed top-8 inset-x-0 mx-auto z-[5000]",
          "border border-white/10 shadow-xl",
          "backdrop-blur-2xl rounded-full",          // ★ super rounded
          "dark:bg-black/60 bg-white/70",
          "px-10 py-4 space-x-8",                    // tetap modern & nyaman
          "items-center justify-center",
          className
        )}
      >
        {navItems.map((navItem, idx) => (
          <motion.a
            key={idx}
            href={navItem.link}
            whileTap={{ scale: 0.9 }}
            className="relative text-base font-medium text-neutral-200 hover:text-white transition"
          >
            {navItem.name}

            <motion.span
              layoutId="nav-underline"
              className="absolute left-0 right-0 mx-auto h-[3px] w-full bg-cyan-400 rounded-full"
              style={{ bottom: -6 }}
              initial={false}
              animate={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            />
          </motion.a>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingNav;

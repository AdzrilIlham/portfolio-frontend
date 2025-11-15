"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../lib/utils";

export const DirectionAwareHover = ({
  imageUrl,
  children,
  childrenClassName,
  imageClassName,
  className
}) => {
  const ref = useRef(null);
  const [direction, setDirection] = useState("left");

  const handleMouseEnter = (event) => {
    if (!ref.current) return;

    const direction = getDirection(event, ref.current);
    switch (direction) {
      case 0: setDirection("top"); break;
      case 1: setDirection("right"); break;
      case 2: setDirection("bottom"); break;
      case 3: setDirection("left"); break;
      default: setDirection("left");
    }
  };

  const getDirection = (ev, obj) => {
    const { width: w, height: h, left, top } = obj.getBoundingClientRect();
    const x = ev.clientX - left - w / 2;
    const y = ev.clientY - top - h / 2;
    return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
  };

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      className={cn(
        "relative group rounded-xl overflow-hidden w-full",
        "h-[250px] md:h-[300px] lg:h-[260px]", 
        className
      )}
    >
      <AnimatePresence>
        <motion.div
          className="absolute inset-0"
          initial="initial"
          whileHover={direction}
          exit="exit"
        >
          {/* DARK OVERLAY */}
          <motion.div
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 z-10 transition"
          />

          {/* MAIN IMAGE (FULL, NO EMPTY SPACE) */}
          <motion.img
            src={imageUrl}
            alt=""
            className={cn(
              "absolute inset-0 w-full h-full object-cover",
              "transition-transform duration-500 group-hover:scale-110",
              imageClassName
            )}
            variants={variants}
            transition={{ duration: 0.25 }}
          />

          {/* TEXT CONTENT */}
          <motion.div
            variants={textVariants}
            transition={{ duration: 0.35 }}
            className={cn(
              "absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100",
              "text-white text-lg md:text-xl font-semibold",
              childrenClassName
            )}
          >
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const variants = {
  initial: { x: 0, y: 0 },
  exit: { x: 0, y: 0 },
  top: { y: 20 },
  bottom: { y: -20 },
  left: { x: 20 },
  right: { x: -20 }
};

const textVariants = {
  initial: { opacity: 0, y: 10 },
  exit: { opacity: 0, y: 10 },
  top: { opacity: 1, y: -10 },
  bottom: { opacity: 1, y: 10 },
  left: { opacity: 1, x: -10 },
  right: { opacity: 1, x: 10 }
};

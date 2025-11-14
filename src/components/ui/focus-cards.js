import { cn } from "../lib/utils";
import { useRef, useState } from "react";

export const FocusCards = ({ children, className }) => {
  const cardRef = useRef(null);
  const [, setIsHovering] = useState(false); // isHovering tidak dipakai

  const handleMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateX = ((y - midY) / midY) * 10;
    const rotateY = ((midX - x) / midX) * 10;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    card.style.transform = `
      perspective(800px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.04)
    `;

    const glare = card.querySelector(".glare");
    if (glare) {
      glare.style.background = `
        radial-gradient(
          circle at ${glareX}% ${glareY}%,
          rgba(255,255,255,0.6),
          transparent 60%
        )
      `;
    }
  };

  const resetCard = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform = `
      perspective(800px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative transition-all duration-200 ease-out rounded-xl bg-white shadow-lg hover:shadow-2xl",
        "overflow-hidden select-none",
        className
      )}
      onMouseMove={handleMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        resetCard();
      }}
    >
      <div className="glare pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-300"></div>

      <div className="relative z-10 p-6">{children}</div>
    </div>
  );
};

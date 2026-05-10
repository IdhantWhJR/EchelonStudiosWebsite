import React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const trailX = useSpring(mouseX, { damping: 35, stiffness: 250, mass: 0.8 });
  const trailY = useSpring(mouseY, { damping: 35, stiffness: 250, mass: 0.8 });

  const [isHovering, setIsHovering] = React.useState(false);
  const [isClicking, setIsClicking] = React.useState(false);

  React.useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    const onEnter = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("a, button, [role='button'], input, textarea, select")) {
        setIsHovering(true);
      }
    };
    const onLeave = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("a, button, [role='button'], input, textarea, select")) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Trail */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-primary/40 mix-blend-normal"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 44 : 28,
          height: isHovering ? 44 : 28,
          opacity: isHovering ? 0.6 : 0.35,
        }}
        transition={{ duration: 0.2 }}
      />
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-primary"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isClicking ? 6 : isHovering ? 8 : 5,
          height: isClicking ? 6 : isHovering ? 8 : 5,
          opacity: isHovering ? 1 : 0.9,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}

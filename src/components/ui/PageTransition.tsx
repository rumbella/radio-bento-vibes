import { motion } from "framer-motion";
import React from "react";

interface PageTransitionProps {
  children: React.ReactNode;
  direction?: "left" | "right";
}

const PageTransition = ({
  children,
  direction = "left",
}: PageTransitionProps) => {
  const variants = {
    initial: {
      opacity: 0,
      x: direction === "right" ? 20 : -20,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: direction === "right" ? -20 : 20,
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;

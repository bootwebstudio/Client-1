import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Button = ({ content }) => {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    // Start animation after 2 seconds
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.button
      className="w-full mt-2 mx-0 p-4 text-lg lg:text-xl font-medium lowercase rounded font-[DIRTYLINE] bg-[#E30A03] hover:bg-[#620905] transition-all duration-400 ease-in-out"
      animate={
        startAnimation
          ? { x: [0, -2, 2, -3, 3, -2, 2, 0], y: [0, -1, 1, -2, 2, -1, 1, 0] }
          : {}
      }
      transition={{ duration: 0.1, repeat: Infinity }}
    >
      {content}
    </motion.button>
  );
};

export default Button;

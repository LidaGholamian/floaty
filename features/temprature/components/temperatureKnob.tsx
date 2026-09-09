"use client";

import { motion } from "framer-motion";

type TemperatureKnobProps = {
  y: number;
};

export default function TemperatureKnob({ y }: TemperatureKnobProps) {
  return (
    <motion.div
      animate={{ top: y }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 20,
      }}
      className="absolute left-[76px] z-10 flex h-20 w-20 flex-col items-center justify-center gap-1.5 rounded-full border border-yellow-300/40 bg-zinc-900"
    >
      <div className="h-0 w-0 border-x-5 border-b-11 border-x-transparent border-b-muted" />
      <div className="h-0 w-0 border-x-5 border-t-11 border-x-transparent border-t-muted" />
    </motion.div>
  );
}

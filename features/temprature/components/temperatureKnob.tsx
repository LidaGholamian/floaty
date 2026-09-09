"use client";

import { motion, type MotionValue } from "framer-motion";
import {
  KNOB_LEFT,
  KNOB_SIZE,
  MAX_TEMPERATURE,
  MIN_TEMPERATURE,
} from "../constants/temperature.constants";

type TemperatureKnobProps = {
  y: MotionValue<number>;
  onDragEnd: () => void;
  dragConstraints: { top: number; bottom: number };
  value: number;
};

export default function TemperatureKnob({
  y,
  onDragEnd,
  dragConstraints,
  value,
}: TemperatureKnobProps) {
  return (
    <motion.div
      drag="y"
      dragConstraints={dragConstraints}
      dragElastic={0}
      dragMomentum={false}
      dragPropagation={false}
      onDragEnd={onDragEnd}
      style={{
        y,
        top: 0,
        left: KNOB_LEFT,
        height: KNOB_SIZE,
        width: KNOB_SIZE,
        touchAction: "none",
        background:
          "radial-gradient(circle at 32% 28%, #4a4a4a 0%, #2a2a2a 28%, #141414 62%, #070707 100%)",
        boxShadow:
          "0 16px 32px rgba(0,0,0,0.55), 0 2px 4px rgba(0,0,0,0.4), inset 0 -14px 22px rgba(0,0,0,0.55), inset 0 10px 14px rgba(255,255,255,0.08)",
      }}
      className="absolute z-10 flex cursor-grab flex-col items-center justify-center gap-1 rounded-full active:cursor-grabbing"
      aria-label="Temperature"
      role="slider"
      aria-valuemin={MIN_TEMPERATURE}
      aria-valuemax={MAX_TEMPERATURE}
      aria-valuenow={value}
      aria-orientation="vertical"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[18%] top-[14%] size-7 rounded-full bg-white/20 blur-[6px]"
      />
      <span className="relative z-10 h-0 w-0 border-x-[5px] border-b-[7px] border-x-transparent border-b-zinc-400" />
      <span className="relative z-10 h-0 w-0 border-x-[5px] border-t-[7px] border-x-transparent border-t-zinc-400" />
    </motion.div>
  );
}

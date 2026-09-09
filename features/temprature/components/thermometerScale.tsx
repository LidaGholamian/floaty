"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";
import { KNOB_SIZE, SCALE_HEIGHT } from "../constants/temperature.constants";
import { ticks } from "../constants/temperature.ticks";
import ThermometerTick from "./thermometerTick";

type ThermometerScaleProps = {
  knobY: MotionValue<number>;
  glowColor: MotionValue<string>;
};

export default function ThermometerScale({
  knobY,
  glowColor,
}: ThermometerScaleProps) {
  const glowTop = useTransform(knobY, (y) => y - KNOB_SIZE / 2);

  return (
    <div className="relative w-40" style={{ height: SCALE_HEIGHT }}>
      <motion.div
        className="pointer-events-none absolute right-0 rounded-full opacity-40 blur-2xl"
        style={{
          top: glowTop,
          height: KNOB_SIZE,
          width: KNOB_SIZE,
          background: glowColor,
        }}
        aria-hidden="true"
      />
      {ticks.map((tick, index) => (
        <ThermometerTick
          key={`${tick.type}-${tick.value ?? index}`}
          tick={tick}
          index={index}
          knobY={knobY}
          glowColor={glowColor}
        />
      ))}
    </div>
  );
}

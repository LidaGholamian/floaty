"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";
import type { TemperatureTick } from "../types/temperature.types";
import { KNOB_RADIUS } from "../constants/temperature.constants";
import { indentOffset, temperatureGlow, tickY, yToValue } from "../utils/temperature.utils";

type ThermometerTickProps = {
  tick: TemperatureTick;
  index: number;
  knobY: MotionValue<number>;
  glowColor: MotionValue<string>;
};

export default function ThermometerTick({
  tick,
  index,
  knobY,
}: ThermometerTickProps) {
  const y = tickY(index);
  const isLbs = tick.value === "lbs";

  const indentX = useTransform(knobY, (currentY) =>
    indentOffset(y - currentY, KNOB_RADIUS),
  );

  const lit = useTransform(knobY, (currentY) => {
    const distance = Math.abs(y - currentY);
    return Math.max(0, 1 - distance / KNOB_RADIUS);
  });

  const tickColor = useTransform(knobY, (currentY) => {
    if (isLbs) return "rgb(161, 161, 170)";
    const distance = Math.abs(y - currentY);
    const light = Math.max(0, 1 - distance / KNOB_RADIUS);
    if (light < 0.05) {
      return tick.type === "major" ? "rgb(113, 113, 122)" : "rgb(63, 63, 70)";
    }
    return temperatureGlow(yToValue(currentY)).rgb;
  });

  const tickOpacity = useTransform(lit, (light) =>
    isLbs ? 0.7 : 0.35 + light * 0.65,
  );

  const labelScale = useTransform(lit, (light) => 1 + light * 0.18);

  return (
    <motion.div
      className="absolute right-0 flex -translate-y-1/2 items-center"
      style={{ top: y, x: indentX }}
    >
      {tick.type === "major" ? (
        <motion.span
          className="absolute right-11 w-12 text-right text-xl font-light tabular-nums"
          style={{
            color: tickColor,
            opacity: tickOpacity,
            scale: labelScale,
          }}
        >
          {tick.value}
        </motion.span>
      ) : null}

      <motion.div
        className={`rounded-full ${tick.type === "major" ? "h-[2px] w-5" : "h-px w-3"}`}
        style={{ backgroundColor: tickColor, opacity: tickOpacity }}
      />
    </motion.div>
  );
}

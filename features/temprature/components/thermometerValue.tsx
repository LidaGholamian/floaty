"use client";

import { useState } from "react";
import { motion, type MotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { KNOB_SIZE } from "../constants/temperature.constants";

type ThermometerValueProps = {
  knobTop: MotionValue<number>;
  displayValue: MotionValue<number>;
  glowColor: MotionValue<string>;
};

export default function ThermometerValue({
  knobTop,
  displayValue,
  glowColor,
}: ThermometerValueProps) {
  const [label, setLabel] = useState(String(Math.round(displayValue.get())));
  const top = useTransform(knobTop, (y) => y + KNOB_SIZE / 2);

  useMotionValueEvent(displayValue, "change", (value) => {
    setLabel(String(Math.round(value)));
  });

  return (
    <motion.span
      className="pointer-events-none absolute left-[148px] text-6xl font-extralight tabular-nums tracking-tight"
      style={{
        top,
        y: "-50%",
        color: glowColor,
      }}
    >
      {label}
    </motion.span>
  );
}

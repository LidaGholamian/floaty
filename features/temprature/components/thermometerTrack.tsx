"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";

import { SCALE_HEIGHT, TRACK_LINE_X } from "../constants/temperature.constants";

import { indentOffset } from "../utils/temperature.utils";

type ThermometerTrackProps = {
  knobY: MotionValue<number>;
  glowColor: MotionValue<string>;
};

const INDENT_STEPS = 32;

function circularIndentPath(knobCenterY: number) {
  const x = TRACK_LINE_X;
  const radius = 80;
  const startY = knobCenterY - radius;
  const endY = knobCenterY + radius;
  const segments = [`M ${x} 0`, `L ${x} ${startY}`];

  for (let i = 0; i <= INDENT_STEPS; i += 1) {
    const dy = -radius + (i / INDENT_STEPS) * radius * 2;
    const offset = indentOffset(dy, radius);
    segments.push(`L ${x + offset} ${knobCenterY + dy}`);
  }

  segments.push(`L ${x} ${endY}`, `L ${x} ${SCALE_HEIGHT}`);
  return segments.join(" ");
}

export default function ThermometerTrack({
  knobY,
  glowColor,
}: ThermometerTrackProps) {
  const path = useTransform(knobY, (y) => circularIndentPath(y));

  return (
    <svg
      className="pointer-events-none absolute inset-0 overflow-visible"
      width="80"
      height={SCALE_HEIGHT}
      aria-hidden="true"
    >
      <defs>
        <filter
          id="temperature-line-glow"
          x="-150%"
          y="-100%"
          width="400%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="14" result="outerGlow" />
          <feGaussianBlur stdDeviation="7" result="innerGlow" />

          <feMerge>
            <feMergeNode in="outerGlow" />
            <feMergeNode in="innerGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-transparent"
        style={{ stroke: glowColor, opacity: 1 }}
        filter="url(#temperature-line-glow)"
      />

      <motion.path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ stroke: glowColor }}
      />
    </svg>
  );
}

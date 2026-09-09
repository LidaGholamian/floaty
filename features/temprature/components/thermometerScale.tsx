"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

import { ticks } from "../constants/temperature.ticks";
import {
  TemperatureLevel,
  ThermometerScaleProps,
} from "../types/temperature.types";

export default function ThermometerScale({
  selectedTemperature,
  onMajorTickPositionChange,
}: ThermometerScaleProps) {
  const scaleRef = useRef<HTMLDivElement>(null);

  const tickRefs = useRef<
    Partial<Record<TemperatureLevel, HTMLDivElement | null>>
  >({});

  const selectedIndex = ticks.findIndex(
    (tick) => tick.type === "major" && tick.value === selectedTemperature,
  );

  useEffect(() => {
    const positions: Partial<Record<TemperatureLevel, number>> = {};

    Object.entries(tickRefs.current).forEach(([value, element]) => {
      if (element && scaleRef.current) {
        const scaleRect = scaleRef.current.getBoundingClientRect();
        const tickRect = element.getBoundingClientRect();

        positions[Number(value) as TemperatureLevel] =
          tickRect.top + tickRect.height / 2 - scaleRect.top;
      }
    });

    onMajorTickPositionChange(positions);
  }, [onMajorTickPositionChange]);

  return (
    <div
      ref={scaleRef}
      className="relative flex h-[480px] w-24 flex-col items-center"
    >
      <div className="relative flex h-full w-full flex-col justify-between">
        {ticks.map((tick, index) => {
          const distance = Math.abs(index - selectedIndex);
          const displacement = Math.max(0, 32 - distance * 8);

          return (
            <motion.div
              key={index}
              ref={
                tick.type === "major"
                  ? (element) => {
                      if (tick.value !== "lbs") {
                        tickRefs.current[tick.value as TemperatureLevel] =
                          element;
                      }
                    }
                  : undefined
              }
              animate={{
                x: -displacement,
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 22,
              }}
              className="relative flex items-center justify-center"
            >
              {tick.type === "major" && (
                <span
                  className={`absolute right-20 text-2xl ${
                    tick.value === selectedTemperature
                      ? "text-white/90"
                      : "text-white/60"
                  }`}
                >
                  {tick.value}
                </span>
              )}

              <div
                className={`h-0.5 w-5 rounded-full ${
                  tick.type === "major" ? "bg-white/60" : "bg-white/10"
                }`}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

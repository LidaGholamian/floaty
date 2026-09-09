"use client";

import { useState } from "react";

import TemperatureKnob from "./temperatureKnob";
import ThermometerScale from "./thermometerScale";

import { TemperatureLevel } from "../types/temperature.types";

export default function Thermometer() {
  const [tickPositions, setTickPositions] = useState<
    Partial<Record<TemperatureLevel, number>>
  >({});

  const knobY = (tickPositions[24] ?? 0) - 40;

  return (
    <div className="relative flex h-[480px] items-center">
      <ThermometerScale
        selectedTemperature={24}
        onMajorTickPositionChange={setTickPositions}
      />

      <div className="absolute left-[100px] top-0 h-full w-1 rounded-full bg-yellow-300/30" />

      <TemperatureKnob y={knobY} />
    </div>
  );
}

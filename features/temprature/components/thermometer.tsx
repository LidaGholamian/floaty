"use client";

import { useState } from "react";
import { animate, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import {
  DEFAULT_TEMPERATURE,
  KNOB_SIZE,
  KNOB_SPRING,
  MAX_TEMPERATURE,
  MIN_TEMPERATURE,
  SCALE_HEIGHT,
} from "../constants/temperature.constants";
import {
  snapTemperature,
  temperatureGlow,
  valueToY,
  yToValue,
} from "../utils/temperature.utils";

import TemperatureKnob from "./temperatureKnob";
import ThermometerScale from "./thermometerScale";
import ThermometerTrack from "./thermometerTrack";
import ThermometerValue from "./thermometerValue";

export default function Thermometer() {
  const initialTop = valueToY(DEFAULT_TEMPERATURE) - KNOB_SIZE / 2;
  const knobTop = useMotionValue(initialTop);
  const knobY = useTransform(knobTop, (top) => top + KNOB_SIZE / 2);
  const temperature = useTransform(knobY, (y) => yToValue(y));
  const glowColor = useTransform(temperature, (value) => temperatureGlow(value).rgb);
  const [currentValue, setCurrentValue] = useState(DEFAULT_TEMPERATURE);

  useMotionValueEvent(temperature, "change", (value) => {
    setCurrentValue(snapTemperature(value));
  });

  const minTop = valueToY(MAX_TEMPERATURE) - KNOB_SIZE / 2;
  const maxTop = valueToY(MIN_TEMPERATURE) - KNOB_SIZE / 2;

  function snapKnob() {
    const snapped = snapTemperature(yToValue(knobY.get()));
    void animate(knobTop, valueToY(snapped) - KNOB_SIZE / 2, KNOB_SPRING);
  }

  return (
    <div className="relative flex items-center" style={{ height: SCALE_HEIGHT }}>
      <ThermometerScale knobY={knobY} glowColor={glowColor} />

      <div className="relative w-64" style={{ height: SCALE_HEIGHT }}>
        <ThermometerTrack knobY={knobY} glowColor={glowColor} />
        <TemperatureKnob
          y={knobTop}
          onDragEnd={snapKnob}
          dragConstraints={{ top: minTop, bottom: maxTop }}
          value={currentValue}
        />
        <ThermometerValue
          knobTop={knobTop}
          displayValue={temperature}
          glowColor={glowColor}
        />
      </div>
    </div>
  );
}

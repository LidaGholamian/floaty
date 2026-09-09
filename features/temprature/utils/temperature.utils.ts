import {
  MAX_TEMPERATURE,
  MINOR_TICKS_PER_LEVEL,
  MIN_TEMPERATURE,
  SCALE_HEIGHT,
} from "../constants/temperature.constants";
import { ticks } from "../constants/temperature.ticks";

export const TICK_SPACING = SCALE_HEIGHT / (ticks.length - 1);
export const VALUE_INDEX_OFFSET = MINOR_TICKS_PER_LEVEL;

export function clampTemperature(value: number) {
  return Math.min(MAX_TEMPERATURE, Math.max(MIN_TEMPERATURE, value));
}

export function valueToY(value: number) {
  const index = VALUE_INDEX_OFFSET + (MAX_TEMPERATURE - clampTemperature(value));
  return index * TICK_SPACING;
}

export function yToValue(y: number) {
  const index = y / TICK_SPACING;
  return clampTemperature(MAX_TEMPERATURE - (index - VALUE_INDEX_OFFSET));
}

export function snapTemperature(value: number) {
  return Math.round(clampTemperature(value));
}

export function temperatureGlow(value: number) {
  const t = (clampTemperature(value) - MIN_TEMPERATURE) / (MAX_TEMPERATURE - MIN_TEMPERATURE);
  const red = 255;
  const green = Math.round(232 - t * 58);
  const blue = Math.round(148 - t * 128);

  return {
    rgb: `rgb(${red}, ${green}, ${blue})`,
    intense: t,
  };
}

export function tickY(index: number) {
  return index * TICK_SPACING;
}

export function indentOffset(distanceY: number, radius: number) {
  const u = Math.abs(distanceY / radius);

  if (u >= 1) return 0;

  const t = 1 - u;
  const smooth = t * t * (3 - 2 * t);

  return -radius * 0.3 * smooth;
}

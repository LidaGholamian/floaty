import { BOTTOM_LABEL, MINOR_TICKS_PER_LEVEL, TEMPERATURE_LEVELS } from "./temperature.constants";
import type { TemperatureTick } from "../types/temperature.types";

export const ticks: TemperatureTick[] = [
  ...Array.from({ length: MINOR_TICKS_PER_LEVEL }, () => ({
    type: "minor" as const,
  })),
  ...TEMPERATURE_LEVELS.flatMap((level, index) => [
    {
      type: "major" as const,
      value: level,
    },
    ...(index < TEMPERATURE_LEVELS.length - 1
      ? Array.from({ length: MINOR_TICKS_PER_LEVEL }, () => ({
          type: "minor" as const,
        }))
      : []),
  ]),
  ...Array.from({ length: MINOR_TICKS_PER_LEVEL }, () => ({
    type: "minor" as const,
  })),
  {
    type: "major" as const,
    value: BOTTOM_LABEL,
  },
];

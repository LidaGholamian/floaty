import { BOTTOM_LABEL, MINOR_TICKS_PER_LEVEL, TEMPERATURE_LEVELS } from "./temperature.constants";

export  const ticks = [
    ...Array.from({ length: MINOR_TICKS_PER_LEVEL }, () => ({
      type: "minor" as const,
    })),
    ...TEMPERATURE_LEVELS.flatMap((level, index) => [
      {
        type: "major" as const,
        value: level,
      },
      ...(index < TEMPERATURE_LEVELS.length
        ? Array.from({ length: MINOR_TICKS_PER_LEVEL }, () => ({
            type: "minor" as const,
          }))
        : []),
    ]),
    {
      type: "major" as const,
      value: BOTTOM_LABEL,
    },
  ];

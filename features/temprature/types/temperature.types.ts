export type TemperatureLevel = 6 | 12 | 18 | 24 | 30;

export type TemperatureTick = {
  value?: number;
  isMajor: boolean;
};

export type ThermometerScaleProps = {
  selectedTemperature: TemperatureLevel;
  onMajorTickPositionChange: (
    positions: Partial<Record<TemperatureLevel, number>>,
  ) => void;
};

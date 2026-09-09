export type TemperatureLevel = 6 | 12 | 18 | 24 | 30;

export type TemperatureTick = {
  type: "major" | "minor";
  value?: TemperatureLevel | "lbs";
};

export const TEMPERATURE_LEVELS = [30, 24, 18, 12, 6] as const;

export const MIN_TEMPERATURE = 6;
export const MAX_TEMPERATURE = 30;
export const DEFAULT_TEMPERATURE = 18;

export const BOTTOM_LABEL = "lbs";

export const MINOR_TICKS_PER_LEVEL = 5;

export const SCALE_HEIGHT = 480;
export const KNOB_SIZE = 80;
export const KNOB_GAP = 22;
export const KNOB_LEFT = 46;

export const TRACK_LINE_X = 28;
export const KNOB_RADIUS = KNOB_SIZE / 2;
export const TRACK_INDENT = KNOB_RADIUS;
export const TICK_INDENT = KNOB_RADIUS;
export const GLOW_RADIUS = KNOB_RADIUS;

export const KNOB_SPRING = {
  type: "spring",
  stiffness: 380,
  damping: 32,
  mass: 0.8,
} as const;

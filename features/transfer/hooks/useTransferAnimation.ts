"use client";

import { useEffect } from "react";

import {
  animate,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

import {
  TRANSFER_LAYOUT,
  TRANSFER_TIMING,
} from "../constants/transfer.constants";

export function useTransferAnimation() {
  const reducedMotion = useReducedMotion();
  const progress = useMotionValue(0);

  const { avatarSize, knobSize, gap, gooPadding } = TRANSFER_LAYOUT;

  const senderCenterX = gooPadding + avatarSize / 2;
  const receiverCenterX =
    gooPadding + avatarSize + gap + avatarSize / 2;

  const centerY = gooPadding + avatarSize / 2;

  const stageWidth = avatarSize * 2 + gap + gooPadding * 2;
  const stageHeight = avatarSize + gooPadding * 2;

  const ring = useTransform(
    progress,
    [0, 0.08, 0.16, 1],
    [0, 1, 5, 5],
  );

  const blobSize = useTransform(
    ring,
    (value) => avatarSize + value * 2,
  );

  const knobX = useTransform(
    progress,
    [0, 0.18, 0.3, 0.36, 0.43, 0.78, 1],
    [
      senderCenterX + 10,
      senderCenterX + 18,
      senderCenterX + 40,
      senderCenterX + 32,
      senderCenterX + 55,
      receiverCenterX,
      receiverCenterX,
    ],
  );

  const knobScale = useTransform(
    progress,
    [0, 0.1, 0.18, 0.78, 0.9, 1],
    [0, 0, 1, 1, 0.55, 0.2],
  );

  const knobOpacity = useTransform(
    progress,
    [0, 0.14, 0.8, 0.92, 1],
    [0, 0, 1, 0.35, 0],
  );

  const arrowOpacity = useTransform(
    progress,
    [0, 0.36, 0.48, 0.72, 0.8, 1],
    [0, 0, 1, 1, 0, 0],
  );

  const senderToolbarOpacity = useTransform(
    progress,
    [0, 0.12, 0.18, 0.68, 0.76, 1],
    [0, 0, 1, 1, 0, 0],
  );

  const receiverToolbarOpacity = useTransform(
    progress,
    [0, 0.74, 0.84, 0.92, 1],
    [0, 0, 1, 1, 1],
  );

  const senderToolbarY = useTransform(
    senderToolbarOpacity,
    [0, 1],
    [8, 0],
  );

  const receiverToolbarY = useTransform(
    receiverToolbarOpacity,
    [0, 1],
    [8, 0],
  );

  const senderBlobLeft = useTransform(
    blobSize,
    (size) => senderCenterX - size / 2,
  );

  const receiverBlobLeft = useTransform(
    blobSize,
    (size) => receiverCenterX - size / 2,
  );

  const blobTop = useTransform(
    blobSize,
    (size) => centerY - size / 2,
  );

  const knobLeft = useTransform(
    knobX,
    (x) => x - knobSize / 2,
  );

  useEffect(() => {
    if (reducedMotion) {
      progress.set(1);
      return;
    }

    let cancelled = false;
    let playback: ReturnType<typeof animate> | undefined;

    async function play() {
      while (!cancelled) {
        progress.set(0);

        await new Promise((resolve) =>
          setTimeout(resolve, TRANSFER_TIMING.initialDelayMs),
        );

        if (cancelled) return;

        playback = animate(progress, 1, {
          duration: TRANSFER_TIMING.travelDuration,
          ease: [0.4, 0, 0.2, 1],
        });

        await playback;

        if (cancelled) return;

        await new Promise((resolve) =>
          setTimeout(resolve, TRANSFER_TIMING.holdMs),
        );
      }
    }

    void play();

    return () => {
      cancelled = true;
      playback?.stop();
    };
  }, [progress, reducedMotion]);

  return {
    progress,

    stageWidth,
    stageHeight,
    centerY,

    blobSize,
    knobLeft,
    knobScale,
    knobOpacity,
    arrowOpacity,

    senderToolbarOpacity,
    receiverToolbarOpacity,
    senderToolbarY,
    receiverToolbarY,

    senderBlobLeft,
    receiverBlobLeft,
    blobTop
  };
}

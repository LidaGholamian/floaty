"use client";

import { useEffect } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  TRANSFER_LAYOUT,
  TRANSFER_PARTICIPANTS,
  TRANSFER_TIMING,
} from "../constants/transfer.constants";
import TransferAvatar from "./transferAvatar";
import TransferGooFilter from "./transferGooFilter";
import TransferToolbar from "./transferToolbar";

export default function TransferAnimation() {
  const reducedMotion = useReducedMotion();
  const progress = useMotionValue(0);

  const { avatarSize, knobSize, gap, gooPadding } = TRANSFER_LAYOUT;
  const senderCenterX = gooPadding + avatarSize / 2;
  const receiverCenterX = gooPadding + avatarSize + gap + avatarSize / 2;
  const centerY = gooPadding + avatarSize / 2;
  const stageWidth = avatarSize * 2 + gap + gooPadding * 2;
  const stageHeight = avatarSize + gooPadding * 2;

  const ring = useTransform(progress, [0, 0.08, 0.16, 1], [0, 1, 5, 5]);
  const blobSize = useTransform(ring, (value) => avatarSize + value * 2);

  const knobX = useTransform(
    progress,
    [0, 0.18, 0.32, 0.78, 1],
    [
      senderCenterX + 10,
      senderCenterX + 18,
      senderCenterX + avatarSize / 2 + 8,
      receiverCenterX,
      receiverCenterX,
    ],
  );

  const knobScale = useTransform(
    progress,
    [0, 0.1, 0.18, 0.78, 0.9, 1],
    [0, 0, 1, 1, 0.55, 0.2],
  );

  const knobOpacity = useTransform(progress, [0, 0.14, 0.8, 0.92, 1], [0, 0, 1, 0.35, 0]);

  const arrowOpacity = useTransform(
    progress,
    [0, 0.16, 0.22, 0.72, 0.8, 1],
    [0, 0, 1, 1, 0, 0],
  );

  const senderToolbarOpacity = useTransform(
    progress,
    [0, 0.16, 0.22, 0.62, 0.72, 1],
    [0, 0, 1, 1, 0, 0],
  );

  const receiverToolbarOpacity = useTransform(
    progress,
    [0, 0.72, 0.82, 1],
    [0, 0, 1, 1],
  );

  const senderToolbarY = useTransform(senderToolbarOpacity, [0, 1], [8, 0]);
  const receiverToolbarY = useTransform(receiverToolbarOpacity, [0, 1], [8, 0]);

  const senderBlobLeft = useTransform(blobSize, (size) => senderCenterX - size / 2);
  const receiverBlobLeft = useTransform(blobSize, (size) => receiverCenterX - size / 2);
  const blobTop = useTransform(blobSize, (size) => centerY - size / 2);
  const knobLeft = useTransform(knobX, (x) => x - knobSize / 2);

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
        await new Promise((resolve) => setTimeout(resolve, TRANSFER_TIMING.initialDelayMs));
        if (cancelled) return;

        playback = animate(progress, 1, {
          duration: TRANSFER_TIMING.travelDuration,
          ease: [0.4, 0, 0.2, 1],
        });
        await playback;
        if (cancelled) return;

        await new Promise((resolve) => setTimeout(resolve, TRANSFER_TIMING.holdMs));
      }
    }

    void play();

    return () => {
      cancelled = true;
      playback?.stop();
    };
  }, [progress, reducedMotion]);

  return (
    <section
      className="mx-auto my-8 w-[calc(100%-1.5rem)] max-w-4xl rounded-3xl border border-white/10 bg-zinc-200 px-4 py-16 sm:my-12 sm:px-8 md:my-16 md:px-12 md:py-24"
      aria-label="Money transfer animation"
    >
      <TransferGooFilter />

      <div
        className="relative mx-auto"
        style={{
          width: stageWidth,
          height: stageHeight + 56,
          backgroundImage: "radial-gradient(circle, rgb(24 24 27 / 0.22) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      >
        <div
          className="absolute inset-x-0 top-0"
          style={{
            height: stageHeight,
            filter: "url(#transfer-goo)",
          }}
        >
          <motion.span
            className="absolute rounded-full bg-black"
            style={{
              width: blobSize,
              height: blobSize,
              left: senderBlobLeft,
              top: blobTop,
            }}
          />
          <motion.span
            className="absolute rounded-full bg-black"
            style={{
              width: blobSize,
              height: blobSize,
              left: receiverBlobLeft,
              top: blobTop,
            }}
          />
          <motion.span
            className="absolute rounded-full bg-black"
            style={{
              width: knobSize,
              height: knobSize,
              left: knobLeft,
              top: centerY - knobSize / 2,
              scale: knobScale,
              opacity: knobOpacity,
            }}
          />
        </div>

        <div
          className="absolute z-20"
          style={{ left: gooPadding, top: gooPadding }}
        >
          <TransferAvatar participant={TRANSFER_PARTICIPANTS.sender} />
        </div>

        <div
          className="absolute z-20"
          style={{
            left: gooPadding + avatarSize + gap,
            top: gooPadding,
          }}
        >
          <TransferAvatar participant={TRANSFER_PARTICIPANTS.receiver} />
        </div>

        <motion.div
          className="pointer-events-none absolute z-10 flex items-center justify-center text-white"
          style={{
            width: knobSize,
            height: knobSize,
            left: knobLeft,
            top: centerY - knobSize / 2,
            scale: knobScale,
            opacity: arrowOpacity,
          }}
          aria-hidden="true"
        >
          <span className="size-1.5 rounded-full bg-white" />
          <ArrowRight className="ms-0.5 size-3.5" strokeWidth={2.75} />
        </motion.div>

        <motion.div
          className="absolute z-20 flex justify-center"
          style={{
            left: gooPadding,
            top: gooPadding + avatarSize + 12,
            width: avatarSize,
            opacity: senderToolbarOpacity,
            y: senderToolbarY,
          }}
        >
          <TransferToolbar
            role="sender"
            balanceLabel={TRANSFER_PARTICIPANTS.sender.balanceLabel}
            deltaLabel={TRANSFER_PARTICIPANTS.sender.deltaLabel}
          />
        </motion.div>

        <motion.div
          className="absolute z-20 flex justify-center"
          style={{
            left: gooPadding + avatarSize + gap,
            top: gooPadding + avatarSize + 12,
            width: avatarSize,
            opacity: receiverToolbarOpacity,
            y: receiverToolbarY,
          }}
        >
          <TransferToolbar
            role="receiver"
            balanceLabel={TRANSFER_PARTICIPANTS.receiver.balanceLabel}
            deltaLabel={TRANSFER_PARTICIPANTS.receiver.deltaLabel}
          />
        </motion.div>
      </div>
    </section>
  );
}

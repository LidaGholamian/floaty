"use client";

"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import {
  TRANSFER_LAYOUT,
  TRANSFER_PARTICIPANTS,
} from "../constants/transfer.constants";

import { useTransferAnimation } from "../hooks/useTransferAnimation";

import TransferAvatar from "./transferAvatar";
import TransferGooFilter from "./transferGooFilter";
import TransferToolbar from "./transferToolbar";

export default function TransferAnimation() {

  const { avatarSize, knobSize, gap, gooPadding } = TRANSFER_LAYOUT;

  const {
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
    blobTop,
  } = useTransferAnimation();

  return (
    <section
      className="mx-auto my-8 w-[calc(100%-1.5rem)] max-w-2xl rounded-3xl border border-white/10 bg-zinc-200 px-4 py-16 sm:my-12 sm:px-8 md:my-16 md:px-12 md:py-24"
      aria-label="Money transfer animation"
    >
      <TransferGooFilter />

      <div
        className="relative mx-auto"
        style={{
          width: stageWidth,
          height: stageHeight + 56,
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
            progress={progress}
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
            progress={progress}
          />
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

import type { TransferToolbarProps } from "../types/transfer.types";

export default function TransferToolbar({
  balanceLabel,
  deltaLabel,
  role,
  progress,
}: TransferToolbarProps) {
  
 const animatedDeltaValue = useTransform(progress, [0.18, 0.55], [-33, -56]);

 const animatedDelta = useTransform(animatedDeltaValue, (value) =>
   Math.round(value).toString(),
 );

  return (
    <div className="flex items-center overflow-hidden rounded-full bg-black text-sm font-medium text-white shadow-sm">
      <span className="px-3 py-1">{balanceLabel}</span>

      {role === "sender" ? (
        <motion.span className="me-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-black">
          {animatedDelta}
        </motion.span>
      ) : (
        <span className="me-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-black">
          {deltaLabel}
        </span>
      )}
    </div>
  );
}

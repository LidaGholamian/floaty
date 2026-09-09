"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import {
  previewEntranceVariants,
  previewTransition,
  previewVariants,
} from "../constants/media.constants";

import type { MediaPreviewProps } from "../types/media.types";

export default function MediaPreview({
  id,
  src,
  alt,
  state,
  onClick,
}: MediaPreviewProps) {
  return (
    <motion.div
      initial={{
        y: 80,
        opacity: 0,
        scale: 0.85,
      }}
      animate={{
        y: 0,
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 1.2,
        ease: "easeOut",
      }}
    >
      <motion.div
        layoutId={`media-preview-${id}`}
        initial="resting"
        animate={state}
        variants={previewVariants}
        transition={previewTransition}
        onClick={onClick}
        className="relative shrink-0 cursor-pointer overflow-hidden"
      >
        <Image src={src} alt={alt} fill sizes="96px" className="object-cover" />
      </motion.div>
    </motion.div>
  );
}

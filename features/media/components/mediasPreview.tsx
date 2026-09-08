import Image from "next/image";

import { motion } from "framer-motion";

import { MediaPreviewProps } from "../types/media.types";
import { previewVariants } from "../constants/media.constants";

export default function MediaPreview({
  src,
  alt,
  state,
  onClick,
}: MediaPreviewProps) {
  return (
    <motion.div
      onClick={onClick}
      variants={previewVariants}
      animate={state}
      transition={{
        type: "spring",
        stiffness: 115,
        damping: 20,
      }}
      className="relative shrink-0 overflow-hidden"
    >
      <Image src={src} alt={alt} fill sizes="128px" className="object-cover" />
    </motion.div>
  );
}

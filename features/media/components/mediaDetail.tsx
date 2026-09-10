import Image from "next/image";

import { motion } from "framer-motion";

import type { MediaDetailProps } from "../types/media.types";
import PhoneDisplay from "./phoneDisplay";
import AccountWidget from "./accountWidget";

export default function MediaDetail({
  id,
  image,
  title,
  onCancel,
}: MediaDetailProps) {
  return (
    <motion.section
      layoutId={`media-preview-${id}`}
      className="relative h-full w-full overflow-hidden"
    >
      <Image
        src={image}
        alt={title}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 h-full w-full">
        <PhoneDisplay />
        <AccountWidget />
      </div>

      <button
        type="button"
        onClick={onCancel}
        className="absolute right-5 bottom-5 z-20 rounded-full bg-black/50 px-4 py-2 text-sm text-white"
      >
        Cancel
      </button>
    </motion.section>
  );
}

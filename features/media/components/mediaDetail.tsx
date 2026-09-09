import Image from "next/image";

import { motion } from "framer-motion";

import type { MediaDetailProps } from "../types/media.types";
import PhoneDisplay from "./phoneDisplay";
import AccountWidget from "./accountWidget";

export default function MediaDetail({
  id,
  image,
  artist,
  title,
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
    </motion.section>
  );
}

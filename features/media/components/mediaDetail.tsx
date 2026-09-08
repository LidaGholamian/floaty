import Image from "next/image";

import { MediaDetailProps } from "../types/media.types";

export default function MediaDetail({
  image,
  artist,
  title,
}: MediaDetailProps) {
  return (
    <section className="relative h-full w-full overflow-hidden">
      <Image
        src={image}
        alt={title}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center text-center text-white">
        <p className="text-sm opacity-70">{artist}</p>
        <h2 className="mt-2 text-3xl font-semibold">{title}</h2>
      </div>
    </section>
  );
}

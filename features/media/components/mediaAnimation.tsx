"use client";

import { MEDIA_PREVIEWS } from "../constants/media.constants";
import { useState } from "react";
import { MediaPreviewState } from "../types/media.types";
import MediaPreview from "./mediasPreview";
import MediaDetail from "./mediaDetail";

export default function MediaAnimation() {

  const [selectedPreviewId, setSelectedPreviewId] = useState<number | null>(null);
  const [previewStates, setPreviewStates] = useState<
    Record<number, MediaPreviewState>
  >(
    Object.fromEntries(
      MEDIA_PREVIEWS.map((preview) => [
        preview.id,
        preview.id === 1 ? "preview" : "resting",
      ]),
    ),
  );

  const handleSelectPreview = (id: number) => {
    setSelectedPreviewId(id);

    setPreviewStates(
      Object.fromEntries(
        MEDIA_PREVIEWS.map((item) => [
          item.id,
          item.id === id ? "selected" : "resting",
        ]),
      ),
    );
  };

  const handlePreviewAnimation = (id: number) => {
    setPreviewStates((current) => ({
      ...current,
      [id]: "preview",
    }));
  };

  const selectedPreview = MEDIA_PREVIEWS.find(
    (preview) => preview.id === selectedPreviewId,
  );

  return (
    <section className="flex min-h-[70vh] items-center justify-center">
      <div className="relative my-2 h-120 w-75 overflow-hidden rounded-[40px] border border-white/10 bg-zinc-200 sm:h-137.5">
        {selectedPreview ? (
          <MediaDetail
            image={selectedPreview.src}
            artist={selectedPreview.artist}
            title={selectedPreview.title}
          />
        ) : (
          <div className="absolute inset-y-0 left-1/2 flex -translate-x-1/2 -translate-y-2 flex-col items-center justify-center gap-2">
            {MEDIA_PREVIEWS.map((preview) => (
              <MediaPreview
                key={preview.id}
                src={preview.src}
                alt={preview.alt}
                state={previewStates[preview.id]}
                onClick={() => handleSelectPreview(preview.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

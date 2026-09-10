"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import { MEDIA_PREVIEWS } from "../constants/media.constants";
import MediaDetail from "./mediaDetail";
import MediaPreview from "./mediaPreview";
import PhoneDisplay from "./phoneDisplay";
import AccountWidget from "./accountWidget";

export default function MediaAnimation() {
  const [selectedPreviewId, setSelectedPreviewId] = useState<number | null>(
    null,
  );

  const [expandedPreviewId, setExpandedPreviewId] = useState<number | null>(
    null,
  );

  const handleSelectPreview = (id: number) => {
    if (selectedPreviewId === id) {
      setExpandedPreviewId(id);
      return;
    }

    setSelectedPreviewId(id);
  };

  const selectedPreview = MEDIA_PREVIEWS.find(
    (preview) => preview.id === expandedPreviewId,
  );

  const handleCancel = () => {
    setSelectedPreviewId(null);
    setExpandedPreviewId(null);
  };

  return (
    <section className="flex min-h-[70vh] items-center justify-center">
      <div className="relative my-2 h-120 w-75 overflow-hidden rounded-[40px] border border-white/10 sm:h-137.5">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden rounded-[40px]">
          <div className="media-background" />
        </div>

        <PhoneDisplay />
        <AccountWidget />

        <AnimatePresence mode="wait">
          {selectedPreview ? (
            <MediaDetail
              key="detail"
              id={selectedPreview.id}
              image={selectedPreview.src}
              title={selectedPreview.title}
              onCancel={handleCancel}
            />
          ) : (
            <div
              key="previews"
              className="absolute inset-y-0 left-1/2 flex -translate-x-1/2 -translate-y-2 flex-col items-center justify-center gap-2"
            >
              {MEDIA_PREVIEWS.map((preview) => (
                <MediaPreview
                  key={preview.id}
                  id={preview.id}
                  src={preview.src}
                  alt={preview.alt}
                  state={
                    selectedPreviewId === preview.id ? "selected" : "resting"
                  }
                  onClick={() => handleSelectPreview(preview.id)}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

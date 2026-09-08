"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

const avatars = {
  sender: "/images/avatar-1.webp",
  receiver: "/images/avatar-2.webp",
};

export default function TransferAnimation() {
  const bubbleX = useMotionValue(4);

  const neckStartX = useTransform(
    bubbleX,
    [4, 35, 50, 65, 96],
    [4, 4, 8, 16, 30],
  );

  const neckOpacity = useTransform(bubbleX, [4, 35, 45, 55], [1, 1, 0.5, 0]);

  const neckPath = useTransform(bubbleX, (x) => {
    const y = 23;

    const stretch = Math.min(1, Math.max(0, (x - 4) / 31));
    const collapse = Math.min(1, Math.max(0, (x - 42) / 35));

    const startX = 4 + collapse * Math.max(0, x - 8);
    const distance = x - startX;

    if (distance <= 0) {
      return "";
    }

    const startRadius = 4.5 * (1 - collapse);
    const endRadius = Math.max(0.15, 3.5 - stretch * 2.8);

    const curve = Math.min(distance * 0.55, 16);

    const topStart = y - startRadius;
    const bottomStart = y + startRadius;

    const topEnd = y - endRadius;
    const bottomEnd = y + endRadius;

    return `
     M ${startX} ${topStart}

  C ${startX + curve} ${topStart},
    ${x - curve} ${topEnd},
    ${x} ${topEnd}

  C ${x - curve} ${bottomEnd},
    ${startX + curve} ${bottomStart},
    ${startX} ${bottomStart}

  Z
  `;
  });

  const receiverToolbarOpacity = useTransform(
    bubbleX,
    [4, 50, 70, 96],
    [0, 0, 1, 1],
  );

  useEffect(() => {
    const controls = animate(bubbleX, [4, 50, 96], {
      type: "spring",
      stiffness: 35,
      damping: 22,
      mass: 1.2,
    });

    return controls.stop;
  }, [bubbleX]);

  return (
    <section
      className="mx-3 my-8 max-w-4xl rounded-3xl border border-white/10 bg-surface/70 px-4 py-16 sm:px-8 sm:py-16 md:px-12 md:py-24 sm:mx-6 sm:my-12 md:mx-auto md:my-16 w-[calc(100%-1.5rem)]"
      aria-label="Money transfer animation"
    >
      <div className="relative mx-auto aspect-2/1 w-full max-w-3xl">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          viewBox="0 0 100 50"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <motion.path
            d={neckPath}
            fill="white"
            style={{ opacity: neckOpacity }}
          />
          <motion.circle cx={bubbleX} cy="23" r="3.5" fill="white" />
          {/* <motion.circle
            cx={bubbleX}
            cy="23"
            r="3.5"
            fill="white"
            animate={{
              cx: [4, 50, 96],
            }}
            transition={{
              type: "spring",
              stiffness: 35,
              damping: 22,
              mass: 1.2,
            }}
          /> */}
        </svg>
        {/* Sender */}
        <div className="absolute left-0 top-1/2 flex -translate-y-1/2 flex-col items-center gap-3">
          <div className="relative size-16 overflow-hidden rounded-full sm:size-20">
            <Image
              src={avatars.sender}
              alt=""
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>

          <motion.div
            className="flex items-center gap-2 text-sm text-foreground"
            initial={{
              opacity: 0,
              y: -5,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <span>$89</span>
            <span>↗</span>
          </motion.div>

          {/* <div className="flex items-center gap-2 text-sm text-foreground">
            <span>$89</span>
            <span>↗</span>
          </div> */}
        </div>

        {/* Receiver */}
        <div className="absolute right-0 top-1/2 flex -translate-y-1/2 flex-col items-center gap-3">
          <div className="relative size-16 overflow-hidden rounded-full sm:size-20">
            <Image
              src={avatars.receiver}
              alt=""
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <motion.div
            className="flex items-center gap-2 text-sm text-foreground"
            style={{
              opacity: receiverToolbarOpacity,
            }}
          >
            <span>$89</span>
            <span>↗</span>
          </motion.div>
          {/* <div className="flex items-center gap-2 text-sm text-foreground">
            <span>$89</span>
            <span>↗</span>
          </div> */}
        </div>
      </div>
    </section>
  );
}

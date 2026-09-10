export const MEDIA_PREVIEWS = [
  {
    id: 1,
    src: "/images/billie.webp",
    alt: "Billie Eilish",
    title: "Birds of a Feather",
  },
  {
    id: 2,
    src: "/images/jackson.webp",
    alt: "Michael Jackson",
    title: "Billie Jean",
  },
  {
    id: 3,
    src: "/images/mars.webp",
    alt: "Bruno Mars",
    title: "Die With a Smile",
  },
  {
    id: 4,
    src: "/images/rihanna.webp",
    alt: "Rihanna",
    title: "Diamonds",
  },
  {
    id: 5,
    src: "/images/swift.webp",
    alt: "Taylor Swift",
    title: "Cruel Summer",
  },
] as const;

export const previewVariants = {
  resting: {
    width: 80,
    height: 80,
    borderRadius: "9999px",
  },

  selected: {
    width: 96,
    height: 96,
    borderRadius: "24px",
  },
} as const;

export const previewEntranceVariants = {
  hidden: {
    y: 80,
    opacity: 0,
    scale: 0.85,
  },

  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
} as const;

export const previewTransition = {
  type: "spring",
  stiffness: 90,
  damping: 24,
  mass: 1,
} as const;

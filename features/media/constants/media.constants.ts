export const MEDIA_PREVIEWS = [
  {
    id: 1,
    src: "/images/billie.webp",
    alt: "Billie Eilish",
    artist: "Billie Eilish",
    title: "Birds of a Feather",
  },
  {
    id: 2,
    src: "/images/jackson.webp",
    alt: "Michael Jackson",
    artist: "Michael Jackson",
    title: "Billie Jean",
  },
  {
    id: 3,
    src: "/images/mars.webp",
    alt: "Bruno Mars",
    artist: "Bruno Mars",
    title: "Die With a Smile",
  },
  {
    id: 4,
    src: "/images/rihanna.webp",
    alt: "Rihanna",
    artist: "Rihanna",
    title: "Diamonds",
  },
  {
    id: 5,
    src: "/images/swift.webp",
    alt: "Taylor Swift",
    artist: "Taylor Swift",
    title: "Cruel Summer",
  },
] as const;


export const previewVariants = {
  entering: {
    width: 80,
    height: 80,
    borderRadius: "9999px",
  },
  preview: {
    width: 96,
    height: 96,
    borderRadius: "24px",
  },
  resting: {
    width: 80,
    height: 80,
    borderRadius: "9999px",
  },
  selected: {
    width: 128,
    height: 128,
    borderRadius: "24px",
  },
} as const;

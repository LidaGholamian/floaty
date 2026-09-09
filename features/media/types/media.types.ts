export type MediaPreviewState = "resting" | "selected";

export type MediaPreviewProps = {
  id: number;
  src: string;
  alt: string;
  state: MediaPreviewState;
  onClick: () => void;
};

export type MediaDetailProps = {
  id: number;
  image: string;
  artist: string;
  title: string;
};

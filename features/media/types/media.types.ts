export type MediaPreviewState =
  | "entering"
  | "preview"
  | "resting"
  | "selected";

export type MediaPreviewProps = {
  src: string;
  alt: string;
  state: MediaPreviewState;
  onClick: () => void;
};

export type MediaDetailProps = {
  image: string;
  artist: string;
  title: string;
};

import Image from "next/image";
import type { TransferParticipant } from "../types/transfer.types";
import { TRANSFER_LAYOUT } from "../constants/transfer.constants";

type TransferAvatarProps = {
  participant: TransferParticipant;
};

export default function TransferAvatar({ participant }: TransferAvatarProps) {
  const size = TRANSFER_LAYOUT.avatarSize;

  return (
    <div
      className="relative overflow-hidden rounded-full bg-zinc-300"
      style={{ width: size, height: size }}
    >
      <Image
        src={participant.src}
        alt={participant.alt}
        fill
        sizes={`${size}px`}
        className="object-cover"
        draggable={false}
      />
    </div>
  );
}

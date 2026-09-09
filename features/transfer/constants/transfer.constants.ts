import type { TransferParticipant } from "../types/transfer.types";

export const TRANSFER_PARTICIPANTS: Record<
  TransferParticipant["role"],
  TransferParticipant
> = {
  sender: {
    role: "sender",
    name: "Alex",
    src: "/images/avatar-1.webp",
    alt: "Sender avatar",
    balanceLabel: "$189",
    deltaLabel: "-56",
  },
  receiver: {
    role: "receiver",
    name: "Jordan",
    src: "/images/avatar-2.webp",
    alt: "Receiver avatar",
    balanceLabel: "$89",
    deltaLabel: "+56",
  },
};

export const TRANSFER_LAYOUT = {
  avatarSize: 80,
  knobSize: 38,
  gap: 112,
  gooPadding: 36,
} as const;

export const TRANSFER_TIMING = {
  initialDelayMs: 1000,
  travelDuration: 3.6,
  holdMs: 900,
} as const;

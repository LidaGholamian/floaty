import { MotionValue } from "framer-motion";

export type TransferRole = "sender" | "receiver";

export type TransferParticipant = {
  role: TransferRole;
  name: string;
  src: string;
  alt: string;
  balanceLabel: string;
  deltaLabel: string;
};

export type TransferToolbarProps = {
  balanceLabel: string;
  deltaLabel: string;
  role: TransferRole;
  progress: MotionValue<number>;
};

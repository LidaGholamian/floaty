export type TransferRole = "sender" | "receiver";

export type TransferParticipant = {
  role: TransferRole;
  name: string;
  src: string;
  alt: string;
  balanceLabel: string;
  deltaLabel: string;
};

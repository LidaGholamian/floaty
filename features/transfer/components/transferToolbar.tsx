import type { TransferRole } from "../types/transfer.types";

type TransferToolbarProps = {
  balanceLabel: string;
  deltaLabel: string;
  role: TransferRole;
};

export default function TransferToolbar({
  balanceLabel,
  deltaLabel,
  role,
}: TransferToolbarProps) {
  return (
    <div className="flex items-center overflow-hidden rounded-full bg-black text-sm font-medium text-white shadow-sm">
      <span className="px-3 py-1">{balanceLabel}</span>
      {role === "sender" ? (
        <span className="me-1 rounded-full bg-white/20 px-2 py-0.5 text-xs">
          {deltaLabel}
        </span>
      ) : (
        <span className="me-1 flex size-6 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-black">
          {deltaLabel}
        </span>
      )}
    </div>
  );
}

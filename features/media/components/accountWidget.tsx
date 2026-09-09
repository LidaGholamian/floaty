"use client";

import { BatteryCharging } from "lucide-react";

export default function AccountWidget() {
  return (
    <div className="absolute right-5 top-12 flex h-44 w-12 -translate-y-1/8 flex-col items-center justify-between rounded-3xl bg-black px-2.5 py-3 text-white">
      <div className="flex flex-col items-center gap-2">
        <div className="h-7 w-7 overflow-hidden rounded-full bg-zinc-700">
          <div className="h-full w-full bg-linear-to-br from-purple-300 to-purple-700" />
        </div>

        <div className="text-center">
          <p className="text-[10px] text-white/60">Hi</p>
          <p className="text-xs font-medium">Jack</p>
        </div>
      </div>

      <div className="h-6 w-6 bg-green-400 rounded-full flex items-center justify-center">
        <BatteryCharging className="h-4 w-4" />
      </div>
    </div>
  );
}

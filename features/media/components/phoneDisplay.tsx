"use client";

export default function PhoneDisplay() {
  return (
    <div className="absolute inset-0 flex flex-col items-start gap-28 px-6 py-10 text-white">
      <span className="text-3xl font-medium tracking-tight">15:42</span>

      <div className="flex flex-col items-start gap-1 text-xs text-white/60">
        <span>Wednesday</span>
        <span>September 9</span>
      </div>

      <span className="text-3xl font-light tracking-tight">37°</span>
    </div>
  );
}

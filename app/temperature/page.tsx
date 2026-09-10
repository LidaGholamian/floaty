import { Thermometer } from "@/features/temprature/components";

export default function TemperaturePage() {
  return (
    <main className="flex h-[calc(100vh-80px)] items-center justify-center">
      <Thermometer />
    </main>
  );
}

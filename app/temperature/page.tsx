import { Thermometer } from "@/features/temprature/components";

export default function TemperaturePage() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center pt-2 md:pt-0">
      <Thermometer />
    </main>
  );
}

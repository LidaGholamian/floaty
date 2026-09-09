import type { Metadata } from "next";
import { Vazirmatn, Figtree } from "next/font/google";
import "./globals.css";
import Navigation from "@/features/navigation/components/navigation";

const figtree = Figtree({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-vazirmatn",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "floaty",
  description: "A responsive UI animation showcase",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${vazirmatn.variable} ${figtree.variable}`}>
      <body className="min-h-full flex flex-col">
        <Navigation />
        {children}</body>
    </html>
  );
}

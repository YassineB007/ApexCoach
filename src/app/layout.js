import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "ApexCoach — Premium Fitness Coaching",
    template: "%s | ApexCoach",
  },
  description:
    "Lose 5–10kg in 90 days with structured training, nutrition, and accountability. Free consultation available.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-[#0f0f0d]">{children}</body>
    </html>
  );
}

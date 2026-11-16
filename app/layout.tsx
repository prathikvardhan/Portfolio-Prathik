import type { Metadata } from "next";
import { Instrument_Serif, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prathik Vardhan — Student, Technologist, Problem Solver",
  description:
    "The portfolio of Prathik Vardhan, a student with a deep interest in technology and mathematics. Bharat Tech League 2025 Codex competition winner at A Hub.",
  keywords: [
    "Prathik Vardhan",
    "student portfolio",
    "technology",
    "mathematics",
    "Bharat Tech League",
    "Codex competition",
    "A Hub",
  ],
  openGraph: {
    title: "Prathik Vardhan — Student, Technologist, Problem Solver",
    description:
      "Mathematics, technology, and a bias for building. Meet Prathik Vardhan.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${instrumentSerif.variable}`}>
        {children}
      </body>
    </html>
  );
}

"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(
  () => import("@/components/scene/hero-scene").then((module) => module.HeroScene),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#ddd2c1]"
        style={{
          background:
            "radial-gradient(circle at 50% 44%, #eee6da 0%, #ddd2c1 43%, #cfc1ad 100%)",
        }}
      />
    ),
  },
);

export function HeroVisual() {
  return <HeroScene />;
}

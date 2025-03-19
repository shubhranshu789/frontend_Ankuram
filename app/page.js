"use client";

import dynamic from "next/dynamic";

const HomeWithRouter = dynamic(() => import("./HomeWithRouter"), {
  ssr: false,
});

export default function Home() {
  return <HomeWithRouter />;
}

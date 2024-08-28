"use client";
import Navbar from "@/components/Navbar";
import Landing from "@/components/Landing";

export default function Home() {
  return(
    <main className="flex flex-col min-h-screen gap-4 px-4">
      <Navbar />
      <Landing />
    </main>
  )
}

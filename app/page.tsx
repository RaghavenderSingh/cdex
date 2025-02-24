import { Appbar } from "@/components/Appbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Appbar />
      <Hero />
    </main>
  );
}

import { Hero } from "@/components/Hero";
import { WorkGrid } from "@/components/work/WorkGrid";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <WorkGrid />
      <About />
      <Contact />
    </>
  );
}

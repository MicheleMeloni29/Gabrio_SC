import FullPageScroller from "./components/FullPageScroller";
import NavBar from "./components/NavBar";
import AboutSection from "./sections/About";
import ContactSection from "./sections/Contact";
import Hero from "./sections/Hero";
import TimelineSection from "./sections/Timeline";
import ProjectsSection from "./sections/Work";

export default function Home() {
  return (
    <div className="relative h-screen overflow-hidden bg-black text-white">
      <NavBar />
      <FullPageScroller>
        <Hero />
        <AboutSection />
        <TimelineSection />
        <ProjectsSection />
        <ContactSection />
      </FullPageScroller>
    </div>
  );
}

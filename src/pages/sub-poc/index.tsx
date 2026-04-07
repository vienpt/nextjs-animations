import CinematicCover from "./components/CinematicCover";
import GridContentSection from "./components/GridContentSection";
import ParallaxCover from "./components/ParallaxCover";
import HorizontalGallery from "./components/HorizontalGallery";
import LenisProvider from "@/hocs/LenisProvider";
import HeroSection from "./components/HeroVideoSection";

export default function SubPocPage() {
  return (
    <LenisProvider>
      <HeroSection />
      <CinematicCover sectionId="cinematic-cover-1" />
      <GridContentSection />
      <ParallaxCover
        headline={"Global material\nprocessing increased"}
        topRightImage="/nature-green.png"
        bottomLeftImage="/nature-green.png"
      />
      <CinematicCover sectionId="cinematic-cover-2" />
      <HorizontalGallery
        items={[
          "/nature-screen.png",
          "/nature-screen.png",
          "/nature-screen.png",
          "/nature-screen.png",
        ]}
      />
    </LenisProvider>
  );
}

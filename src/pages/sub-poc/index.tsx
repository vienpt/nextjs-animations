import CinematicCover from "@/components/sub-poc/CinematicCover";
import GridContentSection from "@/components/sub-poc/GridContentSection";
import ParallaxCover from "@/components/sub-poc/ParallaxCover";
import HorizontalGallery from "@/components/sub-poc/HorizontalGallery";
import LenisProvider from "@/hocs/LenisProvider";
import HeroSection from "@/components/sub-poc/HeroVideoSection";

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

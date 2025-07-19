import HeroSection from './homeSections/HeroSection';
import FeaturesSection from './homeSections/FeaturesSection';
import CallToActionSection from './homeSections/CallToActionSection';
import FooterSection from './homeSections/FooterSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <HeroSection />
      <FeaturesSection />
      <CallToActionSection />
      <FooterSection />
    </main>
  );
}

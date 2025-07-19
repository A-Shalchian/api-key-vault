import HeroSection from './homeSections/HeroSection';
import FeaturesSection from './homeSections/FeaturesSection';
import CallToActionSection from './homeSections/CallToActionSection';
import FooterSection from './homeSections/FooterSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 relative overflow-hidden">
      {/* Large background blobs for the entire page */}
      <div className="fixed top-0 -left-48 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob"></div>
      <div className="fixed top-0 -right-48 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
      <div className="fixed -bottom-48 left-48 w-96 h-96 bg-sky-400 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-4000"></div>
      
      <HeroSection />
      <FeaturesSection />
      <CallToActionSection />
      <FooterSection />
    </main>
  );
}

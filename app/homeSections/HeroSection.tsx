import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">
            Secure Your API Keys
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
          Store, manage, and retrieve your API keys with military-grade encryption.
          Keep your sensitive credentials safe and accessible only to you.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <Link href="/signup" className="group px-8 py-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
            <span>Get Started</span>
            <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/login" className="px-8 py-4 rounded-lg bg-white text-blue-600 font-medium border border-blue-600 hover:bg-blue-50 transition-all shadow-md hover:shadow-lg">
            Log In
          </Link>
        </div>
      </div>
    </section>
  );
}

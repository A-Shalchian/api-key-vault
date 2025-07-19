import Link from 'next/link';
import { ChevronRight, Shield } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Abstract shapes in background */}
      <div className="absolute -left-10 top-1/4 h-72 w-72 animate-blob rounded-full bg-purple-500 opacity-20 mix-blend-multiply blur-3xl"></div>
      <div className="absolute right-0 top-1/3 h-72 w-72 animate-blob animation-delay-2000 rounded-full bg-indigo-500 opacity-20 mix-blend-multiply blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 h-72 w-72 animate-blob animation-delay-4000 rounded-full bg-sky-500 opacity-20 mix-blend-multiply blur-3xl"></div>
      
      {/* Glass card for hero content */}
      <div className="relative rounded-3xl border border-white/20 bg-white/30 p-10 shadow-2xl backdrop-blur-sm">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-sky-500 p-3 shadow-lg">
            <Shield className="h-12 w-12 text-white" />
          </div>
        </div>
        
        <div className="text-center">
          <h1 className="mb-8 font-extrabold text-5xl md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500 bg-clip-text text-transparent">
              Secure Your API Keys
            </span>
          </h1>
          <p className="mx-auto mb-12 max-w-2xl leading-relaxed text-gray-700 text-xl">
            Store, manage, and retrieve your API keys with military-grade encryption.
            Keep your sensitive credentials safe and accessible only to you.
          </p>
          <div className="flex flex-col justify-center gap-5 sm:flex-row">
            <Link 
              href="/signup" 
              className="group flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 font-medium text-white shadow-lg transition-all hover:-translate-y-0.5 hover:from-indigo-500 hover:to-purple-500 hover:shadow-xl"
            >
              <span>Get Started</span>
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              href="/login" 
              className="rounded-xl border border-indigo-200 bg-white/80 px-8 py-4 font-medium text-indigo-600 shadow-md transition-all backdrop-blur-sm hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-white/90 hover:shadow-lg"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

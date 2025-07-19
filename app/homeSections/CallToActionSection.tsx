import Link from 'next/link';
import { Key, Lock, ArrowRight } from 'lucide-react';

export default function CallToActionSection() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="absolute -top-16 right-0 h-72 w-72 animate-blob animation-delay-4000 rounded-full bg-purple-500 opacity-10 mix-blend-multiply blur-3xl"></div>
      <div className="absolute -bottom-8 left-24 h-72 w-72 animate-blob animation-delay-2000 rounded-full bg-indigo-500 opacity-10 mix-blend-multiply blur-3xl"></div>
      
      {/* Content box with glass effect */}
      <div className="overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-indigo-600/90 via-purple-600/90 to-sky-500/90 shadow-2xl backdrop-blur-sm">
        <div className="p-2">  {/* Border gradient container */}
          <div className="rounded-2xl bg-white/90 p-8 text-center backdrop-blur-sm sm:p-12">
            {/* Lock icon in circle */}
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-sky-500 p-5 shadow-lg">
              <Lock className="h-10 w-10 text-white" />
            </div>
            
            <h2 className="mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500 bg-clip-text text-4xl font-bold text-transparent">
              Ready to Get Started?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-700">
              Securely store and manage all your API keys in one place.
            </p>
            
            <div className="flex flex-col justify-center gap-5 sm:flex-row">
              <Link 
                href="/store-key" 
                className="group flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:from-indigo-500 hover:to-purple-500 hover:shadow-xl"
              >
                <Key className="h-5 w-5" />
                <span>Store & Retrieve Keys</span>
                <ArrowRight className="h-5 w-5 -translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
              <Link 
                href="/keys" 
                className="flex items-center justify-center rounded-xl border border-indigo-200 bg-white px-8 py-4 font-medium text-indigo-600 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg"
              >
                <span>View Your Keys</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

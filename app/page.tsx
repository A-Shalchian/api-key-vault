import Link from 'next/link';
import KeyVault from './components/KeyVault';
import { Lock, Calendar, Shield, ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
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

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Use API Key Vault?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Lock className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">End-to-End Encryption</h3>
            <p className="text-gray-600 leading-relaxed">Your API keys are encrypted before they leave your browser and can only be decrypted by you.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Calendar className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Easy Access</h3>
            <p className="text-gray-600 leading-relaxed">Retrieve your API keys whenever you need them with just a few clicks.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Shield className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Storage</h3>
            <p className="text-gray-600 leading-relaxed">Your encrypted keys are stored in a secure database with multiple layers of protection.</p>
          </div>
        </div>
      </section>

      {/* Key Vault Tool Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="p-8 sm:p-12">
            <h2 className="text-3xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Try It Now</h2>
            <KeyVault />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="mb-6 text-gray-300">© 2025 API Key Vault. All rights reserved.</p>
          <div className="flex justify-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors hover:underline">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors hover:underline">Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

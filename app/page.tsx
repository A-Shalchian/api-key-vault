import Link from 'next/link';
import { Shield, Lock, Calendar, Key, ChevronRight, Github, Twitter, Zap, Eye, Database } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Animated glow orbs background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-gray-300/30 dark:bg-slate-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-gray-400/20 dark:bg-slate-700/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-slate-300/10 dark:bg-slate-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section - Side by Side */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left Side - Text Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-slate-800 rounded-full border border-gray-200 dark:border-slate-700 animate-slide-down">
              <Shield className="h-4 w-4 text-gray-700 dark:text-slate-300" />
              <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Military-Grade Security</span>
            </div>

            <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight">
              <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 bg-clip-text text-transparent animate-gradient">
                Your API Keys,
              </span>
              <br />
              <span className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 dark:from-slate-200 dark:via-slate-100 dark:to-slate-200 bg-clip-text text-transparent animate-gradient" style={{ animationDelay: '0.1s' }}>
                Secured Forever
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-slate-300 leading-relaxed max-w-xl">
              Store and manage your API keys with <span className="font-semibold text-gray-800 dark:text-slate-100">end-to-end encryption</span>.
              Access them anytime, anywhere—without compromising security.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup"
                className="group flex items-center justify-center space-x-2 rounded-xl bg-gray-800 dark:bg-slate-100 hover:bg-gray-900 dark:hover:bg-white px-8 py-4 font-semibold text-white dark:text-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Get Started Free</span>
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/login"
                className="rounded-xl border-2 border-gray-300 dark:border-slate-600 bg-transparent px-8 py-4 font-semibold text-gray-800 dark:text-slate-200 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:border-gray-400 dark:hover:border-slate-500"
              >
                Sign In
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-gray-600 dark:text-slate-400">
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4" />
                <span>256-bit Encryption</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Zero-Knowledge</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span>Instant Access</span>
              </div>
            </div>
          </div>

          {/* Right Side - Visual Element */}
          <div className="relative animate-fade-in-right">
            {/* Main Card - API Key Vault Demo */}
            <div className="relative rounded-2xl border border-gray-200 dark:border-slate-600/50 bg-white/80 dark:bg-slate-800/95 p-6 sm:p-8 shadow-2xl dark:shadow-slate-900/50 backdrop-blur-sm transform hover:scale-[1.02] transition-all duration-500">

              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-slate-700">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center">
                    <Key className="h-5 w-5 text-gray-700 dark:text-slate-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-slate-100">API Key Vault</h3>
                    <p className="text-xs text-gray-500 dark:text-slate-400">Your secure storage</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3 rounded-full bg-red-400 animate-pulse"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>

              {/* API Keys List */}
              <div className="space-y-3">
                {/* Key Item 1 */}
                <div className="group rounded-xl bg-gray-50 dark:bg-slate-700/50 p-4 border border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500 transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <Database className="h-5 w-5 text-gray-600 dark:text-slate-400" />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-800 dark:text-slate-100">OpenAI API</p>
                        <p className="text-xs text-gray-500 dark:text-slate-400 font-mono">sk-•••••••••••••••••</p>
                      </div>
                    </div>
                    <Eye className="h-4 w-4 text-gray-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Key Item 2 */}
                <div className="group rounded-xl bg-gray-50 dark:bg-slate-700/50 p-4 border border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500 transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <Database className="h-5 w-5 text-gray-600 dark:text-slate-400" />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-800 dark:text-slate-100">Stripe API</p>
                        <p className="text-xs text-gray-500 dark:text-slate-400 font-mono">pk_•••••••••••••••••</p>
                      </div>
                    </div>
                    <Eye className="h-4 w-4 text-gray-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Key Item 3 */}
                <div className="group rounded-xl bg-gray-50 dark:bg-slate-700/50 p-4 border border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500 transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <Database className="h-5 w-5 text-gray-600 dark:text-slate-400" />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-800 dark:text-slate-100">AWS Access</p>
                        <p className="text-xs text-gray-500 dark:text-slate-400 font-mono">AKIA•••••••••••••••</p>
                      </div>
                    </div>
                    <Eye className="h-4 w-4 text-gray-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-slate-700 flex items-center justify-between text-xs text-gray-500 dark:text-slate-400">
                <span className="flex items-center space-x-1">
                  <Lock className="h-3 w-3" />
                  <span>End-to-end encrypted</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Shield className="h-3 w-3" />
                  <span>3 keys stored</span>
                </span>
              </div>
            </div>

            {/* Floating Security Badge */}
            <div className="absolute -top-4 -right-4 bg-gray-800 dark:bg-slate-100 text-white dark:text-gray-900 px-4 py-2 rounded-full shadow-lg text-sm font-semibold animate-bounce-slow hidden sm:block">
              🔒 100% Secure
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -left-4 h-24 w-24 bg-gray-300/30 dark:bg-slate-600/20 rounded-full blur-2xl animate-pulse hidden lg:block"></div>
            <div className="absolute -top-8 -right-8 h-32 w-32 bg-gray-400/20 dark:bg-slate-700/10 rounded-full blur-3xl animate-pulse hidden lg:block" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="mb-12 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 dark:from-slate-100 dark:via-blue-100 dark:to-slate-100 bg-clip-text text-center text-4xl font-bold text-transparent">
          Why Use API Key Vault?
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Feature Card 1 */}
          <div className="rounded-2xl border border-gray-200 dark:border-slate-600/50 bg-white/80 dark:bg-slate-800/95 p-8 shadow-lg dark:shadow-slate-900/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-gray-300 dark:hover:border-slate-500">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 dark:bg-slate-700 shadow-md">
              <Lock className="h-8 w-8 text-gray-700 dark:text-slate-300" />
            </div>
            <h3 className="mb-3 text-gray-800 dark:text-slate-100 text-xl font-semibold">
              End-to-End Encryption
            </h3>
            <p className="leading-relaxed text-gray-600 dark:text-slate-300">
              Your API keys are encrypted before they leave your browser and can only be decrypted by you.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="rounded-2xl border border-gray-200 dark:border-slate-600/50 bg-white/80 dark:bg-slate-800/95 p-8 shadow-lg dark:shadow-slate-900/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-gray-300 dark:hover:border-slate-500">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 dark:bg-slate-700 shadow-md">
              <Calendar className="h-8 w-8 text-gray-700 dark:text-slate-300" />
            </div>
            <h3 className="mb-3 text-gray-800 dark:text-slate-100 text-xl font-semibold">
              Easy Access
            </h3>
            <p className="leading-relaxed text-gray-600 dark:text-slate-300">
              Retrieve your API keys whenever you need them with just a few clicks.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="rounded-2xl border border-gray-200 dark:border-slate-600/50 bg-white/80 dark:bg-slate-800/95 p-8 shadow-lg dark:shadow-slate-900/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-gray-300 dark:hover:border-slate-500">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 dark:bg-slate-700 shadow-md">
              <Shield className="h-8 w-8 text-gray-700 dark:text-slate-300" />
            </div>
            <h3 className="mb-3 text-gray-800 dark:text-slate-100 text-xl font-semibold">
              Secure Storage
            </h3>
            <p className="leading-relaxed text-gray-600 dark:text-slate-300">
              Your encrypted keys are stored in a secure database with multiple layers of protection.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-slate-600/50 bg-white/80 dark:bg-slate-800/95 shadow-lg dark:shadow-slate-900/50 backdrop-blur-sm">
          <div className="p-8 text-center sm:p-12">
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 dark:bg-slate-700 p-5 shadow-md">
              <Lock className="h-10 w-10 text-gray-700 dark:text-slate-300" />
            </div>

            <h2 className="mb-6 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 dark:from-slate-100 dark:via-blue-100 dark:to-slate-100 bg-clip-text text-4xl font-bold text-transparent">
              Ready to Get Started?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-600 dark:text-slate-300">
              Securely store and manage all your API keys in one place.
            </p>

            <div className="flex flex-col justify-center gap-5 sm:flex-row">
              <Link
                href="/store-key"
                className="group flex items-center justify-center space-x-2 rounded-lg bg-gray-800 dark:bg-slate-100 hover:bg-gray-900 dark:hover:bg-white px-8 py-4 font-medium text-white dark:text-gray-900 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Key className="h-5 w-5" />
                <span>Store Your Keys</span>
                <ChevronRight className="h-5 w-5 -translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
              <Link
                href="/keys"
                className="flex items-center justify-center rounded-lg border border-gray-200 dark:border-slate-600/50 bg-gray-100 dark:bg-slate-700/70 px-8 py-4 font-medium text-gray-700 dark:text-slate-300 shadow-md transition-all duration-300 hover:border-gray-300 dark:hover:border-slate-500 hover:shadow-lg"
              >
                <span>View Your Keys</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative overflow-hidden bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 px-4 py-16 text-gray-800 dark:text-slate-100">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-center justify-center">
            <div className="mb-4 flex items-center">
              <Shield className="mr-2 h-8 w-8 text-gray-700 dark:text-slate-300" />
              <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 dark:from-slate-100 dark:via-blue-100 dark:to-slate-100 bg-clip-text text-2xl font-bold text-transparent">
                API Key Vault
              </span>
            </div>
            <p className="max-w-md text-center text-sm text-gray-600 dark:text-slate-400">
              Your secure solution for storing and managing API keys with end-to-end encryption.
            </p>
          </div>

          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <h3 className="mb-4 text-lg font-medium text-gray-800 dark:text-slate-100">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-slate-400 transition-colors hover:text-gray-900 dark:hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-600 dark:text-slate-400 transition-colors hover:text-gray-900 dark:hover:text-white">Security</a></li>
                <li><a href="#" className="text-gray-600 dark:text-slate-400 transition-colors hover:text-gray-900 dark:hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div className="text-center">
              <h3 className="mb-4 text-lg font-medium text-gray-800 dark:text-slate-100">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-slate-400 transition-colors hover:text-gray-900 dark:hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-600 dark:text-slate-400 transition-colors hover:text-gray-900 dark:hover:text-white">API Reference</a></li>
                <li><a href="#" className="text-gray-600 dark:text-slate-400 transition-colors hover:text-gray-900 dark:hover:text-white">Support</a></li>
              </ul>
            </div>
            <div className="text-center">
              <h3 className="mb-4 text-lg font-medium text-gray-800 dark:text-slate-100">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-slate-400 transition-colors hover:text-gray-900 dark:hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 dark:text-slate-400 transition-colors hover:text-gray-900 dark:hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 dark:text-slate-400 transition-colors hover:text-gray-900 dark:hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-slate-800 pt-8">
            <div className="flex flex-col items-center justify-between md:flex-row">
              <p className="mb-4 text-sm text-gray-600 dark:text-slate-400 md:mb-0">© 2025 API Key Vault. All rights reserved.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 dark:text-slate-400 transition-colors hover:text-gray-900 dark:hover:text-white">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-600 dark:text-slate-400 transition-colors hover:text-gray-900 dark:hover:text-white">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

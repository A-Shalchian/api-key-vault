import { Lock, Calendar, Shield } from 'lucide-react';

export default function FeaturesSection() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <h2 className="mb-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500 bg-clip-text text-center text-4xl font-bold text-transparent">
        Why Use API Key Vault?
      </h2>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Feature Card 1 */}
        <div className="rounded-2xl border border-indigo-100 bg-white/80 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h3 className="mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-xl font-semibold text-transparent">
            End-to-End Encryption
          </h3>
          <p className="leading-relaxed text-gray-700">
            Your API keys are encrypted before they leave your browser and can only be decrypted by you.
          </p>
        </div>
        
        {/* Feature Card 2 */}
        <div className="rounded-2xl border border-indigo-100 bg-white/80 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-sky-500 shadow-md">
            <Calendar className="h-8 w-8 text-white" />
          </div>
          <h3 className="mb-3 bg-gradient-to-r from-purple-600 to-sky-500 bg-clip-text text-xl font-semibold text-transparent">
            Easy Access
          </h3>
          <p className="leading-relaxed text-gray-700">
            Retrieve your API keys whenever you need them with just a few clicks.
          </p>
        </div>
        
        {/* Feature Card 3 */}
        <div className="rounded-2xl border border-indigo-100 bg-white/80 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 shadow-md">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h3 className="mb-3 bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-xl font-semibold text-transparent">
            Secure Storage
          </h3>
          <p className="leading-relaxed text-gray-700">
            Your encrypted keys are stored in a secure database with multiple layers of protection.
          </p>
        </div>
      </div>
    </section>
  );
}

import { Lock, Calendar, Shield } from 'lucide-react';

export default function FeaturesSection() {
  return (
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
  );
}

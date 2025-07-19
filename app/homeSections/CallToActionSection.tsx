import Link from 'next/link';
import { Key } from 'lucide-react';

export default function CallToActionSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="p-8 sm:p-12 text-center">
          <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">Securely store and manage all your API keys in one place.</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Link href="/store-key" className="group px-8 py-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
              <Key className="h-5 w-5" />
              <span>Store & Retrieve Keys</span>
            </Link>
            <Link href="/keys" className="px-8 py-4 rounded-lg bg-white text-blue-600 font-medium border border-blue-600 hover:bg-blue-50 transition-all shadow-md hover:shadow-lg">
              <span>View Your Keys</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

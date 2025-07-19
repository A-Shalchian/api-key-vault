import { Shield, Github, Twitter } from 'lucide-react';
// will change to react-icons when deprecated. When Github and Twitter icons are removed.
export default function FooterSection() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-sky-900 px-4 py-16 text-white">
      {/* Decorative elements */}
      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500"></div>
      <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-purple-500 opacity-10 mix-blend-multiply blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-indigo-500 opacity-10 mix-blend-multiply blur-3xl"></div>
      
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-center justify-center">
          <div className="mb-4 flex items-center">
            <Shield className="mr-2 h-8 w-8 text-sky-400" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-sky-400 bg-clip-text text-2xl font-bold text-transparent">
              API Key Vault
            </span>
          </div>
          <p className="max-w-md text-center text-sm text-gray-300">
            Your secure solution for storing and managing API keys with end-to-end encryption.
          </p>
        </div>
        {/* Test Links */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <h3 className="mb-4 text-lg font-medium text-white">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 transition-colors hover:text-sky-400">Features</a></li>
              <li><a href="#" className="text-gray-300 transition-colors hover:text-sky-400">Security</a></li>
              <li><a href="#" className="text-gray-300 transition-colors hover:text-sky-400">Pricing</a></li>
            </ul>
          </div>
          <div className="text-center">
            <h3 className="mb-4 text-lg font-medium text-white">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 transition-colors hover:text-sky-400">Documentation</a></li>
              <li><a href="#" className="text-gray-300 transition-colors hover:text-sky-400">API Reference</a></li>
              <li><a href="#" className="text-gray-300 transition-colors hover:text-sky-400">Support</a></li>
            </ul>
          </div>
          <div className="text-center">
            <h3 className="mb-4 text-lg font-medium text-white">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 transition-colors hover:text-sky-400">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 transition-colors hover:text-sky-400">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 transition-colors hover:text-sky-400">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="mb-4 text-sm text-gray-400 md:mb-0">© 2025 API Key Vault. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 transition-colors hover:text-sky-400">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-sky-400">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

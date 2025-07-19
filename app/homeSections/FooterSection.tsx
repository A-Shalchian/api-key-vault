export default function FooterSection() {
  return (
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
  );
}

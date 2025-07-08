import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "API Key Vault",
  description: "Securely store and manage your API keys",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="sticky top-0 z-10 w-full border-b bg-white">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold">API Key Vault</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Login
              </Link>
              <Link href="/signup" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                Sign Up
              </Link>
            </div>
          </div>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}

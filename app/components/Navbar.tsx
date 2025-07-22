"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Session } from "@supabase/supabase-js";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Key, User, PlusCircle, LogOut, Menu, X, Home, Shield } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const DEFAULT_AVATAR = "https://www.gravatar.com/avatar/?d=mp";

export default function Navbar() {
  const [session, setSession] = useState<Session | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500 shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-white flex items-center space-x-2 hover:opacity-90 transition-opacity">
          <Shield className="h-6 w-6 stroke-white" />
          <span>API Key Vault</span>
        </Link>
        {session ? (
          <div className="flex items-center space-x-6">
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6 mr-6">
              <Link 
                href="/keys" 
                className="flex items-center space-x-1 text-white hover:text-white/80 font-medium transition-all"
              >
                <Key className="h-4 w-4" />
                <span>Vault</span>
              </Link>
              <Link 
                href="/store-key" 
                className="flex items-center space-x-1 text-white hover:text-white/80 font-medium transition-all"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Store Keys</span>
              </Link>
            </div>
            
            {/* Theme Toggle - Desktop */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white hover:text-white/80 transition-all focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <div className="relative">
              <button
                onClick={() => setMenuOpen((open) => !open)}
                className="rounded-full focus:outline-none ring-2 ring-white/50 hover:ring-white transition-all"
              >
                <Image
                  src={DEFAULT_AVATAR}
                  alt="User avatar"
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full"
                />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white/95 backdrop-blur-sm shadow-xl ring-1 ring-white/10 animate-in zoom-in-95 duration-200">
                  <div className="flex flex-col items-center border-b border-gray-100/20 px-4 py-4 bg-gradient-to-r from-indigo-600/10 to-sky-500/10 rounded-t-lg">
                    <Link href="/profile" onClick={() => setMenuOpen(false)}>
                      <div className="p-1 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 hover:opacity-90 transition-all">
                        <Image
                          src={DEFAULT_AVATAR}
                          alt="User avatar large"
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                      </div>
                    </Link>
                    <p className="text-sm font-medium text-gray-800 truncate w-full text-center mt-2">
                      {session.user?.email}
                    </p>
                  </div>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </div>
                  </Link>
                  <Link
                    href="/keys"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <Key className="h-4 w-4" />
                      <span>Vault</span>
                    </div>
                  </Link>
                  <Link
                    href="/store-key"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <PlusCircle className="h-4 w-4" />
                      <span>Store Keys</span>
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-all rounded-b-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <LogOut className="h-4 w-4" />
                      <span>Sign out</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            <Link
              href="/login"
              className="rounded-md bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white hover:bg-white/30 transition-all border border-white/30 shadow-sm"
            >
              Login
            </Link>
          </div>
        )}
        
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && session && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-xl border-t border-white/20 animate-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-6 space-y-4">
              <Link
                href="/"
                className="flex items-center space-x-3 text-gray-800 hover:text-indigo-600 font-medium transition-all py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>
              <Link
                href="/keys"
                className="flex items-center space-x-3 text-gray-800 hover:text-indigo-600 font-medium transition-all py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Key className="h-5 w-5" />
                <span>Vault</span>
              </Link>
              <Link
                href="/store-key"
                className="flex items-center space-x-3 text-gray-800 hover:text-indigo-600 font-medium transition-all py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <PlusCircle className="h-5 w-5" />
                <span>Store Keys</span>
              </Link>
              <Link
                href="/profile"
                className="flex items-center space-x-3 text-gray-800 hover:text-indigo-600 font-medium transition-all py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>
              
              {/* Theme Toggle - Mobile */}
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-800 font-medium">Theme</span>
                <ThemeToggle />
              </div>
              
              <hr className="border-gray-200" />
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 text-red-600 hover:text-red-700 font-medium transition-all py-2 w-full"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

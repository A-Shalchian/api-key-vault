"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Session } from "@supabase/supabase-js";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Key, User, PlusCircle, LogOut, Menu, X, Home, Shield, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const DEFAULT_AVATAR = "https://www.gravatar.com/avatar/?d=mp";

export default function Navbar() {
  const [session, setSession] = useState<Session | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

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
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-lg dark:shadow-slate-900/50 border-b border-gray-200 dark:border-slate-600/50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-gray-800 dark:text-slate-100 flex items-center space-x-2 hover:text-gray-900 dark:hover:text-white transition-colors">
          <Shield className="h-6 w-6 stroke-gray-800 dark:stroke-slate-100" />
          <span>API Key Vault</span>
        </Link>
        {session ? (
          <div className="flex items-center space-x-6">
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6 mr-6">
              <Link
                href="/keys"
                className="flex items-center space-x-1 text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
              >
                <Key className="h-4 w-4" />
                <span>Vault</span>
              </Link>
              <Link
                href="/store-key"
                className="flex items-center space-x-1 text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Store Keys</span>
              </Link>
            </div>

            {/* Theme Toggle - Desktop */}
            <button
              onClick={toggleTheme}
              className="hidden md:flex relative items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600/50 hover:border-gray-300 dark:hover:border-slate-500 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-800 dark:text-slate-100 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none"
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
                className="rounded-full focus:outline-none ring-2 ring-gray-300 dark:ring-slate-600 hover:ring-gray-400 dark:hover:ring-slate-500 transition-all"
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
                <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white dark:bg-slate-800 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-slate-600/50 animate-in zoom-in-95 duration-200">
                  <div className="flex flex-col items-center border-b border-gray-200 dark:border-slate-600/50 px-4 py-4 rounded-t-lg">
                    <Link href="/profile" onClick={() => setMenuOpen(false)}>
                      <div className="p-1 rounded-full bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 transition-all">
                        <Image
                          src={DEFAULT_AVATAR}
                          alt="User avatar large"
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                      </div>
                    </Link>
                    <p className="text-sm font-medium text-gray-800 dark:text-slate-100 truncate w-full text-center mt-2">
                      {session.user?.email}
                    </p>
                  </div>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700/70 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </div>
                  </Link>
                  <Link
                    href="/keys"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700/70 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <Key className="h-4 w-4" />
                      <span>Vault</span>
                    </div>
                  </Link>
                  <Link
                    href="/store-key"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700/70 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <PlusCircle className="h-4 w-4" />
                      <span>Store Keys</span>
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors rounded-b-lg"
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
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600/50 hover:border-gray-300 dark:hover:border-slate-500 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <Link
              href="/login"
              className="rounded-lg bg-gray-800 dark:bg-slate-100 hover:bg-gray-900 dark:hover:bg-white px-4 py-2 text-sm font-medium text-white dark:text-gray-900 transition-all shadow-lg"
            >
              Login
            </Link>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && session && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-slate-800 backdrop-blur-sm shadow-xl border-t border-gray-200 dark:border-slate-600/50 animate-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-6 space-y-4">
              <Link
                href="/"
                className="flex items-center space-x-3 text-gray-800 dark:text-slate-100 hover:text-gray-900 dark:hover:text-white font-medium transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>
              <Link
                href="/keys"
                className="flex items-center space-x-3 text-gray-800 dark:text-slate-100 hover:text-gray-900 dark:hover:text-white font-medium transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Key className="h-5 w-5" />
                <span>Vault</span>
              </Link>
              <Link
                href="/store-key"
                className="flex items-center space-x-3 text-gray-800 dark:text-slate-100 hover:text-gray-900 dark:hover:text-white font-medium transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <PlusCircle className="h-5 w-5" />
                <span>Store Keys</span>
              </Link>
              <Link
                href="/profile"
                className="flex items-center space-x-3 text-gray-800 dark:text-slate-100 hover:text-gray-900 dark:hover:text-white font-medium transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>

              {/* Theme Toggle - Mobile */}
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-800 dark:text-slate-100 font-medium">Theme</span>
                <button
                  onClick={toggleTheme}
                  className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600/50 hover:border-gray-300 dark:hover:border-slate-500 transition-all duration-200"
                  aria-label="Toggle theme"
                >
                  {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </button>
              </div>

              <hr className="border-gray-200 dark:border-slate-600/50" />
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition-colors py-2 w-full"
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

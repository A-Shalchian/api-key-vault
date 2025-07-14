"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Session } from "@supabase/supabase-js";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Key, User, PlusCircle, LogOut } from "lucide-react";

const DEFAULT_AVATAR = "https://www.gravatar.com/avatar/?d=mp";

export default function Navbar() {
  const [session, setSession] = useState<Session | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
    <header className="sticky top-0 z-10 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          API Key Vault
        </Link>
        {session ? (
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-6 mr-6">
              <Link 
                href="/keys" 
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Key className="hidden md:block h-4 w-4" />
                <span className="hidden md:inline">Vault</span>
              </Link>
              <Link 
                href="/store-key" 
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <PlusCircle className="hidden md:block h-4 w-4" />
                <span className="hidden md:inline">Store Keys</span>
              </Link>
            </div>
            <div className="relative">
              <button
                onClick={() => setMenuOpen((open) => !open)}
                className="rounded-full focus:outline-none"
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
                <div className={`absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-xl ring-1 ring-black/5 ${menuOpen ? 'animate-scale' : ''}`}>
                  <div className="flex flex-col items-center border-b px-4 py-4">
                    <Link href="/profile" onClick={() => setMenuOpen(false)}>
                      <Image
                        src={DEFAULT_AVATAR}
                        alt="User avatar large"
                        width={48}
                        height={48}
                        className="mb-2 rounded-full hover:opacity-80 transition-opacity"
                      />
                    </Link>
                    <p className="text-sm font-medium text-gray-800 truncate w-full text-center">
                      {session.user?.email}
                    </p>
                  </div>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </div>
                  </Link>
                  <Link
                    href="/keys"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <Key className="h-4 w-4" />
                      <span>Vault</span>
                    </div>
                  </Link>
                  <Link
                    href="/store-key"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <PlusCircle className="h-4 w-4" />
                      <span>Store Keys</span>
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
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
          <div className="flex items-center space-x-6">
            <Link
              href="/login"
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

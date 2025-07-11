"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Session } from "@supabase/supabase-js";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

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
          <div className="relative">
            <button
              onClick={() => setMenuOpen((open) => !open)}
              className="rounded-full focus:outline-none"
            >
              
              <Image
                src={DEFAULT_AVATAR}
                alt="User avatar"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
              />
            </button>
            {menuOpen && (
              <div className={`absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-xl ring-1 ring-black/5 ${menuOpen ? 'animate-scale' : ''}`}>
                <div className="flex flex-col items-center border-b px-4 py-4">
                  <Image
                    src={DEFAULT_AVATAR}
                    alt="User avatar large"
                    width={48}
                    height={48}
                    className="mb-2 rounded-full"
                  />
                  <p className="text-sm font-medium text-gray-800 truncate w-full text-center">
                    {session.user?.email}
                  </p>
                </div>
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-4">
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

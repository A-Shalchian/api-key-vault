"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Search, Key, Calendar, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import ApiKeyDisplay from "../components/ApiKeyDisplay";

interface KeyEntry {
  id: number;
  name: string;
  apiKey: string;
  createdAt: string;
}

export default function KeysPage() {
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [keys, setKeys] = useState<KeyEntry[]>([]);
  const [filteredKeys, setFilteredKeys] = useState<KeyEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        setLoading(false);
        setError("You must be logged in to view your keys.");
        return;
      }
      setToken(data.session.access_token);
      setUserEmail(data.session.user?.email ?? null);
    })();
  }, []);

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const res = await fetch("/api/keys", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to fetch keys");
        setKeys(json.keys as KeyEntry[]);
        setFilteredKeys(json.keys as KeyEntry[]);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  // Filter keys based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredKeys(keys);
    } else {
      const filtered = keys.filter(key => 
        key.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredKeys(filtered);
    }
  }, [searchQuery, keys]);



  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-gray-700 dark:text-slate-300" />
          <p className="text-gray-600 dark:text-slate-400 font-medium">Loading your keys...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        <div className="max-w-md p-8 rounded-xl border border-red-200 dark:border-red-400 bg-red-50 dark:bg-red-900/20 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 dark:text-red-400 mx-auto mb-4" />
          <p className="text-red-600 dark:text-red-300 font-medium text-lg mb-4">{error}</p>
          <Link href="/login" className="inline-block px-6 py-3 bg-gray-800 dark:bg-slate-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-900 dark:hover:bg-white transition-colors shadow-lg">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 py-10">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 dark:bg-slate-700 rounded-full flex items-center justify-center shadow-md">
              <Key className="h-6 w-6 text-gray-700 dark:text-slate-300" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 dark:from-slate-100 dark:via-blue-100 dark:to-slate-100 bg-clip-text text-transparent">Your API Keys</h1>
              {userEmail && <p className="text-sm text-gray-600 dark:text-slate-400">{userEmail}</p>}
            </div>
          </div>

          <div className="relative w-full md:w-auto md:min-w-[300px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400 dark:text-slate-500" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-slate-600/50 bg-white dark:bg-slate-700/50 text-gray-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-gray-400 dark:focus:ring-slate-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-slate-500"
              placeholder="Search keys by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

      {filteredKeys.length === 0 ? (
        <div className="bg-white/80 dark:bg-slate-800/95 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-slate-600/50 p-8 text-center shadow-lg dark:shadow-slate-900/50">
          {searchQuery ? (
            <>
              <p className="text-gray-600 dark:text-slate-300 mb-2">No keys matching <strong>&ldquo;{searchQuery}&rdquo;</strong></p>
              <button
                onClick={() => setSearchQuery("")}
                className="text-gray-800 dark:text-slate-100 hover:underline"
              >
                Clear search
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <Key className="h-12 w-12 text-gray-400 dark:text-slate-500 mb-4" />
              <p className="text-gray-600 dark:text-slate-300 mb-4">You haven&apos;t stored any API keys yet.</p>
              <Link
                href="/store-key"
                className="px-6 py-3 bg-gray-800 dark:bg-slate-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-900 dark:hover:bg-white transition-colors shadow-lg"
              >
                Store Your First Key
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredKeys.map((k) => (
            <div key={k.id} className="bg-white/80 dark:bg-slate-800/95 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-slate-600/50 p-6 shadow-lg dark:shadow-slate-900/50 hover:shadow-xl transition-all hover:border-gray-300 dark:hover:border-slate-500 group">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-slate-100 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{k.name}</h3>
                <div className="flex items-center text-sm text-gray-500 dark:text-slate-400">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{new Date(k.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <ApiKeyDisplay apiKey={k.apiKey} />
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 flex justify-center">
        <Link
          href="/store-key"
          className="px-6 py-3 bg-gray-800 dark:bg-slate-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-900 dark:hover:bg-white transition-colors flex items-center space-x-2 shadow-lg"
        >
          <Key className="h-5 w-5" />
          <span>Store New API Key</span>
        </Link>
      </div>
      </div>
    </div>
  );
}

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
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          <p className="text-gray-600 font-medium">Loading your keys...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="max-w-md p-8 rounded-xl border border-red-100 bg-red-50 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 font-medium text-lg mb-4">{error}</p>
          <Link href="/login" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Key className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Your API Keys</h1>
            {userEmail && <p className="text-sm text-gray-600">{userEmail}</p>}
          </div>
        </div>
        
        <div className="relative w-full md:w-auto md:min-w-[300px]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Search keys by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredKeys.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center shadow-md">
          {searchQuery ? (
            <>
              <p className="text-gray-600 mb-2">No keys matching <strong>&ldquo;{searchQuery}&rdquo;</strong></p>
              <button 
                onClick={() => setSearchQuery("")}
                className="text-blue-600 hover:underline"
              >
                Clear search
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <Key className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">You haven&apos;t stored any API keys yet.</p>
              <Link 
                href="/store-key"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Store Your First Key
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredKeys.map((k) => (
            <div key={k.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-md hover:shadow-lg transition-all hover:border-blue-200 group">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-700 transition-colors">{k.name}</h3>
                <div className="flex items-center text-sm text-gray-500">
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
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Key className="h-5 w-5" />
          <span>Store New API Key</span>
        </Link>
      </div>
    </div>
  );
}

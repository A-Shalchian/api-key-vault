"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface KeyEntry {
  id: number;
  name: string;
  apiKey: string;
  createdAt: string;
}

export default function ProfilePage() {
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [keys, setKeys] = useState<KeyEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        setLoading(false);
        setError("You must be logged in.");
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

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-gray-600">Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-8 flex flex-col items-center">
        <Image
          src="https://www.gravatar.com/avatar/?d=mp"
          alt="User avatar"
          width={64}
          height={64}
          className="mb-2 rounded-full"
        />
        {userEmail && <p className="text-sm text-gray-700">{userEmail}</p>}
      </div>
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Your API Keys</h1>
      {keys.length === 0 ? (
        <p className="text-gray-600">No keys stored yet.</p>
      ) : (
        <ul className="space-y-4">
          {keys.map((k) => (
            <li key={k.id} className="rounded-lg border p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-800">{k.name}</p>
                <span className="text-sm text-gray-500">
                  {new Date(k.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 break-all text-sm text-gray-700">{k.apiKey}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

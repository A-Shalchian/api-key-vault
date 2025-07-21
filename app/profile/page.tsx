"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";
import ProfileSection from "./ProfileSection";
import AnalyticsSection from "./AnalyticsSection";

interface KeyEntry {
  id: number;
  name: string;
  apiKey: string;
  createdAt: string;
}

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}



export default function ProfilePage() {
  const [token, setToken] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [keys, setKeys] = useState<KeyEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'analytics'>('profile');

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        setLoading(false);
        setError("You must be logged in.");
        return;
      }
      setToken(data.session.access_token);
      
      const userId = data.session.user?.id;
      if (userId) {
        try {
          const userRes = await fetch(`/api/users?id=${userId}`, {
            headers: { Authorization: `Bearer ${data.session.access_token}` },
          });
          const userData = await userRes.json();
          
          if (userRes.ok && userData.user) {
            setUserProfile(userData.user);
          }
        } catch (err) {
          console.error("Error fetching user profile:", err);
        }
      }
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
        
        const fetchedKeys = json.keys as KeyEntry[];
        setKeys(fetchedKeys);
        
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
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="ml-2 text-gray-600">Loading your profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.href = "/login"}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with tabs */}
      <div className="mb-8 flex flex-col items-center">
        <div className="relative mb-4">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-75 blur"></div>
          <Image
            src="https://www.gravatar.com/avatar/?d=mp"
            alt="User avatar"
            width={96}
            height={96}
            className="relative rounded-full border-4 border-white"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">
          {userProfile?.firstName} {userProfile?.lastName}
        </h1>
        <p className="text-gray-600">{userProfile?.email}</p>
        
        {/* Tabs */}
        <div className="mt-6 flex space-x-2 border-b w-full max-w-md justify-center">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 font-medium ${activeTab === 'profile' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-blue-500'}`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 font-medium ${activeTab === 'analytics' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-blue-500'}`}
          >
            Analytics
          </button>
        </div>
      </div>
      
      {activeTab === 'profile' ? (
        <ProfileSection 
          userProfile={userProfile}
          keys={keys}
          token={token}
        />
      ) : (
        <AnalyticsSection keys={keys} />
      )}
    </div>
  );
}

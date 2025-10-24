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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 flex items-center justify-center px-4">
        <div className="bg-white/80 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-lg dark:shadow-slate-900/50 border border-gray-200 dark:border-slate-600/50 p-8 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-gray-700 dark:text-slate-300 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-800 dark:text-slate-100">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 flex items-center justify-center px-4">
        <div className="bg-white/80 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-lg dark:shadow-slate-900/50 border border-gray-200 dark:border-slate-600/50 p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-red-600 dark:text-red-300 mb-6 text-lg font-medium">{error}</p>
          <button
            onClick={() => window.location.href = "/login"}
            className="w-full px-6 py-3 bg-gray-800 dark:bg-slate-100 text-white dark:text-gray-900 rounded-lg font-semibold hover:bg-gray-900 dark:hover:bg-white shadow-lg hover:shadow-xl transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
      <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
        {/* Header with tabs */}
        <div className="mb-6 sm:mb-8 flex flex-col items-center">
          <div className="relative mb-4 sm:mb-6">
            <div className="absolute -inset-1 rounded-full bg-gray-300/30 dark:bg-slate-600/30 blur"></div>
            <Image
              src="https://www.gravatar.com/avatar/?d=mp"
              alt="User avatar"
              width={120}
              height={120}
              className="relative rounded-full border-4 border-gray-200 dark:border-slate-700 shadow-lg w-20 h-20 sm:w-24 sm:h-24 lg:w-30 lg:h-30"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 dark:from-slate-100 dark:via-blue-100 dark:to-slate-100 bg-clip-text text-transparent text-center mb-2">
            {userProfile?.firstName} {userProfile?.lastName}
          </h1>
          <p className="text-gray-600 dark:text-slate-400 text-sm sm:text-base lg:text-lg text-center mb-6 sm:mb-8">{userProfile?.email}</p>

          {/* Tabs */}
          <div className="bg-gray-100 dark:bg-slate-700/70 backdrop-blur-sm rounded-2xl p-2 flex space-x-2 border border-gray-200 dark:border-slate-600/50">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 sm:px-6 py-2 sm:py-3 font-semibold rounded-xl transition-all duration-200 text-sm sm:text-base ${
                activeTab === 'profile'
                  ? 'bg-gray-800 dark:bg-slate-100 text-white dark:text-gray-900 shadow-lg'
                  : 'text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-slate-600'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 sm:px-6 py-2 sm:py-3 font-semibold rounded-xl transition-all duration-200 text-sm sm:text-base ${
                activeTab === 'analytics'
                  ? 'bg-gray-800 dark:bg-slate-100 text-white dark:text-gray-900 shadow-lg'
                  : 'text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-slate-600'
              }`}
            >
              Analytics
            </button>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto">
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
      </div>
    </div>
  );
}

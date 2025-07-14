"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts";
import { Edit, Save, X, Key, Clock, Calendar, User, Mail, ChevronDown, ChevronUp, Loader2 } from "lucide-react";

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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function ProfilePage() {
  const [token, setToken] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [keys, setKeys] = useState<KeyEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [saving, setSaving] = useState(false);
  const [showAllKeys, setShowAllKeys] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'analytics'>('profile');
  
  // For analytics
  const [keysByMonth, setKeysByMonth] = useState<{name: string, count: number}[]>([]);
  const [keyDistribution, setKeyDistribution] = useState<{name: string, value: number}[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        setLoading(false);
        setError("You must be logged in.");
        return;
      }
      setToken(data.session.access_token);
      
      // Get user ID from session
      const userId = data.session.user?.id;
      if (userId) {
        try {
          // Fetch user profile
          const userRes = await fetch(`/api/users?id=${userId}`, {
            headers: { Authorization: `Bearer ${data.session.access_token}` },
          });
          const userData = await userRes.json();
          
          if (userRes.ok && userData.user) {
            setUserProfile(userData.user);
            setFirstName(userData.user.firstName || "");
            setLastName(userData.user.lastName || "");
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
        
        // Process data for analytics
        processAnalyticsData(fetchedKeys);
        
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
  
  const processAnalyticsData = (keys: KeyEntry[]) => {
    // Create key distribution by first letter
    const distribution: Record<string, number> = {};
    keys.forEach(key => {
      const firstChar = key.name.charAt(0).toUpperCase();
      distribution[firstChar] = (distribution[firstChar] || 0) + 1;
    });
    
    const keyDistData = Object.entries(distribution)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
    
    setKeyDistribution(keyDistData);
    
    // Group keys by month
    const monthData: Record<string, number> = {};
    keys.forEach(key => {
      const date = new Date(key.createdAt);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      monthData[monthYear] = (monthData[monthYear] || 0) + 1;
    });
    
    const keyMonthData = Object.entries(monthData)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => {
        const dateA = new Date(a.name);
        const dateB = new Date(b.name);
        return dateA.getTime() - dateB.getTime();
      });
    
    setKeysByMonth(keyMonthData);
  };

  const handleSaveProfile = async () => {
    if (!token || !userProfile) return;
    
    setSaving(true);
    try {
      // This is a placeholder - you would need to implement the API endpoint
      // to update the user profile
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulating API call
      
      setUserProfile(prev => prev ? {
        ...prev,
        firstName,
        lastName
      } : null);
      
      setEditMode(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    } finally {
      setSaving(false);
    }
  };

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Information Card */}
          <div className="md:col-span-1 bg-white rounded-xl shadow-sm border p-6 h-fit">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Profile Information</h2>
              <button 
                onClick={() => setEditMode(!editMode)}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                {editMode ? <X className="h-5 w-5" /> : <Edit className="h-5 w-5" />}
              </button>
            </div>
            
            {editMode ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="w-full mt-4 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start">
                  <User className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{userProfile?.firstName} {userProfile?.lastName}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{userProfile?.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Joined</p>
                    <p className="font-medium">
                      {userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* API Keys Summary Card */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm border p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Your API Keys</h2>
              <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {keys.length} Total Keys
              </div>
            </div>
            
            {keys.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Key className="h-12 w-12 text-gray-300 mb-2" />
                <p className="text-gray-500 mb-4">No API keys stored yet</p>
                <a 
                  href="/store-key" 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Store Your First Key
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                <ul className="space-y-3">
                  {keys.slice(0, showAllKeys ? keys.length : 3).map((k) => (
                    <li key={k.id} className="rounded-lg border p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Key className="h-5 w-5 text-blue-500 mr-2" />
                          <p className="font-medium text-gray-800">{k.name}</p>
                        </div>
                        <span className="text-sm text-gray-500 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {new Date(k.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="mt-2 break-all text-sm text-gray-700 bg-gray-50 p-2 rounded">{k.apiKey}</p>
                    </li>
                  ))}
                </ul>
                
                {keys.length > 3 && (
                  <button 
                    onClick={() => setShowAllKeys(!showAllKeys)}
                    className="flex items-center justify-center w-full py-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {showAllKeys ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-1" /> Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-1" /> Show All ({keys.length} Keys)
                      </>
                    )}
                  </button>
                )}
                
                <div className="flex justify-center pt-2">
                  <a 
                    href="/keys" 
                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors mr-2"
                  >
                    View All Keys
                  </a>
                  <a 
                    href="/store-key" 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Store New Key
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Analytics Tab */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Key Distribution Chart */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Distribution</h2>
            {keyDistribution.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={keyDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={(props) => {
                        const { name, percent } = props;
                        return percent ? `${name}: ${(percent * 100).toFixed(0)}%` : '';
                      }}
                    >
                      {keyDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} keys`, 'Count']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <p className="text-gray-500">No data available</p>
              </div>
            )}
            <p className="text-sm text-gray-500 mt-4 text-center">
              Distribution of keys by first letter
            </p>
          </div>
          
          {/* Keys Added Over Time */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Keys Added Over Time</h2>
            {keysByMonth.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={keysByMonth}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#0088FE" name="Keys Added" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <p className="text-gray-500">No data available</p>
              </div>
            )}
            <p className="text-sm text-gray-500 mt-4 text-center">
              Number of keys added each month
            </p>
          </div>
          
          {/* Key Stats Summary */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Statistics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                <p className="text-sm text-blue-700">Total Keys</p>
                <p className="text-3xl font-bold text-blue-800">{keys.length}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                <p className="text-sm text-green-700">Most Recent</p>
                <p className="text-xl font-bold text-green-800 truncate">
                  {keys.length > 0 ? 
                    new Date(Math.max(...keys.map(k => new Date(k.createdAt).getTime())))
                      .toLocaleDateString() : 
                    'N/A'}
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                <p className="text-sm text-purple-700">Average Key Length</p>
                <p className="text-3xl font-bold text-purple-800">
                  {keys.length > 0 ? 
                    Math.round(keys.reduce((sum, key) => sum + key.apiKey.length, 0) / keys.length) : 
                    'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

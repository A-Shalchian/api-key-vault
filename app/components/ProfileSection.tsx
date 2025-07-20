"use client";

import { useState } from "react";
import { Edit, Save, X, Key, Clock, Calendar, User, Mail, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import ApiKeyDisplay from "./ApiKeyDisplay";

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

interface ProfileSectionProps {
  userProfile: UserProfile | null;
  keys: KeyEntry[];
  token: string | null;
}

export default function ProfileSection({ userProfile, keys, token }: ProfileSectionProps) {
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState(userProfile?.firstName || "");
  const [lastName, setLastName] = useState(userProfile?.lastName || "");
  const [saving, setSaving] = useState(false);
  const [showAllKeys, setShowAllKeys] = useState(false);

  const handleSaveProfile = async () => {
    if (!token || !userProfile) return;
    
    setSaving(true);
    try {
      // This is a placeholder - you would need to implement the API endpoint
      // to update the user profile
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulating API call
      
      setEditMode(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
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
                  <div className="mt-2">
                    <ApiKeyDisplay apiKey={k.apiKey} />
                  </div>
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
  );
}

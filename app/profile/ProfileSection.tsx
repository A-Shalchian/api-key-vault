"use client";

import { useState } from "react";
import { Edit, Save, X, Key, Clock, Calendar, User, Mail, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import ApiKeyDisplay from "../components/ApiKeyDisplay";

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
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setEditMode(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      {/* Profile Information Card */}
      <div className="lg:col-span-1 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8 h-fit">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">Profile Information</h2>
          <button 
            onClick={() => setEditMode(!editMode)}
            className="p-2 sm:p-3 text-gray-600 hover:text-indigo-600 transition-colors bg-gray-100 hover:bg-indigo-50 rounded-xl"
          >
            {editMode ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Edit className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
        </div>
        
        {editMode ? (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 sm:py-4 border-0 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-200 text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 sm:py-4 border-0 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-200 text-sm sm:text-base"
              />
            </div>
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="w-full mt-6 flex items-center justify-center px-6 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-500 hover:to-purple-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-start bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl">
              <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                <User className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm sm:text-base text-gray-600 font-medium">Full Name</p>
                <p className="font-bold text-gray-800 text-base sm:text-lg">{userProfile?.firstName} {userProfile?.lastName}</p>
              </div>
            </div>
            <div className="flex items-start bg-gradient-to-r from-sky-50 to-indigo-50 p-4 rounded-xl">
              <div className="bg-sky-100 p-2 rounded-lg mr-4">
                <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-sky-600" />
              </div>
              <div>
                <p className="text-sm sm:text-base text-gray-600 font-medium">Email</p>
                <p className="font-bold text-gray-800 text-base sm:text-lg break-all">{userProfile?.email}</p>
              </div>
            </div>
            <div className="flex items-start bg-gradient-to-r from-purple-50 to-sky-50 p-4 rounded-xl">
              <div className="bg-purple-100 p-2 rounded-lg mr-4">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm sm:text-base text-gray-600 font-medium">Joined</p>
                <p className="font-bold text-gray-800 text-base sm:text-lg">
                  {userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* API Keys Summary Card */}
      <div className="lg:col-span-2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-2 sm:space-y-0">
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">Your API Keys</h2>
          <div className="text-sm sm:text-base font-semibold text-indigo-600 bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-2 rounded-full border border-indigo-200">
            {keys.length} Total Keys
          </div>
        </div>
        
        {keys.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center">
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-full mb-6">
              <Key className="h-12 w-12 sm:h-16 sm:w-16 text-indigo-500" />
            </div>
            <p className="text-gray-600 mb-6 text-base sm:text-lg font-medium">No API keys stored yet</p>
            <a 
              href="/store-key" 
              className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-500 hover:to-purple-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-sm sm:text-base"
            >
              Store Your First Key
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            <ul className="space-y-4 sm:space-y-6">
              {keys.slice(0, showAllKeys ? keys.length : 3).map((k) => (
                <li key={k.id} className="bg-gradient-to-r from-gray-50 to-indigo-50 rounded-2xl border border-gray-200 p-4 sm:p-6 hover:shadow-lg hover:border-indigo-200 transition-all duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                    <div className="flex items-center">
                      <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                        <Key className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" />
                      </div>
                      <p className="font-bold text-gray-800 text-base sm:text-lg">{k.name}</p>
                    </div>
                    <span className="text-sm sm:text-base text-gray-600 flex items-center font-medium">
                      <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-gray-500" />
                      {new Date(k.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mt-4">
                    <ApiKeyDisplay apiKey={k.apiKey} />
                  </div>
                </li>
              ))}
            </ul>
            
            {keys.length > 3 && (
              <button 
                onClick={() => setShowAllKeys(!showAllKeys)}
                className="flex items-center justify-center w-full py-3 sm:py-4 text-sm sm:text-base font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all duration-200"
              >
                {showAllKeys ? (
                  <>
                    <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> Show All ({keys.length} Keys)
                  </>
                )}
              </button>
            )}
            
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4">
              <a 
                href="/keys" 
                className="flex-1 sm:flex-none px-6 py-3 sm:px-8 sm:py-4 border-2 border-indigo-600 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-200 text-center text-sm sm:text-base"
              >
                View All Keys
              </a>
              <a 
                href="/store-key" 
                className="flex-1 sm:flex-none px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-500 hover:to-purple-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-center text-sm sm:text-base"
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

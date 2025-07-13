"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { Key, Search, Save, AlertCircle, Lock } from "lucide-react";

export default function KeyVault() {
  const [name, setName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [retrievedKey, setRetrievedKey] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState<string | null>(null);
  
  // Get the session token when the component mounts
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setToken(data.session.access_token);
      }
    };
    
    getSession();
  }, []);

  const handleStore = async () => {
    setMessage("");
    setRetrievedKey("");
    
    if (!token) {
      toast.error(
        <div className="flex flex-col">
          <span>You must be logged in to store API keys</span>
          <Link href="/login" className="text-blue-500 hover:underline mt-1 text-sm">
            Click here to login
          </Link>
        </div>,
        { duration: 5000 }
      );
      setMessage("You must be logged in to store API keys");
      return;
    }
    
    try {
      const response = await fetch("/api/store", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name, apiKey }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("API key stored successfully!");
        setApiKey("");
        setName("");
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Store operation failed:", error);
      setMessage("An unexpected error occurred during store operation.");
    }
  };

  const handleRetrieve = async () => {
    setMessage("");
    setRetrievedKey("");
    
    if (!token) {
      toast.error(
        <div className="flex flex-col">
          <span>You must be logged in to retrieve API keys</span>
          <Link href="/login" className="text-blue-500 hover:underline mt-1 text-sm">
            Click here to login
          </Link>
        </div>,
        { duration: 5000 }
      );
      setMessage("You must be logged in to retrieve API keys");
      return;
    }
    
    try {
      const response = await fetch(`/api/retrieve?name=${name}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setRetrievedKey(data.apiKey);
        setMessage("API key retrieved successfully!");
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Retrieve operation failed:", error);
      setMessage("An unexpected error occurred during retrieve operation.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 border border-gray-100 rounded-xl shadow-xl bg-white">
      <Toaster position="top-center" toastOptions={{ className: 'text-sm font-medium' }} />
      
      <div className="flex items-center justify-center mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
          <Key className="h-6 w-6 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">
          API Key Vault
        </h1>
      </div>
      
      {!token && (
        <div className="mb-8 p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-700 flex items-start">
          <Lock className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <p className="mb-1 font-semibold">You are not logged in</p>
            <p>To securely store and retrieve your API keys, please <Link href="/login" className="text-blue-600 font-medium hover:underline">login</Link> or <Link href="/signup" className="text-blue-600 font-medium hover:underline">create an account</Link>.</p>
          </div>
        </div>
      )}
      
      <div className="space-y-5">
        <div className="relative">
          <label htmlFor="keyName" className="block text-sm font-medium text-gray-700 mb-1 ml-1">Key Name</label>
          <input
            id="keyName"
            type="text"
            placeholder="e.g., 'OpenAI Key'"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>
        
        <div className="relative">
          <label htmlFor="keyValue" className="block text-sm font-medium text-gray-700 mb-1 ml-1">API Key Value</label>
          <input
            id="keyValue"
            type="password" 
            placeholder="Enter your API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>
        
        <div className="flex space-x-4 pt-2">
          <button
            onClick={handleStore}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
          >
            <Save className="h-5 w-5" />
            <span>Store Key</span>
          </button>
          <button
            onClick={handleRetrieve}
            className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition-all flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
          >
            <Search className="h-5 w-5" />
            <span>Retrieve Key</span>
          </button>
        </div>
      </div>
      {message && (
        <div className="mt-6 flex items-center justify-center">
          <div className="flex items-center space-x-2 text-sm font-medium px-4 py-2 rounded-lg bg-gray-50 border border-gray-200">
            <AlertCircle className="h-4 w-4 text-gray-600" />
            <p className="text-gray-600">{message}</p>
          </div>
        </div>
      )}
      {retrievedKey && (
        <div className="mt-6 p-5 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-center mb-2">
            <Key className="h-4 w-4 text-gray-700 mr-2" />
            <h3 className="font-semibold text-gray-700">Retrieved Key:</h3>
          </div>
          <p className="text-sm text-gray-900 break-all bg-white p-3 rounded-md border border-gray-100">{retrievedKey}</p>
        </div>
      )}
    </div>
  );
}

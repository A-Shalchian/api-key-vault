"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { Key, Save, Lock, ArrowRight, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

export default function StoreKeyPage() {
  const [name, setName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [isStoring, setIsStoring] = useState(false);
  const router = useRouter();
  
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
    setIsStoring(true);
    
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
      setIsStoring(false);
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
        toast.success("API key stored successfully!");
        setMessage("API key stored successfully!");
        setApiKey("");
        setName("");
        
        // Show success toast with option to view keys
        toast((
          <div className="flex flex-col">
            <span className="font-medium">API key stored successfully!</span>
            <span className="text-sm mt-1">View all your keys?</span>
            <div className="mt-2 flex space-x-3">
              <button 
                onClick={() => {
                  toast.dismiss();
                  router.push('/keys');
                }}
                className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Yes, view keys
              </button>
              <button 
                onClick={() => toast.dismiss()}
                className="text-xs bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300"
              >
                Stay here
              </button>
            </div>
          </div>
        ), { duration: 8000 });
      } else {
        toast.error(`Error: ${data.error}`);
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Store operation failed:", error);
      toast.error("An unexpected error occurred");
      setMessage("An unexpected error occurred during store operation.");
    } finally {
      setIsStoring(false);
    }
  };

  const goToKeysPage = () => {
    router.push('/keys');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-gray-200 dark:bg-slate-700 rounded-full flex items-center justify-center mr-4 shadow-md">
            <Key className="h-6 w-6 text-gray-700 dark:text-slate-300" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 dark:from-slate-100 dark:via-blue-100 dark:to-slate-100 bg-clip-text text-transparent">Store New API Key</h1>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/95 backdrop-blur-sm rounded-xl shadow-lg dark:shadow-slate-900/50 border border-gray-200 dark:border-slate-600/50 p-8">
        <Toaster position="top-center" toastOptions={{ className: 'text-sm font-medium' }} />
        
        {!token && (
          <div className="mb-8 p-4 bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600/50 rounded-lg text-sm text-gray-700 dark:text-slate-300 flex items-start">
            <Lock className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0 text-gray-700 dark:text-slate-300" />
            <div>
              <p className="mb-1 font-semibold">You are not logged in</p>
              <p>To securely store your API keys, please <Link href="/login" className="text-gray-800 dark:text-slate-100 font-medium hover:underline">login</Link> or <Link href="/signup" className="text-gray-800 dark:text-slate-100 font-medium hover:underline">create an account</Link>.</p>
            </div>
          </div>
        )}

        <div className="mb-8">
          <div className="flex items-center mb-6">
            <Shield className="h-5 w-5 text-gray-700 dark:text-slate-300 mr-2" />
            <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100">Secure API Key Storage</h2>
          </div>

          <div className="bg-gray-50 dark:bg-slate-700/50 p-4 rounded-lg border border-gray-200 dark:border-slate-600/50 mb-8">
            <p className="text-gray-700 dark:text-slate-300 text-sm leading-relaxed">
              Store your API keys securely with our encrypted vault. Your keys are encrypted at rest and only accessible by you.
              To retrieve your stored keys, visit the <Link href="/keys" className="text-gray-800 dark:text-slate-100 hover:underline font-medium">Keys Page</Link>.
            </p>
          </div>
          
          <div className="space-y-5">
            <div className="relative">
              <label htmlFor="keyName" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 ml-1">Key Name</label>
              <input
                id="keyName"
                type="text"
                placeholder="e.g., 'OpenAI Key'"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-200 dark:border-slate-600/50 bg-white dark:bg-slate-700/50 text-gray-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-gray-400 dark:focus:ring-slate-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-slate-500"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-slate-400 ml-1">Give your key a descriptive name to easily identify it later</p>
            </div>

            <div className="relative">
              <label htmlFor="keyValue" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 ml-1">API Key Value</label>
              <input
                id="keyValue"
                type="password"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full p-3 border border-gray-200 dark:border-slate-600/50 bg-white dark:bg-slate-700/50 text-gray-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-gray-400 dark:focus:ring-slate-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-slate-500"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-slate-400 ml-1">Your API key will be encrypted before storage</p>
            </div>

            <button
              onClick={handleStore}
              className="w-full bg-gray-800 dark:bg-slate-100 text-white dark:text-gray-900 py-4 px-4 rounded-lg hover:bg-gray-900 dark:hover:bg-white transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={!name || !apiKey || isStoring}
            >
              {isStoring ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Storing...</span>
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  <span>Store Key</span>
                </>
              )}
            </button>
          </div>
        </div>
        
        {message && (
          <div className="mt-6 flex items-center justify-center">
            <div className="flex items-center space-x-2 text-sm font-medium px-4 py-2 rounded-lg bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600/50">
              <div className={message.includes("successfully") ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-slate-300"}>
                {message}
              </div>
            </div>
          </div>
        )}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={goToKeysPage}
            className="px-6 py-3 bg-gray-100 dark:bg-slate-700/70 text-gray-800 dark:text-slate-100 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors flex items-center space-x-2 border border-gray-200 dark:border-slate-600/50 shadow-md"
          >
            <span>View All Your Keys</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

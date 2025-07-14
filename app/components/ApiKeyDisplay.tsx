"use client";

import { useState } from "react";
import { Key, Copy, Eye, EyeOff } from "lucide-react";

interface ApiKeyDisplayProps {
  apiKey: string;
}

export default function ApiKeyDisplay({ apiKey }: ApiKeyDisplayProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Toggle key visibility
  const toggleKeyVisibility = () => {
    setIsVisible(prev => !prev);
  };

  // Copy key to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });
  };

  // Mask API key
  const maskApiKey = (key: string) => {
    if (key.length <= 8) return "•".repeat(key.length);
    return key.substring(0, 4) + "•".repeat(key.length - 8) + key.substring(key.length - 4);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-all">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Key className="h-4 w-4 text-gray-500 group-hover:text-blue-600 transition-colors mr-2" />
          <span className="text-xs text-gray-500 font-medium">API Key</span>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={toggleKeyVisibility} 
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            title={isVisible ? "Hide API Key" : "Show API Key"}
          >
            {isVisible ? 
              <EyeOff className="h-4 w-4 text-gray-500" /> : 
              <Eye className="h-4 w-4 text-gray-500" />
            }
          </button>
          <button 
            onClick={copyToClipboard} 
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            title="Copy to clipboard"
          >
            <Copy className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>
      <div className="relative">
        <p className="break-all text-sm text-gray-700 font-mono">
          {isVisible ? apiKey : maskApiKey(apiKey)}
        </p>
        {isCopied && (
          <div className="absolute -top-1 right-0 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
            Copied!
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

export default function KeyVault() {
  const [name, setName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [retrievedKey, setRetrievedKey] = useState("");
  const [message, setMessage] = useState("");

  const handleStore = async () => {
    setMessage("");
    setRetrievedKey("");
    try {
      const response = await fetch("/api/store", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    try {
      const response = await fetch(`/api/retrieve?name=${name}`);
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
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        API Key Vault
      </h1>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Key Name (e.g., 'OpenAI Key')"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
        <input
          type="password" // password type to hide the key
          placeholder="API Key Value"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
        <div className="flex space-x-4">
          <button
            onClick={handleStore}
            className="flex-1 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Store Key
          </button>
          <button
            onClick={handleRetrieve}
            className="flex-1 bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Retrieve Key
          </button>
        </div>
      </div>
      {message && (
        <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
      )}
      {retrievedKey && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 className="font-semibold text-gray-700">Retrieved Key:</h3>
          <p className="text-sm text-gray-900 break-all">{retrievedKey}</p>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleQuerySubmit = async () => {
    if (!query.trim()) {
      setError("Please enter a valid query.");
      return;
    }

    setLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/health-query/analyze-query/`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      
      const data = await res.json();
      if (res.ok) {
        setResponse(data.response);
      } else {
        setError("Failed to get a response. Please try again.");
      }
    } catch (err) {
      setError("Error connecting to the API. Make sure the backend is running.");
    }
    
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">AI Powered Medical Assistant for Diagnosis and Patient Consultation</h1>
      
      <input
        type="text"
        className="border p-2 rounded w-80"
        placeholder="Enter your health-related query..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      <button
        className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        onClick={handleQuerySubmit}
        disabled={loading}
      >
        {loading ? "Processing..." : "Ask AI"}
      </button>
      
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {response && <p className="bg-white p-4 mt-4 rounded shadow w-3/4">{response}</p>}
    </div>
  );
}

"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";


export default function PatientForm() {
  const [formData, setFormData] = useState({
    query: "",
    symptoms: "",
    occupation: "",
    bp: "",
    sugar: "",
    height: "",
    weight: "",
    bmi: "",
    familyHistory: "",
    age: "",
    gender: "",
    maritalStatus: "",
    area: "",
    travelHistory: "",
    medication: "",
    surgeryHistory: "",
    diseaseHistory: "",
    allergies: "",
  });

  const [labTests, setLabTests] = useState<File | null>(null);
  const [xRay, setXRay] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ query?: string }>({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [apiError, setApiError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (e.target.files && e.target.files.length > 0) {
      if (type === "labTests") setLabTests(e.target.files[0]);
      if (type === "xRay") setXRay(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.query.trim()) {
      setErrors({ query: "Query is required" });
      return;
    }

    setLoading(true);
    setApiError("");
    setResponse("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/health-query/analyze-query/`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (res.ok) {
        setResponse(data.response);
      } else {
        setApiError("Failed to get a response. Please try again.");
      }
    } catch (err) {
      setApiError("Error connecting to the API. Make sure the backend is running.");
    }
    
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">AI Powered Medical Assistant for Diagnosis and Patient Consultation</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Medical Information</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Query Field */}
          <div className="col-span-2 flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Query <span className="text-red-500">*</span>
            </label>
            <textarea
              name="query"
              value={formData.query}
              onChange={handleChange}
              className={`border border-gray-300 rounded-lg px-3 py-2 w-full h-24 ${errors.query ? "border-red-500" : ""}`}
            />
            {errors.query && <p className="text-red-500 text-sm">{errors.query}</p>}
          </div>

          {/* Other Fields */}
          {Object.keys(formData).map((key) =>
            key !== "query" ? (
              <div key={key} className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
                {key === "gender" || key === "maritalStatus" ? (
                  <select name={key} value={formData[key as keyof typeof formData]} onChange={handleChange} className="border border-gray-300 rounded-lg px-3 py-2">
                    {key === "gender" ? (
                      <>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </>
                    ) : (
                      <>
                        <option value="">Select</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorced">Divorced</option>
                      </>
                    )}
                  </select>
                ) : (
                  <input
                    type="text"
                    name={key}
                    value={formData[key as keyof typeof formData]}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-3 py-2"
                  />
                )}
              </div>
            ) : null
          )}

          {/* File Uploads */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Lab Tests (PDF/Img)</label>
            <input type="file" accept="image/*,.pdf" onChange={(e) => handleFileChange(e, "labTests")} className="border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Radiology X-Ray (PDF/Img)</label>
            <input type="file" accept="image/*,.pdf" onChange={(e) => handleFileChange(e, "xRay")} className="border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          {/* Submit Button */}
          <div className="col-span-2 flex justify-center mt-4">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition" disabled={loading}>
              {loading ? "Processing..." : "Submit"}
            </button>
          </div>
        </form>

        {/* API Response Display */}
        {apiError && <p className="text-red-500 text-center mt-4">{apiError}</p>}
        {response && (
          <div className="bg-white p-4 mt-4 rounded shadow w-3/4">
            <ReactMarkdown>{response}</ReactMarkdown>
          </div>
        )}
        </div>
    </div>
  );
}

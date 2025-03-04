"use client";

import { useRef, useState, } from "react";
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

  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ query?: string }>({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [apiError, setApiError] = useState("");
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log('type', type)
      if (type === "image") setImage(e.target.files[0]);
    }
  };

  const handleVoiceInput = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition. Please use another browser.");
      return;
    }
  
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
  
    recognition.onstart = () => setRecording(true);
    recognition.onend = () => setRecording(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setFormData((prev) => ({ ...prev, query: prev.query + " " + transcript }));
    };
  
    recognition.start();
    recognitionRef.current = recognition;
  };
  

  const uploadImage = async () => {
    if (!image) return null; 

    setLoading(true);
    try {
      const uploadData = new FormData();
      uploadData.append("file", image);
      uploadData.append("upload_preset", `${process.env.NEXT_PUBLIC_API_CLOUDINARY_UPLOAD_PRESENT}`);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_API_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: uploadData }
      );

      const data = await res.json();
      setFormData((prev) => ({ ...prev, imageUrl: data.secure_url }));
      return data.secure_url;
    } catch (error) {
      console.error("Upload failed:", error);
      return null;
    } finally {
      setLoading(false);
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
      let uploadedImageUrl = "";

      if (image)
      {
        uploadedImageUrl = await uploadImage();
      }
      const finalFormData = { ...formData, imageUrl: uploadedImageUrl };

      const formDataToSend = new FormData();
      Object.keys(finalFormData).forEach((key) => {
        formDataToSend.append(key, finalFormData[key as keyof typeof finalFormData]);
      });

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/health-query/analyze-query/`, {
        method: "POST",
        body: formDataToSend,
      });
  
      const data = await res.json();
      
      if (res.ok) {
        setResponse(data.response);

        // Call TTS API with the response text
        const ttsRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/tts/text-to-speech/`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: data.response }),
        });

        const ttsData = await ttsRes.json();
        if (ttsRes.ok && ttsData.audio_url) {
          setAudioUrl(ttsData.audio_url);
        } else {
          console.error("TTS API error:", ttsData);
        }
      } else {
        setApiError("Failed to get a response. Please try again.");
      }
    } catch {
      setApiError("Error connecting to the API. Make sure the backend is running.");
    }
  
    setLoading(false);
  };
  
  

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">AI Powered Medical Assistant for Diagnosis and Patient Consultation</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-2 flex flex-col">
            <label className="text-sm font-medium text-gray-700">Query <span className="text-red-500">*</span></label>
            <textarea
              name="query"
              value={formData.query}
              onChange={handleChange}
              className={`border border-gray-300 rounded-lg px-3 py-2 w-full h-24 ${errors.query ? "border-red-500" : ""}`}
            />
            {errors.query && <p className="text-red-500 text-sm">{errors.query}</p>}
            <button type="button" onClick={handleVoiceInput} className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-2">
              {recording ? "Recording..." : "Record Voice"}
            </button>
          </div>

          {/* Other Fields */}
          {Object.keys(formData).map((key) =>
            key !== "query" ? (
              <div key={key} className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
                <input
                  type="text"
                  name={key}
                  value={formData[key as keyof typeof formData]}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            ) : null
          )}

          {/* Image Upload */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Image</label>
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "image")} className="border border-gray-300 rounded-lg px-3 py-2" />
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
        {audioUrl && (
          <div className="mt-4">
            <h2 className="text-lg font-medium text-gray-700">Audio Response</h2>
            <audio controls>
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
        </div>
    </div>
  );
}

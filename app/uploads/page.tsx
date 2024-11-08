'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from 'lucide-react';
import FileUpload from "@/components/FileUpload";
import TemplateSelector from "@/components/TemplateSelector";
import PortfolioTemplate from "@/components/PortfolioTemplate";

export default function Upload() {
  const [resumeData, setResumeData] = useState<any>(null);
  const [username, setUsername] = useState('');
  const [showUsernamePrompt, setShowUsernamePrompt] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const router = useRouter();
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //==================HANDLE PROCESS COMPLETION=================
  const handleProcessCompletion = async (file: File) => {
    setAiLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
  
      const response = await fetch("/api/extract", { 
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('API request failed');
      }
  
      const parsedData = await response.json();
      setResumeData(parsedData);
      console.log('API Response:', parsedData);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to process the resume. Please try again.');
    } finally {
      setAiLoading(false);
    }
  };

  //==================HANDLE TEMPLATE SELECTION=================
  const handleTemplateSelection = (template: string) => {
    setSelectedTemplate(template);
    setShowUsernamePrompt(true);
  };

  //==================HANDLE PUBLISH=================
  const handlePublish = () => {
    if (username.trim() && resumeData && selectedTemplate) {
      const dataToStore = {
        resumeData,
        template: selectedTemplate,
      };
      localStorage.setItem(`resumeData_${username}`, JSON.stringify(dataToStore));
      router.push(`/portfolio/${username}`);
    } else {
      setError('Please enter a valid username and ensure all fields are completed.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 via-indigo-600 to-pink-600 p-8 transition-all duration-500">
      <h1 className="text-5xl font-extrabold text-white mb-8 text-center">Upload Your Resume</h1>

      <FileUpload onProcessComplete={handleProcessCompletion} />

      {aiLoading && (
        <div className="text-white mb-4 flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin text-white" />
          <span>Processing with AI...</span>
        </div>
      )}

      {resumeData && (
        <div className="bg-white shadow-xl rounded-lg p-6 mt-8 w-full max-w-2xl transition-all duration-500">
          <h2 className="text-4xl font-semibold mb-6 text-center text-gray-800">Portfolio Preview</h2>

          <TemplateSelector onSelectTemplate={handleTemplateSelection} />

          {selectedTemplate && (
            <>
              <PortfolioTemplate
                name={resumeData.name}
                contact={resumeData.contact}
                skills={resumeData.skills}
                experience={resumeData.experience}
                qualifications={resumeData.education}
                extractedText={resumeData.extractedText}
                selectedTemplate={selectedTemplate}
              />

              <div className="mt-6">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username to publish"
                  className="w-full max-w-xs px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handlePublish}
                  className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                >
                  Publish Portfolio
                </button>
              </div>
            </>
          )}
          {error && (
            <div className="text-red-500 mt-4">
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

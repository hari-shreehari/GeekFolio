'use client'
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createWorker } from "tesseract.js";
import { Send, RefreshCw } from 'lucide-react';
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

  // AI Assistant State Variables
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [activeTab, setActiveTab] = useState('preview');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to handle the completion of file processing
  const handleProcessCompletion = async (file: File) => {
    const worker = await createWorker();
    await worker.load();
    await worker.load('eng');
    await worker.reinitialize('eng');
    const { data: { text } } = await worker.recognize(file);
    await worker.terminate();

    const cleanedText = text.replace(/\f/g, '').replace(/(\r\n|\n|\r){3,}/g, '\n\n').trim();
    const parsedData = parseResumeText(cleanedText);
    setResumeData(parsedData);
    setAiLoading(false);
  };

  // Dynamic parsing function for resume text
  const parseResumeText = (text: string) => {
    const data: {
      name: string | null;
      education: string[];
      skills: string[];
      experience: string[];
      achievements: string[];
      contact: string | null;
    } = {
      name: null,
      education: [],
      skills: [],
      experience: [],
      achievements: [],
      contact: null,
    };

    const patterns = {
      name: /Name:\s*([\w\s]+)/i,
      education: /Education[:\n\s]*([\s\S]+?)(?=\n\s*(Skills|Experience|Achievements|Contact|$))/i,
      skills: /Skills[:\n\s]*([\s\S]+?)(?=\n\s*(Experience|Achievements|Contact|$))/i,
      experience: /Experience[:\n\s]*([\s\S]+?)(?=\n\s*(Achievements|Contact|$))/i,
      achievements: /Achievements[:\n\s]*([\s\S]+?)(?=\n\s*(Contact|$))/i,
      contact: /Contact[:\n\s]*([\s\S]+)/i,
    };

    data.name = text.match(patterns.name)?.[1]?.trim() || "No name found";

    if (patterns.education.test(text)) {
      const educationText = text.match(patterns.education)?.[1];
      data.education = educationText?.split(/\n/).map((item) => item.trim()) || [];
    }

    if (patterns.skills.test(text)) {
      const skillsText = text.match(patterns.skills)?.[1];
      data.skills = skillsText?.split(/,|\n/).map((skill) => skill.trim()) || [];
    }

    if (patterns.experience.test(text)) {
      const experienceText = text.match(patterns.experience)?.[1];
      data.experience = experienceText?.split(/\n/).map((exp) => exp.trim()) || [];
    }

    if (patterns.achievements.test(text)) {
      const achievementsText = text.match(patterns.achievements)?.[1];
      data.achievements = achievementsText?.split(/\n/).map((achievement) => achievement.trim()) || [];
    }

    if (patterns.contact.test(text)) {
      data.contact = text.match(patterns.contact)?.[1]?.trim() || null;
    }

    return data;
  };

  // Function to handle the selection of a template
  const handleTemplateSelection = (template: string) => {
    setSelectedTemplate(template);
    setShowUsernamePrompt(true);
  };

  // Function to handle the publishing of the portfolio
  const handlePublish = () => {
    if (username.trim() && resumeData && selectedTemplate) {
      const dataToStore = {
        resumeData,
        template: selectedTemplate,
      };
      localStorage.setItem(`resumeData_${username}`, JSON.stringify(dataToStore));
      router.push(`/check/${username}`); // Ensure username is correctly passed in the URL
    } else {
      setError('Please enter a valid username and ensure all fields are completed.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 via-indigo-600 to-pink-600 p-8 transition-all duration-500">
      <h1 className="text-5xl font-extrabold text-white mb-8 text-center">Upload Your Resume</h1>

      {/* File upload section */}
      <FileUpload onProcessComplete={handleProcessCompletion} />

      {/* Show loading indicator if AI is processing */}
      {aiLoading && (
        <div className="text-white mb-4 flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin text-white" />
          <span>Processing with AI...</span>
        </div>
      )}

      {/* Display the extracted resume data if available */}
      {resumeData && (
        <div className="bg-white shadow-xl rounded-lg p-6 mt-8 w-full max-w-2xl transition-all duration-500">
          <h2 className="text-4xl font-semibold mb-6 text-center text-gray-800">Portfolio Preview</h2>

          {/* Template selection */}
          <TemplateSelector onSelectTemplate={handleTemplateSelection} />

          {/* Displaying the selected template with extracted resume data */}
          {selectedTemplate && (
            <>
              <PortfolioTemplate
                name={resumeData.name}
                contact={resumeData.contact}
                skills={resumeData.skills}
                experience={resumeData.experience}
                qualifications={resumeData.education}
                extractedText={resumeData.extractedText} // Adding the extracted text to the template
                selectedTemplate={selectedTemplate} // Pass selected template for rendering
              />

              {/* Username prompt */}
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

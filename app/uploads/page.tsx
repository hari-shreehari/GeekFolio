// Upload.tsx
'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, Upload as UploadIcon, Palette, Globe, Eye, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ColorfulTemplateSelection from "@/components/Templates";
import { BusinessPortfolioComponent as Template1 } from "@/components/Site/BusinessPortfolio";
import { ComprehensiveDataAnalystPortfolio as Template2 } from "@/components/Site/SimpleDataAnalystPortfolio";
import { TechInnovatorPortfolioComponent as Template3 } from "@/components/Site/TechInnovatorPortfolio";
import { ResumeData } from "@/utils/types";

const steps = [
  { number: 1, title: "Upload Resume", icon: UploadIcon },
  { number: 2, title: "Choose Template", icon: Palette },
  { number: 3, title: "Preview", icon: Eye },
  { number: 4, title: "Publish", icon: Globe },
];

export default function Upload() {
  const [currentStep, setCurrentStep] = useState(1);
  const [username, setUsername] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
const [resumeData, setResumeData] = useState<ResumeData>({
    personal_information: {
        name: "",
        contact_information: {
            phone_number: "",
            email: "",
            address: ""
        },
        linkedin_profile: "",
        github_profile: "",
        objective_summary: {
            career_objective: "",
            professional_summary: ""
        }
    },
    education: [],
    experience: [],
    projects: [],
    certifications: [],
    skills: {
        technical_skills: [],
        soft_skills: []
    },
    achievements: {
        awards_honors: [],
        scholarships: [],
        competitions: []
    },
    extracurricular_activities: {
        clubs_organizations: [],
        volunteer_work: [],
        leadership_roles: []
    },
    languages: []
});
  const router = useRouter();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    await handleProcessCompletion(selectedFile);
  };

  const handleProcessCompletion = async (file: File) => {
    setAiLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch("/api/extract", {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to process resume');
      }
      const parsedData = await response.json();
      const formattedData: ResumeData = JSON.parse(parsedData.structured_json);
      setResumeData(formattedData);
      setCurrentStep(2);
    } catch (err) {
      setError('Failed to process the resume. Please try again.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleTemplateSelection = (templateName: string) => {
    setSelectedTemplate(templateName);
    setCurrentStep(3);
  };

  const renderTemplate = () => {
    if (!resumeData || !selectedTemplate) return null;

    switch (selectedTemplate) {
      case 'BusinessPortfolioComponent':
        return <Template1 data={resumeData} />;
      case 'ComprehensiveDataAnalystPortfolio':
        return <Template2 data={resumeData} />;
      case 'TechInnovatorPortfolioComponent':
        return <Template3 data={resumeData} />;
      default:
        return <div>No template selected</div>;
    }
  };

  const handlePreview = () => setIsPreviewMode(true);

  const handlePublish = async () => {
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }
    if (!resumeData || !selectedTemplate) {
      setError('Missing required data. Please complete all steps.');
      return;
    }
    try {
      const portfolioContent = renderTemplate();
      const dataToStore = { resumeData, template: selectedTemplate, portfolioContent };
      localStorage.setItem(`portfolio_${username}`, JSON.stringify(dataToStore));
      router.push(`/portfolio/${username}`);
    } catch (err) {
      setError('Failed to publish portfolio. Please try again.');
    }
  };

  const renderStepContent = () => {
    if (isPreviewMode) {
      return (
        <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Portfolio Preview</h2>
            <Button onClick={() => setIsPreviewMode(false)} variant="outline" className="hover:bg-purple-50">
              <ArrowLeft className="w-4 h-4 mr-2" />Back to Edit
            </Button>
          </div>
          {renderTemplate()}
        </div>
      );
    }
    switch (currentStep) {
      case 1:
        return (
          <Card className="w-full max-w-xl bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl"><UploadIcon className="mr-2 text-purple-600" />Upload Your Resume</CardTitle>
              <CardDescription>Upload your resume in PDF, DOC, or DOCX format</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-purple-200 rounded-lg p-8 text-center">
                <input type="file" id="resume-upload" className="sr-only" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                <label htmlFor="resume-upload" className="flex flex-col items-center cursor-pointer">
                  <UploadIcon className="w-12 h-12 text-purple-500 mb-4" />
                  <span className="text-lg font-medium text-purple-700">{file ? file.name : "Drop your resume here or click to browse"}</span>
                  <span className="text-sm text-gray-500 mt-2">Supported formats: PDF, DOC, DOCX</span>
                </label>
              </div>
              {aiLoading && <div className="mt-6 p-4 bg-purple-50 rounded-lg"><RefreshCw className="h-6 w-6 animate-spin text-purple-600" /><span className="ml-2 font-medium text-purple-700">Processing your resume...</span></div>}
            </CardContent>
          </Card>
        );
      case 2:
        return <ColorfulTemplateSelection onSelectTemplate={handleTemplateSelection} />;
      case 3:
        return (
          <Card className="w-full max-w-xl bg-white shadow-lg">
            <CardHeader><CardTitle className="flex items-center text-2xl"><Eye className="mr-2 text-purple-600" />Preview Your Portfolio</CardTitle></CardHeader>
            <CardContent><Button onClick={handlePreview} className="w-full bg-purple-600 hover:bg-purple-700 text-white"><Eye className="w-4 h-4 mr-2" />Preview Portfolio</Button></CardContent>
          </Card>
        );
      case 4:
        return (
          <Card className="w-full max-w-xl bg-white shadow-lg">
            <CardHeader><CardTitle className="flex items-center text-2xl"><Globe className="mr-2 text-purple-600" />Publish Your Portfolio</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Choose your username" className="w-full px-4 py-2 border rounded-lg" />
              <Button onClick={handlePublish} className="w-full bg-green-600 hover:bg-green-700 text-white"><Check className="w-4 h-4 mr-2" />Publish Portfolio</Button>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-purple-500 to-pink-600 p-8">
      <h1 className="text-5xl font-extrabold text-white mb-8">Create Your Portfolio</h1>
      {renderStepContent()}
      {error && <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center"><span className="mr-2">⚠️</span>{error}</div>}
      {!isPreviewMode && currentStep > 1 && <Button onClick={() => setCurrentStep((current) => current - 1)} variant="outline" className="bg-white text-purple-600 border-purple-300"><ArrowLeft className="w-4 h-4 mr-2" />Back</Button>}
    </div>
  );
}

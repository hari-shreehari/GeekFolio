"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  RefreshCw,
  Upload as UploadIcon,
  Palette,
  Globe,
  Eye,
  ArrowLeft,
  ArrowRight,
  Check,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ColorfulTemplateSelection from "@/components/Templates";
import { BusinessPortfolioComponent as Business } from "@/components/Site/Business";
import { ComprehensiveDataAnalystPortfolio as Creative } from "@/components/Site/Creative";
import { TechInnovatorPortfolioComponent as Tech } from "@/components/Site/Tech";
import { PortfolioComponent as Minimal } from "@/components/Site/Minimal";

const steps = [
  { number: 1, title: "Upload Resume", icon: UploadIcon },
  { number: 2, title: "Choose Template", icon: Palette },
  { number: 3, title: "Preview", icon: Eye },
  { number: 4, title: "Publish", icon: Globe },
];

export default function Upload() {
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeData, setResumeData] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const router = useRouter();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    await handleProcessCompletion(selectedFile);
  };

  const handleProcessCompletion = async (file: File) => {
    setAiLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/extract", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process resume");
      }

      const formattedData = await response.json();

      setResumeData(formattedData);
      setCurrentStep(2);
    } catch (err) {
      setError("Failed to process the resume. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleTemplateSelection = (templateName: string) => {
    setSelectedTemplate(templateName);
    console.log("handleTemplateSelection", resumeData);
    setCurrentStep(3);
  };

  const renderTemplate = () => {
    if (!resumeData || !selectedTemplate) return null;

    switch (selectedTemplate) {
      case "Minimalist Pro":
        return <Minimal data={resumeData} />;
      case "Creative Portfolio":
        return <Creative data={resumeData} />;
      case "Tech Innovator":
        return <Tech data={resumeData} />;
      case "Business Professional":
        return <Business data={resumeData} />;
      default:
        return <div>No template selected</div>;
    }
  };

  const handlePreview = () => {
    setIsPreviewMode(true);
  };

  const handlePublish = async () => {
    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }

    if (!resumeData || !selectedTemplate) {
      setError("Missing required data. Please complete all steps.");
      return;
    }

    try {
      const portfolioContent = renderTemplate();

      const response = await fetch("/api/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          resumeData,
          template: selectedTemplate,
          portfolioContent,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to publish portfolio");
      }

      const data = await response.json();
      console.log("Portfolio published successfully:", data);
      router.push(`/portfolio/${username}`);
    } catch (error) {
      console.error("Publish error:", error);
      setError("Failed to publish portfolio. Please try again.");
    }
  };

  const renderStepContent = () => {
    if (isPreviewMode) {
      return (
        <div className="w-full max-w-[95vw]">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Portfolio Preview</h2>
              <Button
                onClick={() => setIsPreviewMode(false)}
                variant="outline"
                className="hover:bg-purple-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2 z-100" />
                Back to Edit
              </Button>
            </div>
            {renderTemplate()}
          </div>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <Card className="w-full max-w-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <UploadIcon className="mr-2 text-purple-600" />
                Upload Your Resume
              </CardTitle>
              <CardDescription>
                Upload your resume in PDF, DOCX or IMAGE format
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-purple-200 rounded-lg p-8 text-center">
                <input
                  type="file"
                  id="resume-upload"
                  className="sr-only"
                  onChange={handleFileChange}
                  accept=".pdf,.docx,.png,.jpg,.jpeg"
                />
                <label
                  htmlFor="resume-upload"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <UploadIcon className="w-12 h-12 text-purple-500 mb-4" />
                  <span className="text-lg font-medium text-purple-700">
                    {file
                      ? file.name
                      : "Drop your resume here or click to browse"}
                  </span>
                  <span className="text-sm text-gray-500 mt-2">
                    Supported formats: PDF, IMAGE, DOCX
                  </span>
                </label>
              </div>
              {aiLoading && (
                <div className="flex items-center justify-center mt-6 p-4 bg-purple-50 rounded-lg">
                  <RefreshCw className="h-6 w-6 animate-spin text-purple-600" />
                  <span className="ml-2 font-medium text-purple-700">
                    Processing your resume...
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="w-full max-w-4xl bg-white shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Palette className="mr-2 text-purple-600" />
                Choose Your Template
              </CardTitle>
              <CardDescription>
                Select a template that best represents your professional
                identity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border border-gray-300 rounded-lg p-4 h-[500px] overflow-y-auto shadow-inner">
                <ColorfulTemplateSelection
                  onSelectTemplate={handleTemplateSelection}
                />
              </div>
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card className="w-full max-w-xl bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Eye className="mr-2 text-purple-600" />
                Preview Your Portfolio
              </CardTitle>
              <CardDescription>
                Take a look at how your portfolio will appear
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={handlePreview}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview Portfolio
              </Button>
              <Button
                onClick={() => setCurrentStep(4)}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Continue to Publish
              </Button>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card className="w-full max-w-xl bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Globe className="mr-2 text-purple-600" />
                Publish Your Portfolio
              </CardTitle>
              <CardDescription>
                Choose your unique username and publish your portfolio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose your username"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <Button
                onClick={handlePublish}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                <Check className="w-4 h-4 mr-2" />
                Publish Portfolio
              </Button>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-r from-purple-500 via-indigo-600 to-pink-600 p-8 transition-all">
      <h1 className="text-5xl font-extrabold text-white mb-8 text-center">
        Create Your Portfolio
      </h1>

      {!isPreviewMode && (
        <div className="flex justify-center mb-12 w-[95vh] max-w-4xl">
          <div className="flex items-center w-full justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentStep >= step.number
                        ? "bg-white text-purple-600"
                        : "bg-gray-300 text-gray-500"
                    }`}
                  >
                    <step.icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium ${
                      currentStep >= step.number
                        ? "text-white"
                        : "text-gray-300"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 w-24 mx-4 transition-all duration-300 ${
                      currentStep > step.number ? "bg-white" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {renderStepContent()}

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
          <span className="mr-2">⚠️</span>
          {error}
        </div>
      )}

      {!isPreviewMode && currentStep > 1 && (
        <div className="mt-6">
          <Button
            onClick={() => setCurrentStep((current) => current - 1)}
            variant="outline"
            className="bg-white text-purple-600 border-purple-300 hover:bg-purple-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      )}
    </div>
  );
}

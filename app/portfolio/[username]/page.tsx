'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ResumeData } from '@/utils/types';
import { BusinessPortfolioComponent as Template1 } from '@/components/Site/BusinessPortfolio';
import { ComprehensiveDataAnalystPortfolio as Template2 } from '@/components/Site/SimpleDataAnalystPortfolio';
import { TechInnovatorPortfolioComponent as Template3 } from '@/components/Site/TechInnovatorPortfolio';

export default function Portfolio() {
  const router = useRouter();
  const params = useParams();
  const username = params.username;
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  useEffect(() => {
    if (username) {
      const storedData = localStorage.getItem(`portfolio_${username}`);
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          setResumeData(parsedData.resumeData);
          setSelectedTemplate(parsedData.template);
        } catch (error) {
          console.error('Failed to parse resume data from localStorage:', error);
        }
      }
    }
  }, [username]);

  if (!resumeData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">Portfolio not found</h1>
          <p className="text-gray-600 text-center">No resume data found for username: {username}. Please upload a resume first.</p>
        </div>
      </div>
    );
  }

  const renderTemplate = () => {
    console.log('Rendering Template:', selectedTemplate); // Debugging log
    switch (selectedTemplate) {
      case 'Minimalist Pro':
        return <Template1 data={resumeData} />;
      case 'Creative Portfolio':
        return <Template2 data={resumeData} />;
      case 'Tech Innovator':
        return <Template3 data={resumeData} />;
      default:
        return (
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">Template not found</h1>
            <p className="text-gray-600 text-center">No template selected for username: {username}. Please select a template first.</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        {renderTemplate()}
      </div>
    </div>
  );
}
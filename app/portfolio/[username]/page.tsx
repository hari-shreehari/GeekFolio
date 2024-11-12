'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ResumeData } from '@/utils/types';
import { BusinessPortfolioComponent as Business } from "@/components/Site/Business";
import { ComprehensiveDataAnalystPortfolio as Creative } from "@/components/Site/Creative";
import { TechInnovatorPortfolioComponent as Tech } from "@/components/Site/Tech";
import { PortfolioComponent as Minimal } from "@/components/Site/Minimal";

export default function Portfolio() {
  const router = useRouter();
  const params = useParams();
  const username = params.username;
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // useEffect(() => {
  //   if (username) {
  //     const storedData = localStorage.getItem(`portfolio_${username}`);
  //     if (storedData) {
  //       try {
  //         const parsedData = JSON.parse(storedData);
  //         setResumeData(parsedData.resumeData);
  //         setSelectedTemplate(parsedData.template);
  //       } catch (error) {
  //         console.error('Failed to parse resume data from localStorage:', error);
  //       }
  //     }
  //   }
  // }, [username]);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      if (!username) return;
  
      try {
        const response = await fetch(`/api/get?username=${username}`);
        
        if (response.ok) {
          const dbData = await response.json();
  
          setResumeData(dbData.resume_data);
          setSelectedTemplate(dbData.template);
        } else if (response.status === 404) {
          console.log('No portfolio found for this user');
        } else {
          console.error('Failed to fetch portfolio from database');
        }
      } catch (error) {
        console.error('Error fetching portfolio from database:', error);
      }
    };
  
    fetchPortfolioData();
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
        return <Minimal data={resumeData} />;
      case 'Creative Portfolio':
        return <Creative data={resumeData} />;
      case 'Tech Innovator':
        return <Tech data={resumeData} />;
      case 'Business Professional':
        return <Business data={resumeData} />;
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
    <div className="bg-gray-100 min-h-screen w-full">
      <div className="bg-white rounded-lg shadow-lg w-full h-full">
        {renderTemplate()}
      </div>
    </div>
  );
}
'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Add this import

interface ResumeData {
  name: string;
  extractedText: string;
  email?: string;
  phone?: string;
  github?: string;
  skills?: string[];
  experience?: string[];
  achievements?: string[];
}

export default function Portfolio() {
  const router = useRouter();
  const params = useParams(); // Use useParams to get route parameters
  const username = params.username; // Extract username from params
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  useEffect(() => {
    if (username) {
      const storedData = localStorage.getItem(`resumeData_${username}`);
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          setResumeData(parsedData.resumeData);
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

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900">{resumeData.name}</h1>
          <p className="text-lg text-gray-600">Portfolio for {username}</p>
        </div>

        {/* Contact Info */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Contact Information</h3>
          <ul className="text-gray-600">
            <li>Email: <a href={`mailto:${resumeData?.email}`} className="text-blue-500 hover:underline">{resumeData?.email || 'Not Available'}</a></li>
            <li>Phone: <span className="text-gray-600">{resumeData?.phone || 'Not Available'}</span></li>
            <li>GitHub: <a href={resumeData?.github} target="_blank" className="text-blue-500 hover:underline">{resumeData?.github || 'Not Available'}</a></li>
          </ul>
        </div>

        {/* Extracted Text */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Extracted Text:</h3>
          <pre className="bg-gray-100 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">{resumeData.extractedText}</pre>
        </div>

        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Skills:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-gray-600">
              {resumeData.skills.map((skill, index) => (
                <span key={index} className="bg-gray-200 py-2 px-4 rounded-full text-center">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Work Experience:</h3>
            <ul className="list-inside list-disc pl-4 text-gray-600">
              {resumeData.experience.map((exp, index) => (
                <li key={index} className="mb-2">{exp}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Achievements */}
        {resumeData.achievements && resumeData.achievements.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Achievements:</h3>
            <ul className="list-inside list-disc pl-4 text-gray-600">
              {resumeData.achievements.map((achievement, index) => (
                <li key={index} className="mb-2">{achievement}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer */}
        {/* <div className="text-center mt-8">
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded-full text-lg hover:bg-blue-700 focus:outline-none"
            onClick={() => router.push(`/publish?username=${username}`)}
          >
            Publish Portfolio
          </button>
        </div> */}
      </div>
    </div>
  );
}

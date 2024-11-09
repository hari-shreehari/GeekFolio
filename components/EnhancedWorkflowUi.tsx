'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Palette, Globe } from "lucide-react"

export function EnhancedWorkflowUi() {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Create Your Portfolio in 3 Easy Steps</h1>
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {/* Upload Resume Card */}
            <Card className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 border-t-4 border-blue-500">
              <CardHeader className="bg-blue-50">
                <CardTitle className="flex items-center text-blue-700">
                  <Upload className="mr-2" />
                  1. Upload Resume
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">Start by uploading your resume. We'll extract key information to create your portfolio.</p>
                <div className="mt-4">
                  <input
                    type="file"
                    id="resume-upload"
                    className="sr-only"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="flex items-center justify-center px-4 py-2 border border-blue-300 rounded-md shadow-sm text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 cursor-pointer transition-colors duration-300"
                  >
                    {file ? file.name : "Choose file"}
                  </label>
                  {file && (
                    <p className="mt-2 text-sm text-gray-500">
                      File selected: {file.name}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Select Template Card */}
            <Card className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 border-t-4 border-green-500">
              <CardHeader className="bg-green-50">
                <CardTitle className="flex items-center text-green-700">
                  <Palette className="mr-2" />
                  2. Select Template
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">Choose from our wide range of professional templates to showcase your skills and experience.</p>
                <Button className="mt-4 bg-green-500 hover:bg-green-600 text-white">Browse Templates</Button>
              </CardContent>
            </Card>

            {/* Host Easily Card */}
            <Card className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 border-t-4 border-purple-500">
              <CardHeader className="bg-purple-50">
                <CardTitle className="flex items-center text-purple-700">
                  <Globe className="mr-2" />
                  3. Host Easily
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">With just one click, publish your portfolio online and share it with potential employers.</p>
                <Button className="mt-4 bg-purple-500 hover:bg-purple-600 text-white">Learn More</Button>
              </CardContent>
            </Card>
          </div>

          {/* Arrow SVGs */}
          <svg className="hidden md:block absolute top-1/2 left-1/3 transform -translate-y-1/2 -translate-x-1/2" width="100" height="30" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 15H95M95 15L80 5M95 15L80 25" stroke="#4B5563" strokeWidth="2"/>
          </svg>
          <svg className="hidden md:block absolute top-1/2 right-1/3 transform -translate-y-1/2 translate-x-1/2" width="100" height="30" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 15H95M95 15L80 5M95 15L80 25" stroke="#4B5563" strokeWidth="2"/>
          </svg>
        </div>
      </div>
    </div>
  )
}
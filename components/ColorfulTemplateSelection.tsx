import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { PortfolioComponent } from '@/components/Site/Minimal'
import { TechInnovatorPortfolioComponent } from '@/components/Site/Tech'
import { ComprehensiveDataAnalystPortfolio } from '@/components/Site/Creative'
import { BusinessPortfolioComponent } from '@/components/Site/Business'
import { ResumeData } from '@/utils/types'
import { mockData } from '@/utils/mockData'

type Template = {
  id: number;
  name: string;
  category: string;
  description: string;
  color: string;
  accentColor: string;
  textColor: string;
  component: React.ComponentType<{ data: ResumeData }>;
};

const templates: Template[] = [
  { id: 1, name: "Minimalist Pro", category: "Minimal", description: "Clean and modern design...", color: "bg-gray-50", accentColor: "bg-gray-600", textColor: "text-gray-800", component: PortfolioComponent },
  { id: 2, name: "Tech Innovator", category: "Tech", description: "Modern and tech-focused design...", color: "bg-green-50", accentColor: "bg-green-600", textColor: "text-green-800", component: TechInnovatorPortfolioComponent },
  { id: 3, name: "Creative Portfolio", category: "Creative", description: "Vibrant and expressive design...", color: "bg-purple-50", accentColor: "bg-purple-600", textColor: "text-purple-800", component: ComprehensiveDataAnalystPortfolio },
  { id: 4, name: "Business Professional", category: "Business", description: "Sleek and professional layout...", color: "bg-blue-50", accentColor: "bg-blue-600", textColor: "text-blue-800", component: BusinessPortfolioComponent }
];

const ColorfulTemplateSelection = () => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [resumeData, setResumeData] = useState<ResumeData>(mockData)

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  const handlePreviewClick = (template: Template) => {
    setSelectedTemplate(template)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedTemplate(null)
  }

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template)
  }

  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Choose Your Perfect Portfolio Template</h1>
      
      <div className="mb-12">
        <Input
          type="search"
          placeholder="Search templates..."
          className="max-w-md mx-auto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-24">
        {filteredTemplates.map((template, index) => (
          <div key={template.id} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
            <div 
              className={`w-full md:w-1/2 ${template.color} aspect-video flex items-center justify-center ${template.textColor} text-2xl font-bold rounded-lg shadow-lg overflow-hidden`}
              style={{
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <div style={{
                transform: 'scale(0.25)',  
                transformOrigin: 'top left',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '400%'
              }}>
                {/* Render template preview */}
                {React.createElement(template.component, { data: resumeData })}
              </div>
            </div>
            <div className={`w-full md:w-1/2 p-6 flex flex-col justify-between ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
              <div>
                <h2 className={`text-3xl font-bold mb-2 ${template.textColor}`}>{template.name}</h2>
                <Badge className={`mb-4 ${template.accentColor} text-white`}>{template.category}</Badge>
                <p className={`text-lg mb-6 ${template.textColor}`}>{template.description}</p>
              </div>
              <div className="flex justify-between mt-4">
                <Button 
                  variant="outline" 
                  className={`${template.textColor} border-current`} 
                  onClick={() => handlePreviewClick(template)}
                >
                  Preview
                </Button>
                <Button 
                  className={`${template.accentColor} text-white`}
                  onClick={() => handleSelectTemplate(template)}
                >
                  Select This Template
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedTemplate && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div 
            className="relative bg-white rounded-lg shadow-xl p-6 max-h-[95vh] w-[95vw] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-[60] text-3xl text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4">{selectedTemplate.name}</h2>
            <div className="overflow-auto h-[80vh]">
              {/* Render selected template with resume data */}
              {React.createElement(selectedTemplate.component, { data: resumeData })}
            </div>

            <div className="mt-4 flex justify-center">
              <Button 
                onClick={closeModal} 
                className="bg-gray-600 text-white z-[60]"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ColorfulTemplateSelection;

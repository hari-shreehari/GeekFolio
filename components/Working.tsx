'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, Brain, FileText, Layout, Globe, Edit, ArrowRight, ChevronDown, Check, Github } from 'lucide-react'
import { Button } from "@/components/ui/button"

const steps = [
  {
    icon: <Upload className="w-8 h-8 text-blue-500" />,
    title: "Upload Resume",
    description: "Begin by uploading your existing resume. Our open-source system accepts a variety of formats including PDF, DOCX, ODT and PNG, ensuring flexibility for all users.",
    color: "bg-blue-100",
    details: [
      "Drag and drop functionality for easy upload",
      "Automatic format detection and conversion",
      "Secure and encrypted file handling"
    ]
  },
  {
    icon: <Brain className="w-8 h-8 text-purple-500" />,
    title: "AI Processing",
    description: "Our advanced AI analyzes your resume, understanding your unique experiences, skills, and career trajectory to create a tailored portfolio.",
    color: "bg-purple-100",
    details: [
      "Natural Language Processing to understand context",
      "Machine Learning algorithms for skill categorization",
      "Continuous community-driven improvements for better accuracy"
    ]
  },
  {
    icon: <FileText className="w-8 h-8 text-green-500" />,
    title: "Data Extraction",
    description: "Key information is extracted and organized from your resume, ready to be showcased in your portfolio in the most impactful way.",
    color: "bg-green-100",
    details: [
      "Intelligent parsing of work experience and education",
      "Skill assessment and categorization",
      "Extraction of achievements and quantifiable results"
    ]
  },
  {
    icon: <Layout className="w-8 h-8 text-yellow-500" />,
    title: "Choose Template",
    description: "Select from our wide and growing range of community-contributed templates, each designed to highlight your unique professional story.",
    color: "bg-yellow-100",
    details: [
      "Industry-specific template recommendations",
      "Customizable color schemes and layouts",
      "Mobile-responsive designs for all devices"
    ]
  },
  {
    icon: <Globe className="w-8 h-8 text-red-500" />,
    title: "Host Portfolio",
    description: "Your portfolio is hosted for free with a permanent URL of your choice, ready to be shared with potential employers or your professional network.",
    color: "bg-red-100",
    details: [
      "Free hosting with optional custom domain support",
      "SEO optimization for better visibility",
      "Basic analytics to track portfolio views"
    ]
  }
]

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = Number(entry.target.getAttribute('data-step'))
            setVisibleSteps((prev) => [...new Set([...prev, stepIndex])])
          }
        })
      },
      { threshold: 0.5 }
    )

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">How It Works</h1>
        <p className="text-xl text-center mb-4 text-gray-600">
          Transform your resume into a stunning online portfolio with our free, open-source tool.
        </p>
        <div className="flex justify-center items-center mb-12 space-x-4">
          <Github className="w-6 h-6 text-gray-700" />
          <span className="text-lg text-gray-700">Open Source</span>
          <span className="text-lg font-bold text-green-600">100% Free</span>
        </div>

        <div className="relative">
          {/* Central line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2" />

          {/* Steps */}
          {steps.map((step, index) => (
            <motion.div
              key={index}
              //@ts-ignore
              ref={(el: HTMLDivElement | null) => (stepRefs.current[index] = el)}
              data-step={index}
              className={`flex items-center mb-16 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ 
                opacity: visibleSteps.includes(index) ? 1 : 0, 
                x: visibleSteps.includes(index) ? 0 : (index % 2 === 0 ? -50 : 50)
              }}
              transition={{ duration: 0.5 }}
            >
              <div 
                className={`w-96 p-6 rounded-lg shadow-lg ${step.color} cursor-pointer transition-all duration-300 transform hover:scale-105`}
                onMouseEnter={() => setActiveStep(index)}
              >
                <div className="flex items-center mb-4">
                  {step.icon}
                  <h3 className="text-xl font-semibold ml-2">{step.title}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">{step.description}</p>
                <ul className="space-y-2">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Connector */}
              <div className={`absolute left-1/2 w-8 h-1 ${step.color} transform -translate-x-1/2 ${index % 2 === 0 ? 'translate-x-full' : '-translate-x-full'}`} />
            </motion.div>
          ))}

          {/* Active step highlight */}
          <motion.div 
            className="absolute left-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2"
            animate={{ top: `${activeStep * 25}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Community Contribution Section */}
        <motion.div 
          className="mt-16 p-6 bg-green-50 border-2 border-green-200 rounded-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <div className="flex items-center mb-4">
            <Github className="w-8 h-8 text-green-500" />
            <h3 className="text-2xl font-bold ml-4 text-green-800">Join Our Open Source Community</h3>
          </div>
          <p className="text-green-600 mb-4">
            Our project thrives on community contributions. Help us improve and expand our portfolio builder!
          </p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <Check className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span className="text-sm text-gray-700">Contribute new templates or improve existing ones</span>
            </li>
            <li className="flex items-start">
              <Check className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span className="text-sm text-gray-700">Enhance AI algorithms for better resume parsing</span>
            </li>
            <li className="flex items-start">
              <Check className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span className="text-sm text-gray-700">Suggest new features to make portfolio creation even easier</span>
            </li>
          </ul>
          <a href="https://github.com/orgs/Geekfolio/repositories" target="_blank" rel="noopener noreferrer">
            <Button className="mt-4 bg-green-500 hover:bg-green-600 text-white">
              View on GitHub
              <Github className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <a href="./uploads" className="inline-block">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
              Get Started Now - It's Free!
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </motion.div>
      </div>
    </div>
  )
}
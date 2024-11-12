'use client'

import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, Linkedin, Mail, MapPin, Calendar, Briefcase, GraduationCap, Award, Globe, Code, Rocket, Users } from "lucide-react"
import { ReactNode } from 'react';
import { ResumeData } from '@/utils/types'

const AnimatedSection = ({ children }: { children: ReactNode }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ opacity: scrollYProgress }}
    >
      {children}
    </motion.div>
  )
}

export function TechInnovatorPortfolioComponent({ data }: { data: ResumeData }) {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const [activeTab, setActiveTab] = useState<'about' | 'experience' | 'projects' | 'contact'>('about')

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 text-gray-900 overflow-hidden">
      <motion.div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: backgroundY,
          opacity: 0.1
        }}
      />

      <motion.div 
        className="absolute top-0 left-0 right-0 h-2 bg-blue-600 z-50"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="relative z-10">
        <header className="p-6 md:p-12 bg-white shadow-md">
          <nav className="flex justify-between items-center">
            <motion.h1 
              className="text-2xl font-bold text-gray-800"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {data.personal_information[0].name.join(' ')}
            </motion.h1>
            <motion.div 
              className="space-x-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button 
                variant={activeTab === 'about' ? "default" : "ghost"} 
                onClick={() => setActiveTab('about')}
              >
                About
              </Button>
              <Button 
                variant={activeTab === 'experience' ? "default" : "ghost"} 
                onClick={() => setActiveTab('experience')}
              >
                Experience
              </Button>
              <Button 
                variant={activeTab === 'projects' ? "default" : "ghost"} 
                onClick={() => setActiveTab('projects')}
              >
                Projects
              </Button>
              <Button 
                variant={activeTab === 'contact' ? "default" : "ghost"} 
                onClick={() => setActiveTab('contact')}
              >
                Contact
              </Button>
            </motion.div>
          </nav>
        </header>

        <main className="container mx-auto px-6 py-12 max-w-5xl">
          {activeTab === 'about' && (
            <AnimatedSection>
              <section className="text-center mb-16">
                <Avatar className="w-40 h-40 mx-auto mb-6 border-4 border-white shadow-lg">
                  <AvatarImage src={ "/placeholder.svg"} alt={String(data.personal_information[0].name[0])} />
                  <AvatarFallback>{data.personal_information[0].name.join(' ').split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h2 className="text-4xl font-bold mb-4 text-gray-800">{data.personal_information[0].name.join(' ')}</h2>
                <p className="text-xl text-gray-600 mb-6">
                  {data.personal_information[0].objective_summary[0].professional_summary || data.personal_information[0].objective_summary[0].career_objective}
                </p>
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" size="icon" asChild>
                    <a href={data.personal_information[0].github_profile[0]} target="_blank" rel="noopener noreferrer">
                      <Github className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href={data.personal_information[0].linkedin_profile[0]} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href={`mailto:${data.personal_information[0].contact_information[0].email[0]}`}>
                      <Mail className="h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </section>
            </AnimatedSection>
          )}

          {activeTab === 'experience' && (
            <AnimatedSection>
              <section className="mb-16">
                <h3 className="text-3xl font-semibold mb-6 flex items-center text-gray-800">
                  <Briefcase className="mr-2" />
                  Work Experience
                </h3>
                {data.experience.map((exp, index) => (
                  <Card key={index} className="mb-6">
                    <CardHeader>
                      <CardTitle>{exp.job_title.join(', ')}</CardTitle>
                      <CardDescription>{exp.company_name.join(', ')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p><MapPin className="inline mr-2" />{exp.location.city.join(', ')}, {exp.location.state.join(', ')}</p>
                      <p><Calendar className="inline mr-2" />{exp.dates_of_employment.start_date.join(', ')} - {exp.dates_of_employment.end_date.join(', ')}</p>
                      <ul className="list-disc list-inside mt-4">
                        {exp.responsibilities_achievements.map((responsibility, idx) => (
                          <li key={idx}>{responsibility}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </section>
            </AnimatedSection>
          )}

          {activeTab === 'projects' && (
            <AnimatedSection>
              <section className="mb-20">
                <h3 className="text-3xl font-semibold mb-6 flex items-center text-gray-800">
                  <Code className="mr-2" />
                  Projects
                </h3>
                {data.projects.map((project, index) => (
                  <Card key={index} className="mb-4">
                    <CardHeader>
                      <CardTitle>{project.project_title.join(', ')}</CardTitle>
                      <CardDescription>{project.technologies_used.join(', ')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p><Calendar className="inline mr-2" />{project.duration.start_date.join(', ')} - {project.duration.end_date.join(', ')}</p>
                      <p className="mt-2">{project.project_description.join(', ')}</p>
                      {project.project_links && (
                        <a href={project.project_links.join(', ')} className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
                          View Project
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </section>
            </AnimatedSection>
          )}

          {activeTab === 'contact' && (
            <AnimatedSection>
              <section className="mb-16">
                <h3 className="text-3xl font-semibold mb-6 flex items-center text-gray-800">
                  <Globe className="mr-2" />
                  Contact Information
                </h3>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-gray-700">
                      Email: <a href={`mailto:${data.personal_information[0].contact_information[0].email.join(', ')}`} className="text-blue-600 hover:text-blue-800">{data.personal_information[0].contact_information[0].email.join(', ')}</a>
                    </p>
                    <p className="text-gray-700 mt-2">
                      LinkedIn: <a href={data.personal_information[0].linkedin_profile.join(', ')} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">View Profile</a>
                    </p>
                    <p className="text-gray-700 mt-2">
                      Phone: {data.personal_information[0].contact_information[0].phone_number.join(', ')}
                    </p>
                    <p className="text-gray-700 mt-2">
                      Address: {data.personal_information[0].contact_information[0].address.join(', ')}
                    </p>
                  </CardContent>
                </Card>
              </section>
            </AnimatedSection>
          )}
        </main>

        <footer className="ml-auto text-center p-6 text-gray-600 bg-white mt-12">
          <p>&copy; 2023 {data.personal_information[0].name.join(' ')}. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}
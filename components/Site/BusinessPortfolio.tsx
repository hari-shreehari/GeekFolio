'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Linkedin, Mail, Briefcase, GraduationCap, Award, Globe, BarChart, PieChart, TrendingUp } from "lucide-react"
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

const PortfolioSection = ({ projects }: { projects: ResumeData['projects'] }) => (
  <AnimatedSection>
    <section className="mb-16">
      <h3 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
        <PieChart className="mr-2" />
        Portfolio Projects
      </h3>
      {projects.map((project, index) => (
        <Card key={index} className="mb-6">
          <CardHeader>
            <CardTitle>{project.project_title.join(', ')}</CardTitle>
            <CardDescription>{project.technologies_used.join(', ')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-2">
              {project.duration.start_date.join(' - ')} - {project.duration.end_date.join(' - ')}
            </p>
            <p className="text-gray-700">{project.project_description.join(', ')}</p>
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
)

export function BusinessPortfolioComponent({ data }: { data: ResumeData }) {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <motion.div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: backgroundY,
          opacity: 0.05
        }}
      />

      <motion.div 
        className="absolute top-0 left-0 right-0 h-1 bg-blue-600 z-50"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="relative z-10">
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-6 py-4">
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
                <Button variant="ghost">About</Button>
                <Button variant="ghost">Experience</Button>
                <Button variant="ghost">Skills</Button>
                <Button variant="ghost">Contact</Button>
              </motion.div>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-6 py-12 max-w-5xl">
          <AnimatedSection>
            <section className="text-center mb-16">
              <Avatar className="w-40 h-40 mx-auto mb-6 border-4 border-white shadow-lg">
                <AvatarImage src={data.personal_information[0].name[0] || "/placeholder.svg"} alt={data.personal_information[0].name.join(' ')} />
                <AvatarFallback>{data.personal_information[0].name.join(' ').split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <h2 className="text-4xl font-bold mb-2 text-gray-800">{data.personal_information[0].name.join(' ')}</h2>
              <p className="text-xl text-gray-600 mb-4">{data.personal_information[0].objective_summary[0].professional_summary || data.personal_information[0].objective_summary[0].career_objective}</p>
              <p className="text-lg text-gray-600 mb-6">{data.personal_information[0].objective_summary[0].career_objective}</p>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" size="icon" asChild>
                  <a href={`mailto:${data.personal_information[0].contact_information[0].email.join(', ')}`}>
                    <Mail className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href={data.personal_information[0].linkedin_profile.join(', ')} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </section>
          </AnimatedSection>

          <AnimatedSection>
            <section className="mb-16">
              <h3 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
                <Briefcase className="mr-2" />
                Professional Summary
              </h3>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-gray-700">
                    {data.personal_information[0].objective_summary[0].professional_summary}
                  </p>
                </CardContent>
              </Card>
            </section>
          </AnimatedSection>

          <AnimatedSection>
            <section className="mb-16">
              <h3 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
                <Briefcase className="mr-2" />
                Work Experience
              </h3>
              {data.experience.map((exp, index) => (
                <Card key={index} className="mb-6">
                  <CardHeader>
                    <CardTitle>{exp.job_title.join(', ')}</CardTitle>
                    <CardDescription>
                      {exp.company_name.join(', ')} | {exp.location.city.join(', ')}, {exp.location.state.join(', ')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2">
                      {exp.dates_of_employment.start_date.join(' - ')} - {exp.dates_of_employment.end_date.join(' - ')}
                    </p>
                    <ul className="list-disc list-inside">
                      {exp.responsibilities_achievements.map((item, i) => (
                        <li key={i} className="text-gray-700">{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </section>
          </AnimatedSection>

          <AnimatedSection>
            <section className="mb-16">
              <h3 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
                <GraduationCap className="mr-2" />
                Education
              </h3>
              {data.education.map((edu, index) => (
                <Card key={index} className="mb-6">
                  <CardHeader>
                    <CardTitle>{edu.degree.join(', ')} in {edu.major_field_of_study.join(', ')}</CardTitle>
                    <CardDescription>{edu.university_institution_name.join(', ')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">Graduated: {edu.graduation_date.join(', ')}</p>
                    {edu.cgpa_grades && (
                      <Progress value={parseFloat(edu.cgpa_grades[0]) * 10} max={100} className="my-2" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </section>
          </AnimatedSection>

          <PortfolioSection projects={data.projects} />
        </main>
      </div>
    </div>
  )
}

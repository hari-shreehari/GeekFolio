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

// Mock data object
const mockData = {
  personal_information: {
    name: "AJAY B",
    title: "COMPETITIVE CODER",
    contact_information: {
      phone_number: "+91 8122750426",
      email: "ajaybalajiprasad002@gmail.com",
      address: ""
    },
    linkedin_profile: "",
    github_profile: "github.com/ajaybalajiprasad",
    objective_summary: {
      career_objective: "",
      professional_summary: "COMPETITIVE CODER"
    }
  },
  education: [
    {
      degree: "Bachelor of Electrical and Communication Engineering",
      major_field_of_study: "",
      university_institution_name: "CHENNAI INSTITUTE OF TECHNOLOGY AND APPLIED RESEARCH",
      graduation_date: "2027",
      cgpa_grades: ""
    },
    {
      degree: "",
      major_field_of_study: "",
      university_institution_name: "ST.ANNS MAT HR SEC SCHOOL",
      graduation_date: "2023",
      cgpa_grades: ""
    }
  ],
  experience: [
    {
      job_title: "FOUNDER",
      company_name: "PREPEX",
      location: {
        city: "",
        state: ""
      },
      dates_of_employment: {
        start_date: "2024",
        end_date: "Present"
      },
      responsibilities_achievements: [
        "Developing a Personalized Student Preparation App",
        "Creating a Web App with NEXT JS",
        "Acquiring Team Experience",
        "Mastering Various Tech Stacks"
      ]
    },
    {
      job_title: "BACKEND DEVELOPER",
      company_name: "BITSPACE",
      location: {
        city: "",
        state: ""
      },
      dates_of_employment: {
        start_date: "2024 Feb",
        end_date: "Mar"
      },
      responsibilities_achievements: [
        "Created a website for a College Event",
        "Worked with seniors for the backend team",
        "Acquired experience in various tech stacks"
      ]
    }
  ],
  projects: [
    {
      project_title: "Project Title Example",
      technologies_used: "Technologies Used Example",
      duration: {
        start_date: "Start Date Example",
        end_date: "End Date Example"
      },
      project_description: "Project Description Example"
    }
  ],
  certifications: [
    {
      certification_title: "Certified Kubernetes Administrator",
      issuing_organization: "Cloud Native Computing Foundation",
      date_obtained: "2022-08-15"
    }
  ],
  skills: {
    technical_skills: [
      { skill: "JavaScript", proficiency: 0 },
      { skill: "Node", proficiency: 0 },
      { skill: "Next", proficiency: 0 },
      { skill: "Express", proficiency: 0 },
      { skill: "Python", proficiency: 0 },
      { skill: "Django", proficiency: 0 },
      { skill: "PostgreSQL", proficiency: 0 },
      { skill: "SupaBase", proficiency: 0 },
      { skill: "Mongo DB", proficiency: 0 },
      { skill: "C++", proficiency: 0 },
      { skill: "Git", proficiency: 0 },
      { skill: "AWS", proficiency: 0 },
      { skill: "Linux", proficiency: 0 },
      { skill: "Arduino", proficiency: 0 }
    ],
    soft_skills: []
  },
  achievements: [
    "Winner of Makeathon 2023 (Prize Worth 50,000)",
    "Solved over 330+ problems on LeetCode, With highest contest rating of 1791"
  ],
  languages: [
    { language_proficiency: "English", level_of_proficiency: "Fluent" },
    { language_proficiency: "Spanish", level_of_proficiency: "Intermediate" }
  ]
}

const PortfolioSection = ({ projects }: { projects: typeof mockData.projects }) => (
  <AnimatedSection>
    <section className="mb-16">
      <h3 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
        <PieChart className="mr-2" />
        Portfolio Projects
      </h3>
      {projects.map((project, index) => (
        <Card key={index} className="mb-6">
          <CardHeader>
            <CardTitle>{project.project_title}</CardTitle>
            <CardDescription>{project.technologies_used}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-2">{project.duration.start_date} - {project.duration.end_date}</p>
            <p className="text-gray-700">{project.project_description}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  </AnimatedSection>
)

export function BusinessPortfolioComponent({ data = mockData }) {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <motion.div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
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
                {data.personal_information.name}
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
                <AvatarImage src="/placeholder.svg?height=160&width=160" alt={data.personal_information.name} />
                <AvatarFallback>{data.personal_information.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <h2 className="text-4xl font-bold mb-2 text-gray-800">{data.personal_information.name}</h2>
              <p className="text-xl text-gray-600 mb-4">{data.personal_information.title}</p>
              <p className="text-lg text-gray-600 mb-6">{data.personal_information.objective_summary.career_objective}</p>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" size="icon">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <Mail className="h-5 w-5" />
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
                    {data.personal_information.objective_summary.professional_summary}
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
                    <CardTitle>{exp.job_title}</CardTitle>
                    <CardDescription>{exp.company_name} | {exp.location.city}, {exp.location.state}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2">{exp.dates_of_employment.start_date} - {exp.dates_of_employment.end_date}</p>
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
                    <CardTitle>{edu.degree} in {edu.major_field_of_study}</CardTitle>
                    <CardDescription>{edu.university_institution_name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">Graduated: {edu.graduation_date}</p>
                    <p className="text-sm text-gray-600">GPA: {edu.cgpa_grades}</p>
                  </CardContent>
                </Card>
              ))}
            </section>
          </AnimatedSection>

          <AnimatedSection>
            <section className="mb-16">
              <h3 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
                <BarChart className="mr-2" />
                Skills
              </h3>
              <Tabs defaultValue="technical" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="technical">Technical Skills</TabsTrigger>
                  <TabsTrigger value="soft">Soft Skills</TabsTrigger>
                </TabsList>
                <TabsContent value="technical">
                  <Card>
                    <CardContent className="pt-6">
                      {data.skills.technical_skills.map((skill, index) => (
                        <div key={index} className="mb-4">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">{skill.skill}</span>
                            <span className="text-sm font-medium text-gray-700">{skill.proficiency}%</span>
                          </div>
                          <Progress value={skill.proficiency} className="w-full" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="soft">
                  <Card>
                    <CardContent className="pt-6">
                      <ul className="list-disc list-inside">
                        {data.skills.soft_skills.map((skill, index) => (
                          <li key={index} className="text-gray-700 mb-2">{skill}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </section>
          </AnimatedSection>

          <PortfolioSection projects={data.projects} />

          <AnimatedSection>
            <section className="mb-16">
              <h3 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
                <Award className="mr-2" />
                Certifications
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {data.certifications.map((cert, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{cert.certification_title}</CardTitle>
                      <CardDescription>{cert.issuing_organization}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">Obtained: {cert.date_obtained}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </AnimatedSection>

          <AnimatedSection>
            <section className="mb-16">
              <h3 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
                <TrendingUp className="mr-2" />
                Achievements
              </h3>
              <Card>
                <CardContent className="pt-6">
                  <ul className="list-disc list-inside">
                    {data.achievements.map((achievement, index) => (
                      <li key={index} className="text-gray-700 mb-2">{achievement}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>
          </AnimatedSection>

          <AnimatedSection>
            <section>
              <h3 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
                <Globe className="mr-2" />
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.languages.map((lang, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {lang.language_proficiency} - {lang.level_of_proficiency}
                  </Badge>
                ))}
              </div>
            </section>
          </AnimatedSection>
        </main>

        <footer className="bg-white mt-12 py-6">
          <div className="container mx-auto px-6 text-center text-gray-600">
            <p>&copy; 2023 {data.personal_information.name}. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
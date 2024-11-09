'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, Linkedin, Mail, MapPin, Calendar, Briefcase, GraduationCap, Award, Globe, Code, Rocket, Users } from "lucide-react"
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
    name: "John Doe",
    contact_information: {
      phone_number: "+1 (555) 123-4567",
      email: "john.doe@example.com",
      address: "123 Tech Street, Innovation City, TC 12345"
    },
    linkedin_profile: "https://www.linkedin.com/in/johndoe",
    github_profile: "https://github.com/johndoe",
    objective_summary: {
      career_objective: "Innovative Tech Leader",
      professional_summary: "Passionate tech innovator with 10+ years of experience in developing cutting-edge solutions. Skilled in AI, blockchain, and IoT technologies."
    }
  },
  education: {
    degree: "Master of Science",
    major_field_of_study: "Computer Science",
    university_institution_name: "Tech University",
    graduation_date: "May 2015",
    cgpa_grades: "3.9/4.0"
  },
  experience: {
    job_title: "Senior Software Engineer",
    company_name: "InnoTech Solutions",
    location: {
      city: "San Francisco",
      state: "CA"
    },
    dates_of_employment: {
      start_date: "June 2015",
      end_date: "Present"
    },
    responsibilities_achievements: "Led development of AI-powered analytics platform, resulting in 40% improvement in data processing efficiency. Mentored junior developers and implemented agile methodologies."
  },
  projects: [
    {
      project_title: "AI-Driven Smart Home System",
      technologies_used: "Python, TensorFlow, IoT",
      project_description: "Developed an intelligent home automation system using machine learning algorithms for energy optimization and predictive maintenance.",
      duration: {
        start_date: "Jan 2020",
        end_date: "Dec 2020"
      },
      project_links: "https://github.com/johndoe/smart-home"
    }
  ],
  certifications: [
    {
      certification_title: "AWS Certified Solutions Architect",
      issuing_organization: "Amazon Web Services",
      date_obtained: "September 2019"
    }
  ],
  skills: {
    technical_skills: "Python, JavaScript, React, Node.js, AWS, Docker, Kubernetes, Machine Learning, Blockchain",
    soft_skills: "Leadership, Problem-solving, Communication, Team Collaboration, Agile Methodologies"
  },
  achievements: {
    awards_honors: "Best Innovation Award, TechCorp Hackathon 2018",
    scholarships: "Merit Scholarship, Tech University",
    competitions: "1st Place, National Coding Challenge 2017"
  },
  extracurricular_activities: {
    clubs_organizations: "Member, IEEE Computer Society",
    volunteer_work: "Code Mentor, local STEM education program",
    leadership_roles: "Team Lead, Open Source AI Project"
  },
  languages: [
    {
      language_proficiency: "English",
      level_of_proficiency: "Native"
    },
    {
      language_proficiency: "Spanish",
      level_of_proficiency: "Intermediate"
    }
  ]
}

export function TechInnovatorPortfolioComponent({ data = mockData }) {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 text-gray-900 overflow-hidden">
      <motion.div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')",
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
              <Button variant="ghost">Projects</Button>
              <Button variant="ghost">Contact</Button>
            </motion.div>
          </nav>
        </header>

        <main className="container mx-auto px-6 py-12 max-w-5xl">
          <AnimatedSection>
            <section className="text-center mb-16">
              <Avatar className="w-40 h-40 mx-auto mb-6 border-4 border-white shadow-lg">
                <AvatarImage src="/placeholder.svg?height=160&width=160" alt={data.personal_information.name} />
                <AvatarFallback>{data.personal_information.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <h2 className="text-4xl font-bold mb-4 text-gray-800">{data.personal_information.name}</h2>
              <p className="text-xl text-gray-600 mb-6">{data.personal_information.objective_summary.career_objective}</p>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" size="icon">
                  <Github className="h-5 w-5" />
                </Button>
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
            <section className="mb-20">
              <h3 className="text-3xl font-semibold mb-6 flex items-center text-gray-800">
                <Briefcase className="mr-2" />
                About Me
              </h3>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-lg text-gray-700">
                    {data.personal_information.objective_summary.professional_summary}
                  </p>
                </CardContent>
              </Card>
            </section>
          </AnimatedSection>

          <AnimatedSection>
            <section className="mb-20">
              <h3 className="text-3xl font-semibold mb-6 flex items-center text-gray-800">
                <GraduationCap className="mr-2" />
                Education
              </h3>
              <Card>
                <CardHeader>
                  <CardTitle>{data.education.degree} in {data.education.major_field_of_study}</CardTitle>
                  <CardDescription>{data.education.university_institution_name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p><Calendar className="inline mr-2" />{data.education.graduation_date}</p>
                  <p><Award className="inline mr-2" />CGPA: {data.education.cgpa_grades}</p>
                </CardContent>
              </Card>
            </section>
          </AnimatedSection>

          <AnimatedSection>
            <section className="mb-20">
              <h3 className="text-3xl font-semibold mb-6 flex items-center text-gray-800">
                <Briefcase className="mr-2" />
                Experience
              </h3>
              <Card>
                <CardHeader>
                  <CardTitle>{data.experience.job_title}</CardTitle>
                  <CardDescription>{data.experience.company_name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p><MapPin className="inline mr-2" />{data.experience.location.city}, {data.experience.location.state}</p>
                  <p><Calendar className="inline mr-2" />{data.experience.dates_of_employment.start_date} - {data.experience.dates_of_employment.end_date}</p>
                  <p className="mt-4">{data.experience.responsibilities_achievements}</p>
                </CardContent>
              </Card>
            </section>
          </AnimatedSection>

          <AnimatedSection>
            <section className="mb-20">
              <h3 className="text-3xl font-semibold mb-6 flex items-center text-gray-800">
                <Rocket className="mr-2" />
                Projects
              </h3>
              <div className="space-y-6">
                {data.projects.map((project, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{project.project_title}</CardTitle>
                      <CardDescription>{project.technologies_used}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p><Calendar className="inline mr-2" />{project.duration.start_date} - {project.duration.end_date}</p>
                      <p className="mt-2">{project.project_description}</p>
                      <a href={project.project_links} className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
                        View Project
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </AnimatedSection>

          <AnimatedSection>
            <section className="mb-20">
              <h3 className="text-3xl font-semibold mb-6 flex items-center text-gray-800">
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
                      <p><Calendar className="inline mr-2" />{cert.date_obtained}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </AnimatedSection>

          <AnimatedSection>
            <section className="mb-20">
              <h3 className="text-3xl font-semibold mb-6 text-gray-800">Skills</h3>
              <Tabs defaultValue="technical" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="technical">Technical Skills</TabsTrigger>
                  <TabsTrigger value="soft">Soft Skills</TabsTrigger>
                </TabsList>
                <TabsContent value="technical">
                  <Card>
                    <CardContent className="pt-6">
                      <p>{data.skills.technical_skills}</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="soft">
                  <Card>
                    <CardContent className="pt-6">
                      <p>{data.skills.soft_skills}</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </section>
          </AnimatedSection>

          <AnimatedSection>
            <section className="mb-20">
              <h3 className="text-3xl font-semibold mb-6 flex items-center text-gray-800">
                <Award className="mr-2" />
                Achievements
              </h3>
              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2">Awards and Honors</h4>
                  <p>{data.achievements.awards_honors}</p>
                  <h4 className="font-semibold mb-2 mt-4">Scholarships</h4>
                  <p>{data.achievements.scholarships}</p>
                  <h4 className="font-semibold mb-2 mt-4">Competitions</h4>
                  <p>{data.achievements.competitions}</p>
                </CardContent>
              </Card>
            </section>
          </AnimatedSection>

          <AnimatedSection>
            <section className="mb-20">
              <h3 className="text-3xl font-semibold mb-6 flex items-center text-gray-800">
                <Users className="mr-2" />
                Extracurricular Activities
              </h3>
              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2">Clubs and Organizations</h4>
                  <p>{data.extracurricular_activities.clubs_organizations}</p>
                  <h4 className="font-semibold mb-2 mt-4">Volunteer Work</h4>
                  <p>{data.extracurricular_activities.volunteer_work}</p>
                  <h4 className="font-semibold mb-2 mt-4">Leadership Roles</h4>
                  <p>{data.extracurricular_activities.leadership_roles}</p>
                </CardContent>
              </Card>
            </section>
          </AnimatedSection>

          <AnimatedSection>
            <section>
              <h3 className="text-3xl font-semibold mb-6 flex items-center text-gray-800">
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

        <footer className="text-center p-6 text-gray-600 bg-white mt-12">
          <p>&copy; 2023 {data.personal_information.name}. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}
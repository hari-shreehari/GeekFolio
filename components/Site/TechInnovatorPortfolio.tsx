'use client'

import { useRef } from 'react'
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
                <AvatarImage src={data.personal_information[0].name[0] || "/placeholder.svg"} alt={data.personal_information[0].name.join(' ')} />
                <AvatarFallback>{data.personal_information[0].name.join(' ').split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <h2 className="text-4xl font-bold mb-4 text-gray-800">{data.personal_information[0].name.join(' ')}</h2>
              <p className="text-xl text-gray-600 mb-6">{data.personal_information[0].objective_summary[0].professional_summary || data.personal_information[0].objective_summary[0].career_objective}</p>
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

          <AnimatedSection>
            <section className="mb-20">
              <h3 className="text-3xl font-semibold mb-6 flex items-center text-gray-800">
                <Briefcase className="mr-2" />
                About Me
              </h3>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-lg text-gray-700">
                    {data.personal_information[0].objective_summary[0].professional_summary}
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
              {data.education.map((edu, index) => (
                <Card key={index} className="mb-4">
                  <CardHeader>
                    <CardTitle>{edu.degree.join(', ')} in {edu.major_field_of_study.join(', ')}</CardTitle>
                    <CardDescription>{edu.university_institution_name.join(', ')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p><Calendar className="inline mr-2" />{edu.graduation_date.join(', ')}</p>
                    <p><Award className="inline mr-2" />CGPA: {edu.cgpa_grades.join(', ')}</p>
                  </CardContent>
                </Card>
              ))}
            </section>
          </AnimatedSection>

          <AnimatedSection>
            <section className="mb-20">
              <h3 className="text-3xl font-semibold mb-6 flex items-center text-gray-800">
                <Briefcase className="mr-2" />
                Experience
              </h3>
              {data.experience.map((exp, index) => (
                <Card key={index} className="mb-4">
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

          <AnimatedSection>
            <section className="mb-20">
              <h3 className="text-3xl font-semibold mb-6 flex items-center text-gray-800">
                <Rocket className="mr-2" />
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
                      <CardTitle>{cert.certification_title.join(', ')}</CardTitle>
                      <CardDescription>{cert.issuing_organization.join(', ')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p><Calendar className="inline mr-2" />{cert.date_obtained.join(', ')}</p>
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
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(data.skills.technical_skills) && 
                          data.skills.technical_skills.map((skill: { skill: string } | string, index) => (
                            <Badge key={index} variant="secondary">
                              {typeof skill === 'string' ? skill : skill.skill}
                            </Badge>
                          ))
                        }
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="soft">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-wrap gap-2">
                        {data.skills.soft_skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
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
                  <ul className="list-disc list-inside mb-4">
                    {data.achievements.awards_honors.map((award, index) => (
                      <li key={index}>{award}</li>
                    ))}
                  </ul>
                  
                  <h4 className="font-semibold mb-2">Scholarships</h4>
                  <ul className="list-disc list-inside mb-4">
                    {data.achievements.scholarships.map((scholarship, index) => (
                      <li key={index}>{scholarship}</li>
                    ))}
                  </ul>
                  
                  <h4 className="font-semibold mb-2">Competitions</h4>
                  <ul className="list-disc list-inside">
                    {data.achievements.competitions.map((competition, index) => (
                      <li key={index}>{competition}</li>
                    ))}
                  </ul>
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
                    {lang.language_proficiency.join(', ')} - {lang.level_of_proficiency.join(', ')}
                  </Badge>
                ))}
              </div>
            </section>
          </AnimatedSection>
        </main>

        <footer className="text-center p-6 text-gray-600 bg-white mt-12">
          <p>&copy; 2023 {data.personal_information[0].name.join(' ')}. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}
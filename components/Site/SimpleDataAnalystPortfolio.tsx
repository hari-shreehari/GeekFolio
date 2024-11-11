'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database, Mail, Linkedin, Github, MapPin, Briefcase, GraduationCap, Lightbulb, Award } from "lucide-react"
import { ReactNode } from 'react';

type PersonalInformation = {
  name: string;
  title: string;
  avatar: string;
  contact_information: {
    email: string;
    phone_number: string;
    address: string;
  };
  linkedin_profile: string;
  github_profile: string;
  objective_summary: {
    career_objective: string;
    professional_summary: string;
  };
};

type ResumeData = {
  personal_information: PersonalInformation;
  skills: {
    technical_skills: {
      skill: string;
      proficiency: number;
    }[];
    soft_skills: string[];
  };
  experience: {
    job_title: string;
    company_name: string;
    location: {
      city: string;
      state: string;
    };
    dates_of_employment: {
      start_date: string;
      end_date: string;
    };
    responsibilities_achievements: string[];
  }[];
  projects: {
    project_title: string;
    technologies_used: string[];
    duration: {
      start_date: string;
      end_date: string;
    };
    project_description: string;
  }[];
  education: {
    degree: string;
    major_field_of_study: string;
    university_institution_name: string;
    graduation_date: string;
    cgpa_grades: string;
  }[];
  certifications: {
    certification_title: string;
    issuing_organization: string;
    date_obtained: string;
  }[];
  achievements: string[];
  languages: {
    language_proficiency: string;
    level_of_proficiency: string;
  }[];
};

const mockData = {
  personal_information: {
    name: "AJAY B",
    title: "COMPETITIVE CODER",
    avatar: "/placeholder.svg?height=180&width=180",
    contact_information: {
      email: "ajaybalajiprasad002@gmail.com",
      phone_number: "+91 8122750426",
      address: ""
    },
    linkedin_profile: "",
    github_profile: "github.com/ajaybalajiprasad",
    objective_summary: {
      career_objective: "",
      professional_summary: "COMPETITIVE CODER"
    }
  },
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
      project_title: "Project Title",
      technologies_used: ["Tech1", "Tech2"],
      duration: {
        start_date: "Start Date",
        end_date: "End Date"
      },
      project_description: "Description of the project"
    }
  ],
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
  certifications: [
    {
      certification_title: "Certification Title",
      issuing_organization: "Issuing Organization",
      date_obtained: "Date Obtained"
    }
  ],
  achievements: [
    "Winner of Makeathon 2023 (Prize Worth 50,000)",
    "Solved over 330+ problems on LeetCode, With highest contest rating of 1791"
  ],
  languages: []
}

const AnimatedSection = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
)

const IconWrapper = ({ icon: Icon }: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }) => (
  <div className="bg-red-100 p-2 rounded-full">
    <Icon className="w-6 h-6 text-red-600" />
  </div>
)

export function ComprehensiveDataAnalystPortfolio({ data = mockData }: { data: ResumeData }) {
  const [activeTab, setActiveTab] = useState('about')
  return (
    <div className="min-h-screen bg-yellow-50">
      <header className="bg-yellow-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-red-900">{data.personal_information.name}</h1>
          <nav>
            {['about', 'experience', 'projects', 'education', 'achievements'].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "destructive" : "ghost"}
                onClick={() => setActiveTab(tab)}
                className="ml-4"
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <aside className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Avatar className="w-32 h-32 mb-4 border-4 border-red-200">
                    <AvatarImage src={data.personal_information.avatar} alt={data.personal_information.name} />
                    <AvatarFallback>{data.personal_information.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold text-center mb-1">{data.personal_information.name}</h2>
                  <p className="text-sm text-red-700 text-center mb-4">{data.personal_information.title}</p>
                  <div className="flex justify-center space-x-2 mb-6">
                    <Button variant="outline" size="icon" asChild>
                      <a href={`mailto:${data.personal_information.contact_information.email}`}><Mail size={18} /></a>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <a href={data.personal_information.linkedin_profile} target="_blank" rel="noopener noreferrer"><Linkedin size={18} /></a>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <a href={data.personal_information.github_profile} target="_blank" rel="noopener noreferrer"><Github size={18} /></a>
                    </Button>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-red-900">{data.personal_information.contact_information.address}</p>
                  <p className="text-sm text-red-800">{data.personal_information.contact_information.phone_number}</p>
                </div>
              </CardContent>
            </Card>
          </aside>

          <div className="lg:col-span-2 space-y-8">
            <AnimatedSection>
              {activeTab === 'about' && (
                <Card className="border-red-200">
                  <CardHeader>
                    <div className="flex items-center">
                      <IconWrapper icon={Lightbulb} />
                      <CardTitle className="ml-2">About</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold text-red-800 mb-2">Career Objective</h3>
                    <p className="text-red-800 mb-4">{data.personal_information.objective_summary.career_objective}</p>
                    <h3 className="font-semibold text-red-800 mb-2">Professional Summary</h3>
                    <p className="text-red-800">{data.personal_information.objective_summary.professional_summary}</p>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'experience' && (
                <Card className="border-red-200">
                  <CardHeader>
                    <div className="flex items-center">
                      <IconWrapper icon={Briefcase} />
                      <CardTitle className="ml-2">Experience</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {data.experience.map((job, index) => (
                      <div key={index} className="mb-6 last:mb-0">
                        <h3 className="font-semibold text-red-800">{job.job_title}</h3>
                        <p className="text-sm text-red-700">{job.company_name} - {job.location.city}, {job.location.state}</p>
                        <p className="text-sm text-red-600">{job.dates_of_employment.start_date} - {job.dates_of_employment.end_date}</p>
                        <ul className="list-disc list-inside text-red-800 mt-2">
                          {job.responsibilities_achievements.map((responsibility, idx) => (
                            <li key={idx}>{responsibility}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {activeTab === 'projects' && (
                <Card className="border-red-200">
                  <CardHeader>
                    <div className="flex items-center">
                      <IconWrapper icon={Database} />
                      <CardTitle className="ml-2">Projects</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {data.projects.map((project, index) => (
                      <div key={index} className="mb-6 last:mb-0">
                        <h3 className="font-semibold text-red-800">{project.project_title}</h3>
                        <p className="text-sm text-red-700">Technologies Used: {project.technologies_used.join(', ')}</p>
                        <p className="text-sm text-red-600">{project.duration.start_date} - {project.duration.end_date}</p>
                        <p className="text-red-800 mt-2">{project.project_description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {activeTab === 'education' && (
                <Card className="border-red-200">
                  <CardHeader>
                    <div className="flex items-center">
                      <IconWrapper icon={GraduationCap} />
                      <CardTitle className="ml-2">Education & Certifications</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="education" className="w-full">
                      <TabsList className="mb-4">
                        <TabsTrigger value="education">Education</TabsTrigger>
                        <TabsTrigger value="certifications">Certifications</TabsTrigger>
                      </TabsList>
                      <TabsContent value="education">
                        {data.education.map((edu, index) => (
                          <div key={index} className="mb-4 last:mb-0">
                            <h3 className="font-semibold text-red-800">{edu.degree} in {edu.major_field_of_study}</h3>
                            <p className="text-sm text-red-700">{edu.university_institution_name}</p>
                            <p className="text-sm text-red-600">{edu.graduation_date}</p>
                            <p className="text-sm text-red-700">CGPA: {edu.cgpa_grades}</p>
                          </div>
                        ))}
                      </TabsContent>
                      <TabsContent value="certifications">
                        {data.certifications.map((cert, index) => (
                          <div key={index} className="mb-4 last:mb-0">
                            <h3 className="font-semibold text-red-800">{cert.certification_title}</h3>
                            <p className="text-sm text-red-700">{cert.issuing_organization}</p>
                            <p className="text-sm text-red-600">{cert.date_obtained}</p>
                          </div>
                        ))}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'achievements' && (
                <Card className="border-red-200">
                  <CardHeader>
                    <div className="flex items-center">
                      <IconWrapper icon={Award} />
                      <CardTitle className="ml-2">Achievements</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside text-red-800">
                      {data.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </AnimatedSection>
          </div>
        </div>
      </main>
    </div>
  )
}

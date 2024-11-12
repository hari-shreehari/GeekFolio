import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Calendar, 
  MapPin, 
  Award, 
  Book, 
  Briefcase, 
  Globe, 
  Trophy, 
  Users, 
  Heart 
} from "lucide-react";
import { ResumeData } from "@/utils/types";

export function PortfolioComponent({ data }: { data: ResumeData }) {
  const [activeTab, setActiveTab] = useState<'about' | 'experience' | 'projects' | 'skills' | 'certifications' | 'achievements' | 'additional'>('about');

  const personalInfo = data.personal_information[0];
  const name = personalInfo.name[0];
  const email = personalInfo.contact_information[0].email[0];
  const address = personalInfo.contact_information[0].address[0];
  const phone = personalInfo.contact_information[0].phone_number[0];
  const linkedin = personalInfo.linkedin_profile[0];
  const github = personalInfo.github_profile[0];
  const careerObjective = personalInfo.objective_summary[0].career_objective[0];
  const professionalSummary = personalInfo.objective_summary[0].professional_summary[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
      <header className="sticky top-0 z-50 backdrop-blur-sm border-b">
        <nav className="max-w-7xl mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
            {name}
          </h1>
          <div className="space-x-2">
            <Button 
              variant={activeTab === 'about' ? "default" : "ghost"} 
              className="hover:bg-primary/10"
              onClick={() => setActiveTab('about')}
            >
              About
            </Button>
            <Button 
              variant={activeTab === 'experience' ? "default" : "ghost"} 
              className="hover:bg-primary/10"
              onClick={() => setActiveTab('experience')}
            >
              Experience
            </Button>
            <Button 
              variant={activeTab === 'projects' ? "default" : "ghost"} 
              className="hover:bg-primary/10"
              onClick={() => setActiveTab('projects')}
            >
              Projects
            </Button>
            <Button 
              variant={activeTab === 'skills' ? "default" : "ghost"} 
              className="hover:bg-primary/10"
              onClick={() => setActiveTab('skills')}
            >
              Skills
            </Button>
            <Button 
              variant={activeTab === 'certifications' ? "default" : "ghost"} 
              className="hover:bg-primary/10"
              onClick={() => setActiveTab('certifications')}
            >
              Certifications
            </Button>
            <Button 
              variant={activeTab === 'achievements' ? "default" : "ghost"} 
              className="hover:bg-primary/10"
              onClick={() => setActiveTab('achievements')}
            >
              Achievements
            </Button>
            <Button 
              variant={activeTab === 'additional' ? "default" : "ghost"} 
              className="hover:bg-primary/10"
              onClick={() => setActiveTab('additional')}
            >
              Additional Info
            </Button>
          </div>
        </nav>
      </header>

      <main className="relative">
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Avatar className="w-40 h-40 mx-auto mb-8 ring-4 ring-primary/20 ring-offset-4 ring-offset-background">
              <AvatarImage src="/placeholder.svg?height=160&width=160" alt={name} />
              <AvatarFallback className="text-3xl">{name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            
            <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
              {name}
            </h2>
            
            <p className="text-xl text-muted-foreground mb-4">
              {careerObjective}
            </p>
            
            <p className="text-lg text-muted-foreground mb-8">
              {professionalSummary}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button variant="outline" size="lg" className="group" asChild>
                <a href={github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" size="lg" className="group" asChild>
                <a href={linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" size="lg" className="group" asChild>
                <a href={`mailto:${email}`}>
                  <Mail className="mr-2 h-5 w-5 group-hover:translate-y-[-2px] transition-transform" />
                  Email
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" /> {address}
              </span>
              <span className="flex items-center">
                <Mail className="h-4 w-4 mr-1" /> {email}
              </span>
              <span className="flex items-center">
                <Globe className="h-4 w-4 mr-1" /> {phone}
              </span>
            </div>
          </div>
        </section>

        {/* Dynamic Content Sections */}
        {activeTab === 'about' && (
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-6">
              <h3 className="text-3xl font-bold mb-12 text-center">About Me</h3>
              <p className="text-lg text-muted-foreground text-center">
                {professionalSummary || "I'm a passionate full stack developer with experience in creating robust and scalable web applications."}
              </p>
            </div>
          </section>
        )}

        {activeTab === 'experience' && (
          <section className="py-16 bg-secondary/5">
            <div className="max-w-6xl mx-auto px-6">
              <h3 className="text-3xl font-bold mb-12 text-center">Experience</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {data.experience.map((exp, index) => (
                  <Card key={index} className="mb-4 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{exp.job_title[0]}</CardTitle>
                      <CardDescription>
                        {exp.company_name[0]} • {exp.location.city[0]}, {exp.location.state[0]}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        <Calendar className="inline mr-2 h-4 w-4" />
                        {exp.dates_of_employment.start_date[0]} - {exp.dates_of_employment.end_date[0]}
                      </p>
                      <ul className="list-disc list-inside text-sm">
                        {exp.responsibilities_achievements.map((responsibility, idx) => (
                          <li key={idx} className="mb-1">{responsibility}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'projects' && (
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-6">
              <h3 className="text-3xl font-bold mb-12 text-center">Featured Projects</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.projects.map((project, index) => (
                  <Card key={index} className="hover:shadow-xl transition-all hover:-translate-y-1">
                    <CardHeader>
                      <CardTitle className="text-xl">{project.project_title[0]}</CardTitle>
                      <CardDescription>{project.project_description[0]}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        <Calendar className="inline mr-2 h-4 w-4" />
                        {project.duration.start_date[0]} - {project.duration.end_date[0]}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies_used.map((tech, idx) => (
                          <Badge key={idx} variant="secondary" className="hover:bg-primary/20">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      {project.project_links[0] && (
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <a href={project.project_links[0]} target="_blank" rel="noopener noreferrer">
                            View Project
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'skills' && (
          <section className="py-16 bg-secondary/5">
            <div className="max-w-4xl mx-auto px-6">
              <h3 className="text-3xl font-bold mb-12 text-center">Skills & Expertise</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold mb-4">Technical Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.technical_skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="px-4 py-2 text-sm hover:bg-primary/20">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-4">Soft Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.soft_skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="px-4 py-2 text-sm hover:bg-primary/20">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'certifications' && (
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-6">
              <h3 className="text-3xl font-bold mb-12 text-center">Certifications</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {data.certifications.map((cert, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Award className="mr-2 h-5 w-5" />
                        {cert.certification_title[0]}
                      </CardTitle>
                      <CardDescription>{cert.issuing_organization[0]}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        <Calendar className="inline mr-2 h-4 w-4" />
                        {cert.date_obtained[0]}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'achievements' && (
          <section className="py-16 bg-secondary/5">
            <div className="max-w-4xl mx-auto px-6">
              <h3 className="text-3xl font-bold mb-12 text-center">Achievements</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Trophy className="mr-2 h-5 w-5" />
                      Awards & Honors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside text-sm">
                      {data.achievements.awards_honors.map((award, index) => (
                        <li key={index} className="mb-2">{award}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Award className="mr-2 h-5 w-5" />
                      Scholarships
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside text-sm">
                      {data.achievements.scholarships.map((scholarship, index) => (
                        <li key={index} className="mb-2">{scholarship}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Trophy className="mr-2 h-5 w-5" />
                      Competitions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside text-sm">
                      {data.achievements.competitions.map((competition, index) => (
                        <li key={index} className="mb-2">{competition}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'additional' && (
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-6">
              <h3 className="text-3xl font-bold mb-12 text-center">Additional Information</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Extracurricular Activities */}
                <div>
                  <h4 className="text-xl font-semibold mb-6 flex items-center">
                    <Users className="mr-2" /> Extracurricular Activities
                  </h4>
                  <ul className="list-disc list-inside text-sm">
                    {data.extracurricular_activities.clubs_organizations.map((activity, index) => (
                      <li key={index} className="mb-2">{activity}</li>
                    ))}
                  </ul>
                </div>

                {/* Languages */}
                <div>
                  <h4 className="text-xl font-semibold mb-6 flex items-center">
                    <Heart className="mr-2" /> Languages
                  </h4>
                  <ul className="list-disc list-inside text-sm">
                    {data.languages.map((lang, index) => (
                      <li key={index} className="mb-2">
                        {lang.language_proficiency[0]} - {lang.level_of_proficiency[0]}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="text-center p-6 text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} {name}. All rights reserved.</p>
      </footer>
    </div>
  )
}
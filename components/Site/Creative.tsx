"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Database,
  Mail,
  Linkedin,
  Github,
  Lightbulb,
  Award,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { ReactNode } from "react";
import { ResumeData } from "@/utils/types";

const AnimatedSection = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

const IconWrapper = ({
  icon: Icon,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) => (
  <div className="bg-red-100 p-2 rounded-full">
    <Icon className="w-6 h-6 text-red-600" />
  </div>
);

export function ComprehensiveDataAnalystPortfolio({
  data,
}: {
  data: ResumeData;
}) {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="min-h-screen bg-yellow-50">
      <header className="bg-yellow-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-red-900">
            {data.personal_information.name[0]}
          </h1>
          <nav>
            {[
              "about",
              "experience",
              "projects",
              "education",
              "achievements",
            ].map((tab) => (
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
                    <AvatarImage
                      src={
                        data.personal_information.name[0][0] ||
                        "/placeholder.svg"
                      }
                      alt={data.personal_information.name[0]}
                    />
                    <AvatarFallback>
                      {data.personal_information.name[0].charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold text-center mb-1">
                    {data.personal_information.name[0]}
                  </h2>
                  <p className="text-sm text-red-700 text-center mb-4">
                    {data.objective_summary[0].professional_summary[0] ||
                      data.objective_summary[0].career_objective[0]}
                  </p>
                  <div className="flex justify-center space-x-2 mb-6">
                    <Button variant="outline" size="icon" asChild>
                      <a
                        href={`mailto:${data.personal_information.contact_information.email[0]}`}
                      >
                        <Mail size={18} />
                      </a>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <a
                        href={data.personal_information.linkedin_profile[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin size={18} />
                      </a>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <a
                        href={data.personal_information.github_profile[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github size={18} />
                      </a>
                    </Button>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-red-900">
                    {data.personal_information.contact_information.address[0]}
                  </p>
                  <p className="text-sm text-red-800">
                    {
                      data.personal_information.contact_information
                        .phone_number[0]
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </aside>

          <div className="lg:col-span-2 space-y-8">
            <AnimatedSection>
              {activeTab === "about" && (
                <Card className="border-red-200">
                  <CardHeader>
                    <div className="flex items-center">
                      <IconWrapper icon={Lightbulb} />
                      <CardTitle className="ml-2">About</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold text-red-800 mb-2">
                      Career Objective
                    </h3>
                    <p className="text-red-800 mb-4">
                      {data.objective_summary[0].career_objective[0]}
                    </p>
                    <h3 className="font-semibold text-red-800 mb-2">
                      Professional Summary
                    </h3>
                    <p className="text-red-800">
                      {data.objective_summary[0].professional_summary[0]}
                    </p>
                  </CardContent>
                </Card>
              )}

              {activeTab === "experience" && (
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
                        <h3 className="font-semibold text-red-800">
                          {job.job_title[0]}
                        </h3>
                        <p className="text-sm text-red-700">
                          {job.company_name[0]} -{" "}
                          {typeof job.location === "string"
                            ? job.location
                            : `${(job.location as any).city}, ${(job.location as any).state}`}
                        </p>
                        <p className="text-sm text-red-600">
                          {job.dates_of_employment.start_date[0]} -{" "}
                          {job.dates_of_employment.end_date[0]}
                        </p>
                        <ul className="list-disc list-inside text-red-800 mt-2">
                          {job.responsibilities_achievements.map(
                            (responsibility, idx) => (
                              <li key={idx}>{responsibility}</li>
                            ),
                          )}
                        </ul>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {activeTab === "projects" && (
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
                        <h3 className="font-semibold text-red-800">
                          {project.project_title[0]}
                        </h3>
                        <p className="text-sm text-red-700">
                          Technologies Used:{" "}
                          {Array.isArray(project.technologies_used)
                            ? project.technologies_used.join(", ")
                            : project.technologies_used}
                        </p>
                        <p className="text-sm text-red-600">
                          {project.duration.start_date[0]} -{" "}
                          {project.duration.end_date[0]}
                        </p>
                        <p className="text-red-800 mt-2">
                          {Array.isArray(project.project_description)
                            ? project.project_description[0]
                            : project.project_description}
                        </p>
                        {project.project_links &&
                          project.project_links.length > 0 && (
                            <a
                              href={project.project_links[0]}
                              className="text-red-600 hover:text-red-800 mt-2 inline-block"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Project
                            </a>
                          )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {activeTab === "education" && (
                <Card className="border-red-200">
                  <CardHeader>
                    <div className="flex items-center">
                      <IconWrapper icon={GraduationCap} />
                      <CardTitle className="ml-2">
                        Education & Certifications
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="education" className="w-full">
                      <TabsList className="mb-4">
                        <TabsTrigger value="education">Education</TabsTrigger>
                        <TabsTrigger value="certifications">
                          Certifications
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="education">
                        {data.education.map((edu, index) => (
                          <div key={index} className="mb-4 last:mb-0">
                            <h3 className="font-semibold text-red-800">
                              {edu.degree[0]} in {edu.major_field_of_study[0]}
                            </h3>
                            <p className="text-sm text-red-700">
                              {edu.university_institution_name[0]}
                            </p>
                            <p className="text-sm text-red-600">
                              {edu.graduation_date[0]}
                            </p>
                            <p className="text-sm text-red-700">
                              CGPA: {edu.cgpa_grades[0]}
                            </p>
                          </div>
                        ))}
                      </TabsContent>
                      <TabsContent value="certifications">
                        {data.certifications.map((cert, index) => (
                          <div key={index} className="mb-4 last:mb-0">
                            <h3 className="font-semibold text-red-800">
                              {cert.certification_title[0]}
                            </h3>
                            <p className="text-sm text-red-700">
                              {cert.issuing_organization[0]}
                            </p>
                            <p className="text-sm text-red-600">
                              {cert.date_obtained[0]}
                            </p>
                          </div>
                        ))}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              )}

              {activeTab === "achievements" && (
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
                        <li key={index}>
                          {achievement.awards_honors.join(", ")}
                        </li>
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
  );
}


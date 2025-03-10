"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Linkedin,
  Mail,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  BarChart,
  PieChart,
  TrendingUp,
} from "lucide-react";
import { ReactNode } from "react";
import { ResumeData } from "@/utils/types";

const AnimatedSection = ({ children }: { children: ReactNode }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

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
  );
};

const PortfolioSection = ({
  projects,
}: {
  projects: ResumeData["projects"];
}) => (
  <AnimatedSection>
    <section className="mb-16">
      <h3 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
        <PieChart className="mr-2" />
        Portfolio Projects
      </h3>
      {projects.map((project, index) => (
        <Card key={index} className="mb-6">
          <CardHeader>
            <CardTitle>{project.project_title[0]}</CardTitle>
            <CardDescription>
              {Array.isArray(project.technologies_used)
                ? project.technologies_used.join(", ")
                : project.technologies_used}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-2">
              {project.duration.start_date[0]} - {project.duration.end_date[0]}
            </p>
            <p className="text-gray-700">
              {Array.isArray(project.project_description)
                ? project.project_description[0]
                : project.project_description}
            </p>
            {project.project_links && project.project_links.length > 0 && (
              <a
                href={project.project_links[0]}
                className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
              >
                View Project
              </a>
            )}
          </CardContent>
        </Card>
      ))}
    </section>
  </AnimatedSection>
);

export function BusinessPortfolioComponent({ data }: { data: ResumeData }) {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const [activeTab, setActiveTab] = useState<
    "about" | "experience" | "education" | "portfolio" | "skills" | "contact"
  >("about");

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <motion.div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: backgroundY,
          opacity: 0.05,
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
                {data.personal_information.name[0]}
              </motion.h1>
              <motion.div
                className="space-x-4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button
                  variant={activeTab === "about" ? "default" : "ghost"}
                  onClick={() => setActiveTab("about")}
                >
                  About
                </Button>
                <Button
                  variant={activeTab === "experience" ? "default" : "ghost"}
                  onClick={() => setActiveTab("experience")}
                >
                  Experience
                </Button>
                <Button
                  variant={activeTab === "education" ? "default" : "ghost"}
                  onClick={() => setActiveTab("education")}
                >
                  Education
                </Button>
                <Button
                  variant={activeTab === "portfolio" ? "default" : "ghost"}
                  onClick={() => setActiveTab("portfolio")}
                >
                  Portfolio
                </Button>
                <Button
                  variant={activeTab === "skills" ? "default" : "ghost"}
                  onClick={() => setActiveTab("skills")}
                >
                  Skills
                </Button>
                <Button
                  variant={activeTab === "contact" ? "default" : "ghost"}
                  onClick={() => setActiveTab("contact")}
                >
                  Contact
                </Button>
              </motion.div>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-6 py-12 max-w-5xl">
          {activeTab === "about" && (
            <AnimatedSection>
              <section className="text-center mb-16">
                <Avatar className="w-40 h-40 mx-auto mb-6 border-4 border-white shadow-lg">
                  <AvatarImage
                    src={"/placeholder.svg"}
                    alt={data.personal_information.name[0]}
                  />
                  <AvatarFallback>
                    {data.personal_information.name[0]
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-4xl font-bold mb-2 text-gray-800">
                  {data.personal_information.name[0]}
                </h2>
                <p className="text-xl text-gray-600 mb-4">
                  {data.objective_summary[0].professional_summary[0] ||
                    data.objective_summary[0].career_objective[0]}
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  {data.objective_summary[0].career_objective[0]}
                </p>
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" size="icon" asChild>
                    <a
                      href={`mailto:${data.personal_information.contact_information.email[0]}`}
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a
                      href={data.personal_information.linkedin_profile[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </section>
            </AnimatedSection>
          )}

          {activeTab === "experience" && (
            <AnimatedSection>
              <section className="mb-16">
                <h3 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
                  <Briefcase className="mr-2" />
                  Work Experience
                </h3>
                {data.experience.map((exp, index) => (
                  <Card key={index} className="mb-6">
                    <CardHeader>
                      <CardTitle>{exp.job_title[0]}</CardTitle>
                      <CardDescription>
                        {exp.company_name[0]} |{" "}
                        {typeof exp.location === "string"
                          ? exp.location
                          : `${(exp.location as any).city}, ${(exp.location as any).state}`}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-2">
                        {exp.dates_of_employment.start_date[0]} -{" "}
                        {exp.dates_of_employment.end_date[0]}
                      </p>
                      <ul className="list-disc list-inside">
                        {exp.responsibilities_achievements.map((item, i) => (
                          <li key={i} className="text-gray-700">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </section>
            </AnimatedSection>
          )}

          {activeTab === "education" && (
            <AnimatedSection>
              <section className="mb-16">
                <h3 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
                  <GraduationCap className="mr-2" />
                  Education
                </h3>
                {data.education.map((edu, index) => (
                  <Card key={index} className="mb-6">
                    <CardHeader>
                      <CardTitle>
                        {edu.degree[0]} in {edu.major_field_of_study[0]}
                      </CardTitle>
                      <CardDescription>
                        {edu.university_institution_name[0]}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">
                        Graduated: {edu.graduation_date[0]}
                      </p>
                      {edu.cgpa_grades && edu.cgpa_grades.length > 0 && (
                        <Progress
                          value={parseFloat(edu.cgpa_grades[0]) * 10}
                          max={100}
                          className="my-2"
                        />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </section>
            </AnimatedSection>
          )}

          {activeTab === "portfolio" && (
            <PortfolioSection projects={data.projects} />
          )}

          {activeTab === "skills" && (
            <AnimatedSection>
              <section className="mb-16">
                <h3 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
                  <BarChart className="mr-2" />
                  Skills & Expertise
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold mb-4">
                      Technical Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.technical_skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="px-4 py-2 text-sm hover:bg-blue-200"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-4">Soft Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.soft_skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="px-4 py-2 text-sm hover:bg-blue-200"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </AnimatedSection>
          )}

          {activeTab === "contact" && (
            <AnimatedSection>
              <section className="mb-16">
                <h3 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
                  <Globe className="mr-2" />
                  Contact Information
                </h3>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-gray-700">
                      Email:{" "}
                      <a
                        href={`mailto:${data.personal_information.contact_information.email[0]}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {data.personal_information.contact_information.email[0]}
                      </a>
                    </p>
                    <p className="text-gray-700 mt-2">
                      LinkedIn:{" "}
                      <a
                        href={data.personal_information.linkedin_profile[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View Profile
                      </a>
                    </p>
                    <p className="text-gray-700 mt-2">
                      Phone:{" "}
                      {
                        data.personal_information.contact_information
                          .phone_number[0]
                      }
                    </p>
                    <p className="text-gray-700 mt-2">
                      Address:{" "}
                      {data.personal_information.contact_information.address[0]}
                    </p>
                  </CardContent>
                </Card>
              </section>
            </AnimatedSection>
          )}
        </main>
      </div>
    </div>
  );
}


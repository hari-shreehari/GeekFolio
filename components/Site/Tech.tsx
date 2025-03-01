"use client";

import React, { useState, useRef, ReactNode } from "react";
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
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Calendar,
  Briefcase,
  Code,
  Globe,
} from "lucide-react";
import { ResumeData } from "@/utils/types";

const AnimatedSection: React.FC<{ children: ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
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

interface PortfolioProps {
  data: ResumeData;
}

export function TechInnovatorPortfolioComponent({ data }: PortfolioProps) {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const [activeTab, setActiveTab] = useState<
    "about" | "experience" | "projects" | "contact"
  >("about");

  const personalInfo = data.personal_information;
  const { name, github_profile, linkedin_profile, contact_information } =
    personalInfo;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 text-gray-900 overflow-hidden">
      <motion.div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: backgroundY,
          opacity: 0.1,
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
              {name.join(" ")}
            </motion.h1>
            <motion.div
              className="space-x-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {(["about", "experience", "projects", "contact"] as const).map(
                (tab) => (
                  <Button
                    key={tab}
                    variant={activeTab === tab ? "default" : "ghost"}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </Button>
                ),
              )}
            </motion.div>
          </nav>
        </header>

        <main className="container mx-auto px-6 py-12 max-w-5xl">
          {activeTab === "about" && (
            <AnimatedSection>
              <section className="text-center mb-16">
                <Avatar className="w-40 h-40 mx-auto mb-6 border-4 border-white shadow-lg">
                  <AvatarImage
                    src="/placeholder.svg"
                    alt={name[0] || "Avatar"}
                  />
                  <AvatarFallback>
                    {name.map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-4xl font-bold mb-4 text-gray-800">
                  {name.join(" ")}
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  {data.objective_summary[0]?.professional_summary?.[0] ||
                    data.objective_summary[0]?.career_objective?.[0]}
                </p>
                <div className="flex justify-center space-x-4">
                  {github_profile?.[0] && (
                    <Button variant="outline" size="icon" asChild>
                      <a
                        href={github_profile[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    </Button>
                  )}
                  {linkedin_profile?.[0] && (
                    <Button variant="outline" size="icon" asChild>
                      <a
                        href={linkedin_profile[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </Button>
                  )}
                  {contact_information.email?.[0] && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={`mailto:${contact_information.email[0]}`}>
                        <Mail className="h-5 w-5" />
                      </a>
                    </Button>
                  )}
                </div>
              </section>
            </AnimatedSection>
          )}

          {activeTab === "experience" && (
            <AnimatedSection>
              <section className="mb-16">
                <h3 className="text-3xl font-semibold mb-6 flex items-center text-gray-800">
                  <Briefcase className="mr-2" />
                  Work Experience
                </h3>
                {data.experience.map((exp, index) => (
                  <Card key={index} className="mb-6">
                    <CardHeader>
                      <CardTitle>{exp.job_title.join(", ")}</CardTitle>
                      <CardDescription>
                        {exp.company_name.join(", ")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        <MapPin className="inline mr-2" />
                        {exp.location?.join(", ")}
                      </p>
                      <p>
                        <Calendar className="inline mr-2" />
                        {exp.dates_of_employment.start_date.join(", ")} -{" "}
                        {exp.dates_of_employment.end_date.join(", ")}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </section>
            </AnimatedSection>
          )}

          {activeTab === "projects" && (
            <AnimatedSection>
              <section className="mb-16">
                <h3 className="text-3xl font-semibold mb-6 flex items-center text-gray-800">
                  <Code className="mr-2" />
                  Projects
                </h3>
                {data.projects.map((project, index) => (
                  <Card key={index} className="mb-4">
                    <CardHeader>
                      <CardTitle>{project.project_title.join(", ")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{project.project_description.join(", ")}</p>
                    </CardContent>
                  </Card>
                ))}
              </section>
            </AnimatedSection>
          )}
        </main>
      </div>
    </div>
  );
}


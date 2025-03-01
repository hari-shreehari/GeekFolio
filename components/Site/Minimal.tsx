import React, { useState } from "react";
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
import {
  Github,
  Linkedin,
  Mail,
  Calendar,
  MapPin,
  Award,
  Trophy,
  Users,
  Heart,
} from "lucide-react";
import { ResumeData } from "@/utils/types";

type TabType =
  | "about"
  | "experience"
  | "projects"
  | "skills"
  | "certifications"
  | "achievements"
  | "additional";

export function PortfolioComponent({ data }: { data: ResumeData }) {
  const [activeTab, setActiveTab] = useState<TabType>("about");

  const personalInfo = data.personal_information;
  const name = personalInfo.name?.[0] || "Anonymous";
  const email = personalInfo.contact_information?.email?.[0] || "N/A";
  const address = personalInfo.contact_information?.address?.[0] || "N/A";
  const phone = personalInfo.contact_information?.phone_number?.[0] || "N/A";
  const linkedin = personalInfo.linkedin_profile?.[0] || "#";
  const github = personalInfo.github_profile?.[0] || "#";
  const careerObjective =
    data.objective_summary?.[0]?.career_objective?.[0] ||
    "No objective provided.";
  const professionalSummary =
    data.objective_summary?.[0]?.professional_summary?.[0] ||
    "No summary available.";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <header className="sticky top-0 z-50 backdrop-blur-sm border-b">
        <nav className="max-w-7xl mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
            {name}
          </h1>
          <div className="space-x-2">
            {(
              [
                "about",
                "experience",
                "projects",
                "skills",
                "certifications",
                "achievements",
                "additional",
              ] as TabType[]
            ).map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "ghost"}
                className="hover:bg-primary/10"
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Button>
            ))}
          </div>
        </nav>
      </header>

      <main className="relative py-20 px-6 text-center">
        <Avatar className="w-40 h-40 mx-auto mb-8 ring-4 ring-primary/20 ring-offset-4">
          <AvatarImage src="/placeholder.svg?height=160&width=160" alt={name} />
          <AvatarFallback className="text-3xl">
            {name.substring(0, 2)}
          </AvatarFallback>
        </Avatar>

        <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
          {name}
        </h2>
        <p className="text-xl text-muted-foreground mb-4">{careerObjective}</p>
        <p className="text-lg text-muted-foreground mb-8">
          {professionalSummary}
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {github !== "#" && (
            <Button variant="outline" size="lg" asChild>
              <a href={github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" /> GitHub
              </a>
            </Button>
          )}
          {linkedin !== "#" && (
            <Button variant="outline" size="lg" asChild>
              <a href={linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-5 w-5" /> LinkedIn
              </a>
            </Button>
          )}
          <Button variant="outline" size="lg" asChild>
            <a href={`mailto:${email}`}>
              <Mail className="mr-2 h-5 w-5" /> Email
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
            <Heart className="h-4 w-4 mr-1" /> {phone}
          </span>
        </div>
      </main>

      <footer className="text-center p-6 text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} {name}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

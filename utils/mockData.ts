// /utils/mockData.ts

import { ResumeData } from "./types";

let s: ResumeData;

export const mockData: ResumeData = {
  personal_information: {
    name: ["Jan Doe"],
    contact_information: {
      phone_number: ["+1 555-123-4567"],
      email: ["jandoe@example.com"],
      address: ["123 Main Street, Anytown, USA"],
    },
    linkedin_profile: ["https://linkedin.com/in/jandoe"],
    github_profile: ["https://github.com/jandoe"],
  },
  objective_summary: [
    {
      career_objective: [
        "To secure a challenging position in a reputable organization to expand my learnings, knowledge, and skills.",
      ],
      professional_summary: [
        "Dedicated software developer with 3 years of experience in building scalable web applications.",
      ],
    },
  ],

  education: [
    {
      degree: ["Bachelor of Science in Computer Science"],
      major_field_of_study: ["Computer Science"],
      university_institution_name: ["State University"],
      graduation_date: ["2023"],
      cgpa_grades: ["3.8"],
    },
    {
      degree: ["High School Diploma"],
      major_field_of_study: ["General Education"],
      university_institution_name: ["Central High School"],
      graduation_date: ["2019"],
      cgpa_grades: ["N/A"],
    },
  ],
  experience: [
    {
      job_title: ["Software Engineer"],
      company_name: ["Tech Solutions Inc."],
      location: ["San Francisco"],
      dates_of_employment: {
        start_date: ["June 2023"],
        end_date: ["Present"],
      },
      responsibilities_achievements: [
        "Developed and maintained web applications using React and Node.js",
        "Collaborated with cross-functional teams to define project requirements",
        "Implemented RESTful APIs to enhance application functionality",
        "Optimized application performance, reducing load times by 30%",
      ],
    },
    {
      job_title: ["Intern Developer"],
      company_name: ["Innovatech"],
      location: ["New York"],
      dates_of_employment: {
        start_date: ["June 2022"],
        end_date: ["August 2022"],
      },
      responsibilities_achievements: [
        "Assisted in developing front-end features using Angular",
        "Conducted testing and debugging of applications",
        "Participated in code reviews and team meetings",
      ],
    },
  ],
  projects: [
    {
      project_title: ["Personal Portfolio Website"],
      technologies_used: ["React", "TypeScript", "CSS"],
      project_description: [
        "A personal website to showcase projects, blogs, and resume.",
      ],
      duration: {
        start_date: ["January 2023"],
        end_date: ["February 2023"],
      },
      project_links: ["https://jandoe.com"],
    },
  ],
  certifications: [
    {
      certification_title: ["Certified JavaScript Developer"],
      issuing_organization: ["Tech Certification Board"],
      date_obtained: ["March 2023"],
    },
  ],
  skills: {
    technical_skills: [
      "JavaScript: Node, React, Express",
      "TypeScript",
      "Python: Django",
      "PostgreSQL",
      "Git",
      "AWS",
      "Docker",
      "Linux",
    ],
    soft_skills: [
      "Problem-solving",
      "Team Collaboration",
      "Effective Communication",
      "Time Management",
    ],
  },
  achievements: [
    {
      awards_honors: ["Employee of the Month, Tech Solutions Inc., July 2023"],
      scholarships: ["Dean's List Scholarship, State University"],
      competitions: ["1st Place in Hackathon 2022"],
    },
  ],
  extracurricular_activities: [
    {
      clubs_organizations: [
        "Computer Science Club",
        "Volunteer Coding Instructor",
      ],
      volunteer_work: ["Teaching coding to underprivileged youth"],
      leadership_roles: ["President, Computer Science Club"],
    },
  ],
  languages: [
    {
      language_proficiency: ["English"],
      level_of_proficiency: ["Native"],
    },
    {
      language_proficiency: ["Spanish"],
      level_of_proficiency: ["Intermediate"],
    },
  ],
};

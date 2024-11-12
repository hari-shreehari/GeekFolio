// /utils/mockData.ts

import { ResumeData } from './types';

export const mockData: ResumeData = {
    personal_information: {
        name: "John Doe",
        title: "Full Stack Developer",
        avatar: "/placeholder-avatar.jpg",
        contact_information: {
            email: "john.doe@example.com",
            phone_number: "+1 (555) 123-4567",
            address: "San Francisco, CA"
        },
        linkedin_profile: "https://linkedin.com/in/johndoe",
        github_profile: "https://github.com/johndoe",
        objective_summary: {
            career_objective: "Seeking to leverage my technical expertise in a challenging role",
            professional_summary: "Experienced full-stack developer with 5+ years of experience in building scalable web applications"
        }
    },
    education: [
        {
            degree: "Master of Science",
            major_field_of_study: "Computer Science",
            university_institution_name: "Stanford University",
            graduation_date: "2020",
            cgpa_grades: "3.8/4.0"
        },
        {
            degree: "Bachelor of Engineering",
            major_field_of_study: "Software Engineering",
            university_institution_name: "University of California",
            graduation_date: "2018",
            cgpa_grades: "3.9/4.0"
        }
    ],
    experience: [
        {
            job_title: "Senior Software Engineer",
            company_name: "Tech Corp",
            location: {
                city: "San Francisco",
                state: "CA"
            },
            dates_of_employment: {
                start_date: "2020",
                end_date: "Present"
            },
            responsibilities_achievements: [
                "Led development of microservices architecture",
                "Improved system performance by 40%",
                "Mentored junior developers",
                "Implemented CI/CD pipeline"
            ]
        },
        {
            job_title: "Software Engineer",
            company_name: "StartUp Inc",
            location: {
                city: "San Jose",
                state: "CA"
            },
            dates_of_employment: {
                start_date: "2018",
                end_date: "2020"
            },
            responsibilities_achievements: [
                "Developed full-stack web applications",
                "Implemented RESTful APIs",
                "Reduced loading time by 50%",
                "Collaborated with cross-functional teams"
            ]
        }
    ],
    projects: [
        {
            project_title: "E-commerce Platform",
            technologies_used: ["React", "Node.js", "MongoDB", "AWS"],
            project_description: "Built a scalable e-commerce platform with modern technologies",
            duration: {
                start_date: "2021",
                end_date: "2022"
            },
            project_links: "https://github.com/johndoe/ecommerce"
        },
        {
            project_title: "AI Chat Application",
            technologies_used: ["Python", "TensorFlow", "Flask", "React"],
            project_description: "Developed an AI-powered chat application with natural language processing",
            duration: {
                start_date: "2020",
                end_date: "2021"
            },
            project_links: "https://github.com/johndoe/ai-chat"
        }
    ],
    certifications: [
        {
            certification_title: "AWS Certified Solutions Architect",
            issuing_organization: "Amazon Web Services",
            date_obtained: "2021"
        },
        {
            certification_title: "Google Cloud Professional Developer",
            issuing_organization: "Google",
            date_obtained: "2020"
        }
    ],
    skills: {
        technical_skills: [
            "JavaScript",
            "TypeScript",
            "React",
            "Node.js",
            "Python",
            "AWS",
            "Docker",
            "Kubernetes",
            "MongoDB",
            "PostgreSQL",
            "GraphQL",
            "REST APIs"
        ],
        soft_skills: [
            "Leadership",
            "Problem Solving",
            "Communication",
            "Team Collaboration",
            "Project Management",
            "Agile Methodologies"
        ]
    },
    achievements: {
        awards_honors: [
            "Employee of the Year 2022",
            "Best Innovation Award 2021"
        ],
        scholarships: [
            "Merit Scholarship 2018-2020",
            "Academic Excellence Award"
        ],
        competitions: [
            "First Place in Hackathon 2021",
            "Winner of Code Challenge 2020"
        ]
    },
    extracurricular_activities: {
        clubs_organizations: [
            "Tech Meetup Organizer",
            "Open Source Contributor"
        ],
        volunteer_work: [
            "Code Mentor for underprivileged students",
            "Tech Workshop Instructor"
        ],
        leadership_roles: [
            "Team Lead - Open Source Project",
            "Technical Community Leader"
        ]
    },
    languages: [
        {
            language_proficiency: "English",
            level_of_proficiency: "Native"
        },
        {
            language_proficiency: "Spanish",
            level_of_proficiency: "Intermediate"
        },
        {
            language_proficiency: "Mandarin",
            level_of_proficiency: "Basic"
        }
    ]
};
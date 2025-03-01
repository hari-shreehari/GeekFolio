export interface ResumeData {
  personal_information: PersonalInformation;
  objective_summary: ObjectiveSummary[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  skills: Skills;
  achievements: Achievement[];
  extracurricular_activities: ExtracurricularActivity[];
  languages: Language[];
}

export interface PersonalInformation {
  name: string[];
  contact_information: ContactInformation;
  linkedin_profile: string[];
  github_profile: string[];
}

export interface ContactInformation {
  phone_number: string[];
  email: string[];
  address: string[];
}

export interface ObjectiveSummary {
  career_objective: string[];
  professional_summary: string[];
}

export interface Education {
  degree: string[];
  major_field_of_study: string[];
  university_institution_name: string[];
  graduation_date: string[];
  cgpa_grades: string[];
}

export interface Experience {
  job_title: string[];
  company_name: string[];
  location: string[];
  dates_of_employment: DatesOfEmployment;
  responsibilities_achievements: string[];
}

export interface DatesOfEmployment {
  start_date: string[];
  end_date: string[];
}

export interface Project {
  project_title: string[];
  technologies_used: string[];
  project_description: string[];
  duration: Duration;
  project_links: string[];
}

export interface Duration {
  start_date: string[];
  end_date: string[];
}

export interface Certification {
  certification_title: string[];
  issuing_organization: string[];
  date_obtained: string[];
}

export interface Skills {
  technical_skills: string[];
  soft_skills: string[];
}

export interface Achievement {
  awards_honors: string[];
  scholarships: string[];
  competitions: string[];
}

export interface ExtracurricularActivity {
  clubs_organizations: string[];
  volunteer_work: string[];
  leadership_roles: string[];
}

export interface Language {
  language_proficiency: string[];
  level_of_proficiency: string[];
}


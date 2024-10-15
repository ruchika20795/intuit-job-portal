export type Job = {
  id: number;
  title: string;
  description: string;
  requirements: string;
  tags: string[];
  companyName: string;
  contactInfo: string;
  createdAt: string;
  createdBy: string;
  applications: Application[];
};

export type Application = {
  id: number;
  name: string;
  email: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  skills: string[];
  github: string;
  projects: Project[];
};

export type Project = {
  name: string;
  url: string;
};

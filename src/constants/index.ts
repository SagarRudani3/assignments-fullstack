import { ExperienceLevel } from "../types";

export const EXPERIENCE_LEVELS: { value: ExperienceLevel; label: string }[] = [
  { value: 'junior', label: 'Junior (0-2 years)' },
  { value: 'mid-level', label: 'Mid-level (2-5 years)' },
  { value: 'senior', label: 'Senior (5-8 years)' },
  { value: 'lead', label: 'Lead (8+ years)' },
];

export const SKILL_CATEGORIES = [
  'Frontend Development',
  'Backend Development',
  'DevOps',
  'Cloud Architecture',
  'Database Management',
  'Mobile Development',
  'Machine Learning',
  'Data Science',
  'System Design',
  'Security',
  'UI/UX Design',
  'Quality Assurance',
];

export const QUESTION_COUNTS = [3, 5, 7, 10, 15, 20];

export const DEFAULT_JOB_REQUIREMENTS = {
  title: '',
  description: '',
  skills: [],
  experienceLevel: 'mid-level' as ExperienceLevel,
  numberOfQuestions: 5,
};

export const API_PROVIDERS = [
  { id: 'chatgpt', name: 'ChatGPT' },
  { id: 'deepseek', name: 'DeepSeek' },
];
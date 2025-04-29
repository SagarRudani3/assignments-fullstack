export type ExperienceLevel = 'junior' | 'mid-level' | 'senior' | 'lead';

export interface JobRequirements {
  title: string;
  description: string;
  skills: string[];
  experienceLevel: ExperienceLevel;
  numberOfQuestions: number;
}

export interface EvaluationCriteria {
  correct: string;
  partial: string;
  incorrect: string;
}

export interface Question {
  id: string;
  text: string;
  difficulty: string;
  category: string;
  evaluationCriteria: EvaluationCriteria;
}

export interface ApiSettings {
  provider: 'chatgpt' | 'deepseek';
  apiKey: string;
}

export interface GeneratorState {
  isGenerating: boolean;
  error: string | null;
  questions: Question[];
}
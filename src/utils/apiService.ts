import { ApiSettings, JobRequirements, Question } from '../types';

const generateMockQuestions = (requirements: JobRequirements): Question[] => {
  const { numberOfQuestions, experienceLevel, skills } = requirements;
  const difficultyMap = {
    'junior': 'Basic',
    'mid-level': 'Intermediate',
    'senior': 'Advanced',
    'lead': 'Expert'
  };
  
  return Array.from({ length: numberOfQuestions }, (_, i) => {
    const categoryIndex = i % skills.length;
    const category = skills[categoryIndex] || 'General';
    
    return {
      id: `q-${i + 1}`,
      text: `${difficultyMap[experienceLevel]} question about ${category}: Explain how you would implement a ${category} system for a high-traffic application?`,
      difficulty: difficultyMap[experienceLevel],
      category,
      evaluationCriteria: {
        correct: 'Candidate demonstrates thorough understanding of the concept and provides practical examples.',
        partial: 'Candidate shows basic understanding but lacks depth or practical application.',
        incorrect: 'Candidate fails to demonstrate understanding of core concepts.',
      },
    };
  });
};

const formatPrompt = (requirements: JobRequirements): string => {
  const { title, description, skills, experienceLevel, numberOfQuestions } = requirements;
  
  return `Generate ${numberOfQuestions} unique technical interview questions for a ${experienceLevel} ${title} position.
  
Job Description: ${description}

Required Skills: ${skills.join(', ')}

For each question:
1. The question should be challenging but appropriate for a ${experienceLevel} developer
2. Assign a specific technical category
3. Include evaluation criteria with what constitutes:
   - A correct answer
   - A partially correct answer
   - An incorrect answer

Format the response as a JSON array with objects containing:
- id: A unique identifier
- text: The question text
- difficulty: The difficulty level
- category: The skill category
- evaluationCriteria: An object with 'correct', 'partial', and 'incorrect' properties

Make sure the questions are realistic, not repetitive, and truly test the candidate's knowledge.`;
};

const callChatGptApi = async (prompt: string, apiKey: string): Promise<Question[]> => {
  try {

    console.log('Would call ChatGPT API with:', prompt.substring(0, 100) + '...');
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return [];
  } catch (error) {
    console.error('Error calling ChatGPT API:', error);
    throw new Error('Failed to generate questions with ChatGPT.');
  }
};

const callDeepSeekApi = async (prompt: string, apiKey: string): Promise<Question[]> => {
  try {
    
    console.log('Would call DeepSeek API with:', prompt.substring(0, 100) + '...');
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return [];
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    throw new Error('Failed to generate questions with DeepSeek.');
  }
};

export const generateQuestions = async (
  requirements: JobRequirements,
  apiSettings: ApiSettings
): Promise<Question[]> => {
  const prompt = formatPrompt(requirements);
  
  if (!apiSettings.apiKey) {
    return generateMockQuestions(requirements);
  }
  
  try {
    if (apiSettings.provider === 'chatgpt') {
      return await callChatGptApi(prompt, apiSettings.apiKey);
    } else if (apiSettings.provider === 'deepseek') {
      return await callDeepSeekApi(prompt, apiSettings.apiKey);
    } else {
      return generateMockQuestions(requirements);
    }
  } catch (error) {
    console.error('Error generating questions:', error);
    return generateMockQuestions(requirements);
  }
};
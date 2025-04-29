import { useState } from 'react';
import JobForm from './components/JobForm';
import QuestionList from './components/QuestionList';
import ApiSettings from './components/ApiSettings';
import EmptyState from './components/EmptyState';
import { JobRequirements, ApiSettings as ApiSettingsType, Question } from './types';
import { generateQuestions } from './utils/apiService';
import { DEFAULT_JOB_REQUIREMENTS } from './constants';

function App() {
  const [jobRequirements, setJobRequirements] = useState<JobRequirements>({
    ...DEFAULT_JOB_REQUIREMENTS
  });
  
  const [apiSettings, setApiSettings] = useState<ApiSettingsType>({
    provider: 'chatgpt',
    apiKey: '',
  });
  
  const [questions, setQuestions] = useState<Question[]>([]);
  console.log("%c Line:21 🍆 questions", "color:#3f7cff", questions);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [error, setError] = useState<string | null>(null);
  
  const handleGenerateQuestions = async (requirements: JobRequirements) => {
    setIsGenerating(true);
    setError(null);
    setJobRequirements(requirements);
    
    try {
      const generatedQuestions = await generateQuestions(requirements, apiSettings);
      console.log("%c Line:33 🥖 generatedQuestions", "color:#fca650", generatedQuestions);
      setQuestions(generatedQuestions);
    } catch (err) {
      setError(typeof err === 'string' ? err : 'An error occurred while generating questions');
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Technical Interview Question Generator</h1>
            <ApiSettings settings={apiSettings} onSave={setApiSettings} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <JobForm 
                onSubmit={handleGenerateQuestions}
                isLoading={isGenerating}
              />
              
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-4">How It Works</h2>
                <ol className="space-y-4 text-gray-700">
                  <li className="flex">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800 font-medium mr-3">1</span>
                    <p>Enter the job title, description, and required skills for the position.</p>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800 font-medium mr-3">2</span>
                    <p>Specify the experience level and number of questions to generate.</p>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800 font-medium mr-3">3</span>
                    <p>Our AI generates tailored technical questions with evaluation criteria.</p>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800 font-medium mr-3">4</span>
                    <p>Review, modify, and export the questions for your interview process.</p>
                  </li>
                </ol>
              </div>
            </div>
            
            <div className="lg:col-span-7">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                  <p className="font-medium">Error</p>
                  <p>{error}</p>
                </div>
              )}
              
              {questions.length > 0 ? (
                <QuestionList 
                  questions={questions} 
                  jobTitle={jobRequirements.title}
                />
              ) : (
                <EmptyState />
              )}
            </div>
          </div>
        </div>
      </main>
      
    </div>
  );
}

export default App;
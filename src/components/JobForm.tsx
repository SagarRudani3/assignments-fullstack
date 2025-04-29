import React, { useState } from 'react';
import { JobRequirements } from '../types';
import { EXPERIENCE_LEVELS, QUESTION_COUNTS, DEFAULT_JOB_REQUIREMENTS } from '../constants';
import { PlusCircle, XCircle } from 'lucide-react';

interface JobFormProps {
  onSubmit: (requirements: JobRequirements) => void;
  isLoading: boolean;
}

const JobForm: React.FC<JobFormProps> = ({ onSubmit, isLoading }) => {
  const [requirements, setRequirements] = useState<JobRequirements>({
    ...DEFAULT_JOB_REQUIREMENTS
  });
  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = () => {
    if (skillInput.trim() === '') return;
    if (requirements.skills.includes(skillInput.trim())) return;
    
    setRequirements({
      ...requirements,
      skills: [...requirements.skills, skillInput.trim()]
    });
    setSkillInput('');
  };

  const handleRemoveSkill = (skill: string) => {
    setRequirements({
      ...requirements,
      skills: requirements.skills.filter(s => s !== skill)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (requirements.title.trim() === '') return;
    onSubmit(requirements);
  };

  return (
    <div className="card p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Job Requirements</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="label">Job Title</label>
          <input
            id="title"
            type="text"
            className="input"
            placeholder="e.g., Frontend Developer, DevOps Engineer"
            value={requirements.title}
            onChange={e => setRequirements({ ...requirements, title: e.target.value })}
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="label">Job Description</label>
          <textarea
            id="description"
            className="input h-24"
            placeholder="Describe the key responsibilities and requirements for this role"
            value={requirements.description}
            onChange={e => setRequirements({ ...requirements, description: e.target.value })}
          />
        </div>
        
        <div className="mb-4">
          <label className="label">Required Skills</label>
          <div className="flex mb-2">
            <input
              type="text"
              className="input rounded-r-none"
              placeholder="e.g., React, Node.js, Docker"
              value={skillInput}
              onChange={e => setSkillInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
            />
            <button
              type="button"
              className="px-4 bg-primary-600 text-white rounded-r-lg hover:bg-primary-700 transition-colors duration-200"
              onClick={handleAddSkill}
            >
              <PlusCircle size={20} />
            </button>
          </div>
          
          {requirements.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {requirements.skills.map(skill => (
                <div 
                  key={skill}
                  className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full flex items-center text-sm"
                >
                  {skill}
                  <button
                    type="button"
                    className="ml-1 text-primary-600 hover:text-primary-800"
                    onClick={() => handleRemoveSkill(skill)}
                  >
                    <XCircle size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="experienceLevel" className="label">Experience Level</label>
            <select
              id="experienceLevel"
              className="select"
              value={requirements.experienceLevel}
              onChange={e => setRequirements({
                ...requirements,
                experienceLevel: e.target.value as any
              })}
            >
              {EXPERIENCE_LEVELS.map(level => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="numberOfQuestions" className="label">Number of Questions</label>
            <select
              id="numberOfQuestions"
              className="select"
              value={requirements.numberOfQuestions}
              onChange={e => setRequirements({
                ...requirements,
                numberOfQuestions: parseInt(e.target.value)
              })}
            >
              {QUESTION_COUNTS.map(count => (
                <option key={count} value={count}>
                  {count} questions
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="text-right">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading || requirements.title.trim() === '' || requirements.skills.length === 0}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              'Generate Questions'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
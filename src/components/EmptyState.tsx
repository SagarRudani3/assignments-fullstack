import React from 'react';
import { FileQuestion } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="card p-8 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 flex items-center justify-center bg-primary-100 rounded-full mb-4">
        <FileQuestion size={32} className="text-primary-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No Questions Generated Yet</h3>
      <p className="text-gray-600 mb-4 max-w-md">
        Fill in the job requirements form and click "Generate Questions" to create custom technical interview questions for your candidates.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-xl mt-4">
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
          <div className="text-lg font-bold text-primary-600">1</div>
          <div className="text-sm text-gray-600">Define job details</div>
        </div>
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
          <div className="text-lg font-bold text-primary-600">2</div>
          <div className="text-sm text-gray-600">Specify experience level</div>
        </div>
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
          <div className="text-lg font-bold text-primary-600">3</div>
          <div className="text-sm text-gray-600">Generate custom questions</div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
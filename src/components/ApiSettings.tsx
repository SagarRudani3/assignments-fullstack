import React, { useState } from 'react';
import { ApiSettings } from '../types';
import { API_PROVIDERS } from '../constants';
import { Settings } from 'lucide-react';

interface ApiSettingsProps {
  settings: ApiSettings;
  onSave: (settings: ApiSettings) => void;
}

const ApiSettingsModal: React.FC<ApiSettingsProps> = ({ settings, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<ApiSettings>(settings);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        className="flex items-center text-gray-600 hover:text-primary-600 transition-colors duration-200"
        onClick={() => setIsOpen(true)}
      >
        <Settings size={18} className="mr-1" />
        <span>API Settings</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md animate-fade-in">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">API Settings</h3>
          
          <form onSubmit={handleSave}>
            <div className="mb-4">
              <label className="label">API Provider</label>
              <select
                className="select"
                value={formData.provider}
                onChange={e => setFormData({
                  ...formData,
                  provider: e.target.value as 'chatgpt' | 'deepseek'
                })}
              >
                {API_PROVIDERS.map(provider => (
                  <option key={provider.id} value={provider.id}>
                    {provider.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-6">
              <label className="label">API Key</label>
              <input
                type="password"
                className="input"
                placeholder="Enter your API key"
                value={formData.apiKey}
                onChange={e => setFormData({
                  ...formData,
                  apiKey: e.target.value
                })}
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.provider === 'chatgpt' 
                  ? 'Get your OpenAI API key from the OpenAI dashboard.'
                  : 'Get your DeepSeek API key from the DeepSeek dashboard.'}
              </p>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApiSettingsModal;
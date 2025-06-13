import React from 'react';
import resume_1 from '../assets/resume_1.jpg';
import resume_2 from '../assets/resume_2.png';
import resume_4 from '../assets/resume_4.jpg';
import '../styles/index.css';

function TemplateSwitcher({ isOpen, onClose, currentTemplate, onSelectTemplate }) {
  const templates = [
    {
      id: 'chronological',
      name: 'Chronological',
      description: 'Focus on work history',
      previewImage: resume_1,
    },
    {
      id: 'functional',
      name: 'Functional',
      description: 'Emphasize skills',
      previewImage: resume_2,
    },
    {
      id: 'pillar',
      name: 'Pillar',
      description: 'Professional and modern layout',
      previewImage: resume_4,
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Select a Template</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`template-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow ${
                template.id === currentTemplate ? 'border-2 border-blue-500' : ''
              }`}
              onClick={() => onSelectTemplate(template.id)}
            >
              <img
                src={template.previewImage}
                alt={`${template.name} preview`}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="template-title text-lg font-semibold text-gray-800">{template.name}</h3>
                <p className="template-description text-gray-600">{template.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TemplateSwitcher;
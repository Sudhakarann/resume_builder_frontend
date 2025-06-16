import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import resume_1 from '../assets/resume_1.jpg';
import resume_2 from '../assets/resume_2.png';
import resume_3 from '../assets/resume_3.png';
import resume_4 from '../assets/resume_4.jpg';

const api = axios.create({
  baseURL: 'https://resume-builder-backend-bvbz.onrender.com',
  withCredentials: true,
});

function Dashboard({ user, logout }) {
  const navigate = useNavigate();
  const [recentResumes, setRecentResumes] = useState([]);

  useEffect(() => {
    async function fetchRecentResumes() {
      try {
        const response = await api.get('/resumes');
        setRecentResumes(response.data);
      } catch (err) {
        console.error('Fetch recent resumes error:', err.response?.data || err.message);
      }
    }
    fetchRecentResumes();
  }, []);

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
      id: 'combination',
      name: 'Combination',
      description: 'Balance skills and experience',
      previewImage: resume_3,
    },
    {
      id: 'pillar',
      name: 'Pillar',
      description: 'Professional and modern layout',
      previewImage: resume_4,
    },
  ];

  const handleTemplateSelect = (templateId) => {
    navigate(`/editor/${templateId}`);
  };

  const handleRecentResumeClick = (resume) => {
    navigate(`/editor/${resume.template}/${resume._id}`);
  };

  return (
    <div className="dashboard-container min-h-screen bg-gray-100 font-sans">
      <header className="app-header bg-white shadow-md p-4 flex justify-between items-center">
        <div className="header-logo flex items-center space-x-2">
          <svg className="logo-icon w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h1 className="text-2xl font-bold text-gray-800">Resume Builder</h1>
        </div>
        <div className="header-user flex items-center space-x-4">
          <span className="user-greeting text-gray-700">Hello, {user.name}</span>
          <button onClick={logout} className="btn-primary flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
            <span>Sign Out</span>
          </button>
        </div>
      </header>
      <div className="dashboard-content max-w-6xl mx-auto p-6">
        <h2 className="dashboard-heading text-3xl font-semibold text-gray-800 mb-6">Welcome, {user.name}!</h2>
        {recentResumes.length > 0 && (
          <div className="recent-template mb-8">
            <h3 className="recent-template-title text-xl font-medium text-gray-700 mb-4">Recently Saved Resumes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recentResumes.map((resume) => {
                const template = templates.find((t) => t.id === resume.template);
                return (
                  <div
                    key={resume._id}
                    className="template-card recent-template-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleRecentResumeClick(resume)}
                  >
                    <img
                      src={template?.previewImage}
                      alt={`${resume.template} preview`}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="template-title text-lg font-semibold text-gray-800">
                        {resume.personalInfo.name || 'Unnamed Resume'} ({template?.name || resume.template})
                      </h3>
                      <p className="template-description text-gray-600">
                        Last saved: {new Date(resume.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <h3 className="template-section-title text-xl font-medium text-gray-700 mb-4">Choose a Template</h3>
        <div className="template-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="template-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleTemplateSelect(template.id)}
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

export default Dashboard;
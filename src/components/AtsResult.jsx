import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { ArrowLeftIcon, HomeIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import '../styles/ats_page.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const api = axios.create({
  baseURL: 'https://resume-builder-backend-bvbz.onrender.com',
  withCredentials: true,
});

function AtsResult({ user }) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const atsResult = state?.atsResult || null;
  const template = state?.template || 'chronological';
  const resumeId = state?.resumeId || '';

  if (!atsResult) {
    return (
      <div className="no-results">
        <div className="no-results-card">
          <h2>No ATS Results</h2>
          <p>No ATS analysis results available. Please try again.</p>
          <button onClick={() => navigate('/dashboard')}>
            <HomeIcon />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: ['Score', 'Remaining'],
    datasets: [
      {
        data: [atsResult.atsScore, 100 - atsResult.atsScore],
        backgroundColor: ['#10B981', '#E5E7EB'],
        borderWidth: 0,
        hoverOffset: 20,
      },
    ],
  };

  const chartOptions = {
    cutout: '75%',
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: '#1F2937',
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        borderColor: '#10B981',
        borderWidth: 1,
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };

  const handleEnhanceResume = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch original resume
      let resumeData;
      try {
        //debug_enhanced_resume_1749711752016.txt
        const resumeResponse = await api.get(`/resumes/${resumeId}`);
        resumeData = resumeResponse.data;
      } catch (err) {
        console.error('Failed to fetch resume:', {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
        });
        throw new Error('Unable to fetch resume data. Please ensure the resume exists.');
      }

      // Construct resumeText in the expected format
      const resumeText = [
        'Personal Info',
        ...Object.entries(resumeData.personalInfo)
          .filter(([_, v]) => v)
          .map(([k, v]) => `${k.charAt(0).toUpperCase() + k.slice(1)}: ${v}`),
        '',
        'Professional Summary',
        resumeData.summary || 'Experienced professional seeking opportunities.',
        '',
        'Technical Skills',
        ...(resumeData.techSkills?.length
          ? resumeData.techSkills.map((s) => `*- ${s.name}`)
          : ['*- No skills listed']),
        '',
        'Experience',
        ...(resumeData.experience?.length
          ? resumeData.experience.flatMap((e) => [
              `${e.role}|${e.company}|${e.duration}`,
              ...e.description.split('\n').filter(Boolean).map((d) => `*- ${d}`),
            ])
          : ['No experience listed']),
        '',
        'Education',
        ...(resumeData.education?.length
          ? resumeData.education.map((e) => `${e.degree}|${e.institution}|${e.year}`)
          : ['No education listed']),
        '',
        'Certifications',
        ...(resumeData.certifications?.length
          ? resumeData.certifications.map((c) => `${c.name}|${c.issuer}|${c.year}`)
          : ['No certifications listed']),
        '',
        'Projects',
        ...(resumeData.projects?.length
          ? resumeData.projects.map((p) => `${p.name}|${p.description.replace(/\n/g, ' ')}|${p.link}`)
          : ['No projects listed']),
        '',
        'Soft Skills',
        ...(resumeData.softSkills?.length
          ? resumeData.softSkills.map((s) => `*- ${s}`)
          : ['*- No soft skills listed']),
        '',
        'Languages',
        ...(resumeData.languages?.length
          ? resumeData.languages.map((l) => `${l.language}|${l.proficiency}|${l.proficiencyLevel}`)
          : ['No languages listed']),
        '',
        'Hobbies',
        ...(resumeData.hobbies?.length
          ? resumeData.hobbies.map((h) => `*- ${h}`)
          : ['*- No hobbies listed']),
        '',
        'Role Title',
        resumeData.roleTitle || 'No role title specified',
        '',
        'Additional Fields',
        ...(resumeData.additionalFields?.length
          ? resumeData.additionalFields.flatMap((f) => [
              f.title,
              ...f.content.map((c) => `*- ${c.name}|${c.year}`),
            ])
          : ['No additional fields']),
      ].join('\n');

      console.log('Constructed resumeText:', resumeText);

      const enhanceResponse = await api.post('/api/enhance-resume', {
        resumeText,
      });

      console.log('Enhanced resume response:', enhanceResponse.data);

      // Navigate to editor
      navigate(`/editor/${template}${resumeId ? `/${resumeId}` : ''}`, {
        state: {
          enhancedResume: enhanceResponse.data.enhancedResume,
        },
      });
    } catch (err) {
      const errorDetails = {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
        stack: err.stack,
      };
      console.error('Enhance resume error:', JSON.stringify(errorDetails, null, 2));
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to enhance resume. Please check your resume data or try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ats-result-container">
      {/* Header */}
      <div className="header">
        <h1>Resume ATS Score</h1>
      </div>

      {/* Error Display */}
      {error && <div className="error-message text-red-500 mb-4">{error}</div>}

      {/* Main Content */}
      <div className="main-content">
        {/* ATS Score Chart */}
        <div className="score-card">
          <div className="chart-container">
            <Doughnut data={chartData} options={chartOptions} />
            <div className="chart-score">
              <span>{atsResult.atsScore}</span>
              <span>out of 100</span>
            </div>
          </div>
          <div className="score-details">
            <h3>ATS Compatibility Score</h3>
            <p>Your resume’s compatibility with ATS systems.</p>
          </div>
        </div>

        {/* Missing Keywords & Suggestions */}
        <div className="details-container">
          {/* Missing Keywords */}
          <div className="card">
            <h3>Missing Keywords</h3>
            {atsResult.missingKeywords.length === 0 ? (
              <p className="keywords-empty">All key keywords are present!</p>
            ) : (
              <ul className="keywords-list">
                {atsResult.missingKeywords.map((keyword, index) => (
                  <li key={index}>{keyword}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Improvement Suggestions */}
          <div className="card">
            <h3>Improvement Suggestions</h3>
            <ul className="suggestions-list">
              {atsResult.suggestions.map((suggestion, index) => (
                <li key={index}>
                  <span className="number">{index + 1}</span>
                  <span className="text">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="actions">
        <button
          className="editor"
          onClick={() => navigate(`/editor/${template}${resumeId ? `/${resumeId}` : ''}`)}
          disabled={loading}
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Back to Editor
        </button>
        <button
          className="dashboard"
          onClick={handleEnhanceResume}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Generate AGI-Enhanced Resume'}
        </button>
        <button
          className="dashboard"
          onClick={() => navigate('/dashboard')}
          disabled={loading}
        >
          <HomeIcon className="h-5 w-5" />
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default AtsResult;
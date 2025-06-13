import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/jobs.css';

const api = axios.create({
  baseURL: 'https://ai-resume-backend-23kz.onrender.com',
  withCredentials: true,
});

function Jobs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    experience: '',
    jobRole: '',
  });
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState('');

  // Fetch jobs from backend on component mount
  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        setError('');
        const response = await api.get('/jobs');
        if (!Array.isArray(response.data)) {
          throw new Error(`Invalid data format: Expected an array of jobs, received ${JSON.stringify(response.data)}`
        }
        // Map jobs.json fields to match expected structure
        const mappedJobs = response.data.map(job => ({
          id: job.id,
          title: job.profile,
          company: 'Hiring Company', // Fallback for missing company
          location: job.location,
          salary: job.salary,
          experience: job.experience,
          description: job.description,
          postedDate: 'Recently Posted', // Fallback for missing postedDate
          skills: job.skills,
          applyLink: job.applyLink,
        }));
        setJobs(mappedJobs);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadError('');
    }
  };

  const handleUploadSubmit = async () => {
    if (!selectedFile) {
      setUploadError('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('resume', selectedFile);

    try {
      // Add your API endpoint for resume upload here
      // await api.post('/upload-resume', formData);
      setShowUploadModal(false);
      setSelectedFile(null);
      // Add success message or redirect logic here
    } catch (err) {
      setUploadError('Failed to upload resume. Please try again.');
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesExperience = !filters.experience || job.experience === filters.experience;
    const matchesRole = !filters.jobRole || job.title.toLowerCase().includes(filters.jobRole.toLowerCase());

    return matchesSearch && matchesLocation && matchesExperience && matchesRole;
  });

  return (
    <div className="jobs-container">
      <div className="jobs-content">
        {/* Filters Section */}
        <div className="filters-section">
          <div className="filter-group">
            <h3 className="filter-title">Location</h3>
            <input
              type="text"
              name="location"
              className="filter-input"
              placeholder="Enter location"
              value={filters.location}
              onChange={handleFilterChange}
            />
          </div>

          <div className="filter-group">
            <h3 className="filter-title">Experience Level</h3>
            <select
              name="experience"
              className="filter-select"
              value={filters.experience}
              onChange={handleFilterChange}
            >
              <option value="">Select Experience</option>
              <option value="0-2 years">0-2 years</option>
              <option value="2-3 years">2-3 years</option>
              <option value="2-4 years">2-4 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="4-6 years">4-6 years</option>
              <option value="5-8 years">5-8 years</option>
              <option value="8+ years">8+ years</option>
            </select>
          </div>

          <div className="filter-group">
            <h3 className="filter-title">Job Role</h3>
            <select
              name="jobRole"
              className="filter-select"
              value={filters.jobRole}
              onChange={handleFilterChange}
            >
              <option value="">Select Role</option>
              <option value="mern stack developer">MERN Stack Developer</option>
              <option value="data scientist">Data Scientist</option>
              <option value="devops engineer">DevOps Engineer</option>
              <option value="frontend developer">Frontend Developer</option>
            </select>
          </div>
        </div>

        {/* Jobs List Section */}
        <div>
          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="Search jobs by title or company"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {loading && <div className="loading-message">Loading jobs...</div>}
          {error && <div className="error-message text-red-500 mb-4">{error}</div>}

          <div className="jobs-list">
            {filteredJobs.length === 0 && !loading && (
              <div className="no-jobs">No jobs match your criteria.</div>
            )}
            {filteredJobs.map(job => (
              <div key={job.id} className="job-card">
                <div className="job-header">
                  <div>
                    <h2 className="job-title">{job.title}</h2>
                    <p className="company-name">{job.company}</p>
                  </div>
                  <p className="job-salary">{job.salary}</p>
                </div>

                <div className="job-details">
                  <span className="job-tag">{job.location}</span>
                  <span className="job-tag">{job.experience}</span>
                  {job.skills.map((skill, index) => (
                    <span key={index} className="job-tag">{skill}</span>
                  ))}
                </div>

                <p className="job-description">{job.description}</p>

                <div className="job-footer">
                  <span className="posted-date">Posted {job.postedDate}</span>
                  <div className="job-actions">
                    <button 
                      className="generate-resume-button"
                      onClick={() => setShowUploadModal(true)}
                    >
                      Generate AI Resume
                    </button>
                    <a href={job.applyLink} className="apply-button" target="_blank" rel="noopener noreferrer">Apply Now</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resume Upload Modal */}
      {showUploadModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Upload Your Resume</h2>
              <button 
                className="close-button"
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedFile(null);
                  setUploadError('');
                }}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="upload-section">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="file-input"
                />
                {selectedFile && (
                  <p className="selected-file">Selected: {selectedFile.name}</p>
                )}
                {uploadError && (
                  <p className="error-message">{uploadError}</p>
                )}
              </div>
              <div className="modal-actions">
                <button 
                  className="upload-button"
                  onClick={handleUploadSubmit}
                >
                  Upload Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Jobs;
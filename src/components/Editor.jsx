import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import ChronologicalTemplate from './templates/ChronologicalTemplate';
import FunctionalTemplate from './templates/FunctionalTemplate';
import CombinationTemplate from './templates/CombinationTemplate';
import PillarTemplate from './templates/PillarTemplate';
import EditorForm from './EditorForm';
import TemplateSwitcher from './TemplateSwitcher';
import '../styles/index.css';
import '../styles/resume.css';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true,
});

function Editor({ user, logout, setError }) {
  const { template, resumeId } = useParams();
  const navigate = useNavigate();
  const previewRef = React.useRef(null);
  const [loading, setLoading] = React.useState(false);
  const [isPreviewReady, setIsPreviewReady] = React.useState(false);
  const [isTemplatePopupOpen, setIsTemplatePopupOpen] = React.useState(false);
  const [switchingTemplate, setSwitchingTemplate] = React.useState(false);

  // Valid templates
  const validTemplates = ['chronological', 'functional', 'combination', 'pillar'];

  // State for all fields
  const [personalInfo, setPersonalInfo] = React.useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio: '',
    address: '',
    github: '',
    twitter: '',
    stackoverflow: '',
  });
  const [summary, setSummary] = React.useState('');
  const [education, setEducation] = React.useState([{ degree: '', institution: '', year: '' }]);
  const [experience, setExperience] = React.useState([{ company: '', role: '', duration: '', description: '' }]);
  const [projects, setProjects] = React.useState([{ name: '', description: '', link: '' }]);
  const [techSkills, setTechSkills] = React.useState([{ name: '', proficiency: 90 }]);
  const [softSkills, setSoftSkills] = React.useState(['']);
  const [certifications, setCertifications] = React.useState([{ name: '', issuer: '', year: '' }]);
  const [languages, setLanguages] = React.useState([{ language: '', proficiency: '', proficiencyLevel: 0 }]);
  const [hobbies, setHobbies] = React.useState(['']);
  const [profilePicture, setProfilePicture] = React.useState('');
  const [roleTitle, setRoleTitle] = React.useState('');
  const [additionalFields, setAdditionalFields] = React.useState([]);

  // Load saved resume data if resumeId is provided
  React.useEffect(() => {
    if (!validTemplates.includes(template)) {
      setError(`Invalid template: ${template}. Please select a valid template.`);
      navigate('/dashboard');
      return;
    }
    if (resumeId) {
      async function fetchResume() {
        try {
          setLoading(true);
          const response = await api.get(`/resumes/${resumeId}`);
          const resume = response.data;
          setPersonalInfo(resume.personalInfo || {});
          setSummary(resume.summary || '');
          setEducation(resume.education.length > 0 ? resume.education : [{ degree: '', institution: '', year: '' }]);
          setExperience(resume.experience.length > 0 ? resume.experience : [{ company: '', role: '', duration: '', description: '' }]);
          setProjects(resume.projects.length > 0 ? resume.projects : [{ name: '', description: '', link: '' }]);
          setTechSkills(resume.techSkills.length > 0 ? resume.techSkills : [{ name: '', proficiency: 90 }]);
          setSoftSkills(resume.softSkills.length > 0 ? resume.softSkills : ['']);
          setCertifications(resume.certifications.length > 0 ? resume.certifications : [{ name: '', issuer: '', year: '' }]);
          setLanguages(resume.languages.length > 0 ? resume.languages : [{ language: '', proficiency: '', proficiencyLevel: 0 }]);
          setHobbies(resume.hobbies.length > 0 ? resume.hobbies : ['']);
          setProfilePicture(resume.profilePicture || '');
          setRoleTitle(resume.roleTitle || '');
          setAdditionalFields(resume.additionalFields.length > 0 ? resume.additionalFields : []);
        } catch (err) {
          console.error('Fetch resume error:', err.response?.data || err.message);
          setError(err.response?.data?.message || 'Error loading resume');
          navigate('/dashboard');
        } finally {
          setLoading(false);
          setIsPreviewReady(true);
        }
      }
      fetchResume();
    } else {
      setLoading(false);
      setIsPreviewReady(true);
    }
  }, [template, resumeId, navigate, setError]);

  // Handlers for adding, updating, deleting items
  const addItem = (setState, defaultItem) => () => setState((prev) => [...prev, defaultItem]);
  const updateItem = (setState, index, field, value) => () => {
    setState((prev) => {
      const updated = [...prev];
      if (field) updated[index][field] = value;
      else updated[index] = value;
      return updated;
    });
  };
  const deleteItem = (setState, index) => () => setState((prev) => prev.filter((_, i) => i !== index));

  const handlers = {
    education: {
      add: addItem(setEducation, { degree: '', institution: '', year: '' }),
      update: (index, field, value) => updateItem(setEducation, index, field, value)(),
      delete: (index) => deleteItem(setEducation, index)(),
    },
    experience: {
      add: addItem(setExperience, { company: '', role: '', duration: '', description: '' }),
      update: (index, field, value) => updateItem(setExperience, index, field, value)(),
      delete: (index) => deleteItem(setExperience, index)(),
    },
    projects: {
      add: addItem(setProjects, { name: '', description: '', link: '' }),
      update: (index, field, value) => updateItem(setProjects, index, field, value)(),
      delete: (index) => deleteItem(setProjects, index)(),
    },
    techSkills: {
      add: addItem(setTechSkills, { name: '', proficiency: 90 }),
      update: (index, field, value) => updateItem(setTechSkills, index, field, value)(),
      delete: (index) => deleteItem(setTechSkills, index)(),
    },
    softSkills: {
      add: addItem(setSoftSkills, ''),
      update: (index, value) => updateItem(setSoftSkills, index, null, value)(),
      delete: (index) => deleteItem(setSoftSkills, index)(),
    },
    certifications: {
      add: addItem(setCertifications, { name: '', issuer: '', year: '' }),
      update: (index, field, value) => updateItem(setCertifications, index, field, value)(),
      delete: (index) => deleteItem(setCertifications, index)(),
    },
    languages: {
      add: addItem(setLanguages, { language: '', proficiency: '', proficiencyLevel: 0 }),
      update: (index, field, value) => updateItem(setLanguages, index, field, value)(),
      delete: (index) => deleteItem(setLanguages, index)(),
    },
    hobbies: {
      add: addItem(setHobbies, ''),
      update: (index, value) => updateItem(setHobbies, index, null, value)(),
      delete: (index) => deleteItem(setHobbies, index)(),
    },
    additionalFields: {
      add: () => setAdditionalFields((prev) => [...prev, { title: '', content: [{ name: '', year: '' }] }]),
      updateTitle: (index, value) =>
        setAdditionalFields((prev) => {
          const updated = [...prev];
          updated[index].title = value;
          return updated;
        }),
      updateContent: (fieldIndex, itemIndex, field, value) =>
        setAdditionalFields((prev) => {
          const updated = [...prev];
          updated[fieldIndex].content[itemIndex][field] = value;
          return updated;
        }),
      addContentItem: (index) =>
        setAdditionalFields((prev) => {
          const updated = [...prev];
          updated[index].content.push({ name: '', year: '' });
          return updated;
        }),
      deleteContentItem: (fieldIndex, itemIndex) =>
        setAdditionalFields((prev) => {
          const updated = [...prev];
          updated[fieldIndex].content = updated[fieldIndex].content.filter((_, i) => i !== itemIndex);
          return updated;
        }),
      delete: (index) => setAdditionalFields((prev) => prev.filter((_, i) => i !== index)),
    },
  };

  async function saveResume(autoSave = false) {
    if (!personalInfo.name || !summary) {
      setError('Name and summary are required');
      return false;
    }
    if (!validTemplates.includes(template)) {
      setError(`Invalid template: ${template}. Please select a valid template from the dashboard.`);
      return false;
    }
    setError('');
    setLoading(true);
    try {
      const resumeData = {
        resumeId: resumeId || undefined,
        template,
        personalInfo,
        summary,
        education,
        experience,
        projects,
        techSkills,
        softSkills,
        certifications,
        languages,
        hobbies,
        roleTitle,
        additionalFields,
      };
      console.log('Saving resume, payload size:', JSON.stringify(resumeData).length, 'bytes');
      const response = await api.post('/resumes', resumeData);
      console.log('Resume saved:', response.data);
      localStorage.setItem('recentTemplate', template);
      if (!autoSave) setError('Resume saved successfully');
      return response.data._id || true;
    } catch (err) {
      console.error('Save resume error:', err.response?.data || err.message);
      const errorMessage = err.response?.data?.error || err.response?.data?.message || 'Error saving resume';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function generateResumePDF(retryCount = 0, maxRetries = 3) {
    if (!personalInfo.name || !summary) {
      setError('Name and summary are required');
      return null;
    }

    if (!isPreviewReady || loading) {
      setError('Resume preview is not ready. Please wait a moment and try again.');
      return null;
    }

    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));

      const element = previewRef.current;
      if (!element) {
        if (retryCount < maxRetries) {
          console.warn(`Preview ref is null, retrying ${retryCount + 1}/${maxRetries}`);
          await new Promise(resolve => setTimeout(resolve, 1000));
          return generateResumePDF(retryCount + 1, maxRetries);
        }
        console.error('Preview ref is null. DOM state:', document.querySelector('.resume-preview'));
        throw new Error('Resume preview element not found. Please try refreshing the page.');
      }

      // Clone the preview element to modify styles without affecting the UI
      const clonedElement = element.cloneNode(true);
      document.body.appendChild(clonedElement);
      clonedElement.style.position = 'absolute';
      clonedElement.style.left = '-9999px';

      // Replace oklch colors with hex equivalents
      const replaceOklchColors = (node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const computedStyle = window.getComputedStyle(node);
          ['color', 'backgroundColor', 'borderColor'].forEach((prop) => {
            const value = computedStyle[prop];
            if (value.includes('oklch')) {
              // Convert oklch to a fallback hex (default to #000000 for simplicity)
              // In practice, map known oklch values to hex equivalents
              node.style[prop] = '#000000'; // Fallback; adjust based on actual colors
              console.warn(`Replaced oklch color in ${prop}: ${value} with #000000`);
            }
          });
        }
        node.childNodes.forEach(replaceOklchColors);
      };
      replaceOklchColors(clonedElement);

      console.log('Generating styled PDF from preview element...');
      const canvas = await html2canvas(clonedElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: true,
      });

      // Clean up cloned element
      document.body.removeChild(clonedElement);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        unit: 'in',
        format: 'letter',
        orientation: 'portrait',
      });

      const imgWidth = 8.5;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pageHeight = 11;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const pdfBlob = pdf.output('blob');
      console.log('Styled PDF generated successfully, size:', pdfBlob.size, 'bytes');
      return pdfBlob;
    } catch (err) {
      console.error('Generate styled PDF error:', err);
      setError(`Error generating resume PDF: ${err.message}`);
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function generateATSPDF() {
    if (!personalInfo.name || !summary) {
      setError('Name and summary are required');
      return null;
    }

    try {
      setLoading(true);

      const doc = new jsPDF({
        unit: 'in',
        format: 'letter',
        orientation: 'portrait',
      });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);

      let yPosition = 0.5;
      const margin = 0.5;
      const maxWidth = 7.5;
      const lineHeight = 0.2;

      if (personalInfo.name) {
        doc.setFontSize(16);
        doc.text(personalInfo.name, margin, yPosition);
        yPosition += lineHeight * 2;
        doc.setFontSize(12);
      }
      if (personalInfo.email) {
        doc.text(`Email: ${personalInfo.email}`, margin, yPosition);
        yPosition += lineHeight;
      }
      if (personalInfo.phone) {
        doc.text(`Phone: ${personalInfo.phone}`, margin, yPosition);
        yPosition += lineHeight;
      }
      if (personalInfo.linkedin) {
        doc.text(`LinkedIn: ${personalInfo.linkedin}`, margin, yPosition);
        yPosition += lineHeight;
      }

      if (summary) {
        yPosition += lineHeight;
        doc.setFontSize(14);
        doc.text('Summary', margin, yPosition);
        yPosition += lineHeight;
        doc.setFontSize(12);
        const summaryLines = doc.splitTextToSize(summary, maxWidth);
        summaryLines.forEach(line => {
          if (yPosition > 10.5) {
            doc.addPage();
            yPosition = 0.5;
          }
          doc.text(line, margin, yPosition);
          yPosition += lineHeight;
        });
      }

      if (education.length > 0 && !education.every(e => !e.degree && !e.institution)) {
        yPosition += lineHeight;
        doc.setFontSize(14);
        doc.text('Education', margin, yPosition);
        yPosition += lineHeight;
        doc.setFontSize(12);
        education.forEach(edu => {
          if (edu.degree && edu.institution) {
            const text = `${edu.degree}, ${edu.institution}${edu.year ? `, ${edu.year}` : ''}`;
            const lines = doc.splitTextToSize(text, maxWidth);
            lines.forEach(line => {
              if (yPosition > 10.5) {
                doc.addPage();
                yPosition = 0.5;
              }
              doc.text(line, margin, yPosition);
              yPosition += lineHeight;
            });
          }
        });
      }

      if (experience.length > 0 && !experience.every(e => !e.company && !e.role)) {
        yPosition += lineHeight;
        doc.setFontSize(14);
        doc.text('Experience', margin, yPosition);
        yPosition += lineHeight;
        doc.setFontSize(12);
        experience.forEach(exp => {
          if (exp.company && exp.role) {
            const text = `${exp.role} at ${exp.company}${exp.duration ? `, ${exp.duration}` : ''}`;
            const lines = doc.splitTextToSize(text, maxWidth);
            lines.forEach(line => {
              if (yPosition > 10.5) {
                doc.addPage();
                yPosition = 0.5;
              }
              doc.text(line, margin, yPosition);
              yPosition += lineHeight;
            });
            if (exp.description) {
              const descLines = doc.splitTextToSize(exp.description, maxWidth);
              descLines.forEach(line => {
                if (yPosition > 10.5) {
                  doc.addPage();
                  yPosition = 0.5;
                }
                doc.text(line, margin + 0.2, yPosition);
                yPosition += lineHeight;
              });
            }
          }
        });
      }

      if (techSkills.length > 0 && !techSkills.every(s => !s.name)) {
        yPosition += lineHeight;
        doc.setFontSize(14);
        doc.text('Technical Skills', margin, yPosition);
        yPosition += lineHeight;
        doc.setFontSize(12);
        const skillsText = techSkills.map(s => s.name).filter(Boolean).join(', ');
        const skillLines = doc.splitTextToSize(skillsText, maxWidth);
        skillLines.forEach(line => {
          if (yPosition > 10.5) {
            doc.addPage();
            yPosition = 0.5;
          }
          doc.text(line, margin, yPosition);
          yPosition += lineHeight;
        });
      }

      const pdfBlob = doc.output('blob');
      console.log('ATS PDF generated successfully, size:', pdfBlob.size, 'bytes');
      return pdfBlob;
    } catch (err) {
      console.error('Generate ATS PDF error:', err);
      setError(`Error generating ATS-compatible PDF: ${err.message}`);
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function downloadResume() {
    if (!personalInfo.name || !summary) {
      setError('Name and summary are required');
      return;
    }

    if (!isPreviewReady || loading) {
      setError('Resume preview is not ready. Please wait a moment and try again.');
      return;
    }

    try {
      setLoading(true);
      const saved = await saveResume(true);
      if (!saved) {
        setError('Failed to save resume before downloading.');
        return;
      }

      const pdfBlob = await generateResumePDF();
      if (!pdfBlob) {
        return;
      }

      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${personalInfo.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'resume'}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setError('Resume downloaded successfully');
    } catch (err) {
      console.error('Download resume error:', err);
      setError(`Error downloading resume: ${err.message}. Please try again or contact support.`);
    } finally {
      setLoading(false);
    }
  }

  const isSectionEmpty = (data, isArray = true) => {
    if (!data) return true;
    if (!isArray) return !data.trim();
    if (data.length === 0) return true;
    return data.every((item) => {
      if (typeof item === 'string') return !item.trim();
      return Object.values(item).every(
        (val) => !val || (typeof val === 'string' && !val.trim()) || (typeof val === 'number' && val === 0)
      );
    });
  };

  async function handleSwitchTemplate(newTemplate) {
    if (newTemplate === template) {
      setIsTemplatePopupOpen(false);
      return;
    }
    if (!validTemplates.includes(newTemplate)) {
      setError(`Invalid template: ${newTemplate}. Please select a valid template.`);
      return;
    }

    setSwitchingTemplate(true);
    setError('');

    try {
      // Save current resume data
      const savedResumeId = await saveResume(true);
      if (!savedResumeId) {
        setError('Failed to save resume before switching template.');
        return;
      }

      // Navigate to new template with the same resumeId
      const newResumeId = typeof savedResumeId === 'string' ? savedResumeId : resumeId;
      navigate(`/editor/${newTemplate}${newResumeId ? `/${newResumeId}` : ''}`);
      setIsTemplatePopupOpen(false);
    } catch (err) {
      console.error('Template switch error:', err);
      setError('Error switching template. Please try again.');
    } finally {
      setSwitchingTemplate(false);
    }
  }

  const renderResumePreview = () => {
    const templateProps = {
      personalInfo,
      summary,
      education,
      experience,
      projects,
      techSkills,
      softSkills,
      certifications,
      languages,
      hobbies,
      profilePicture,
      roleTitle,
      additionalFields,
      isSectionEmpty,
    };

    return (
      <div>
        <div
          ref={previewRef}
          className={`resume-preview ${template}`}
          style={{
            width: '8.5in',
            minHeight: '11in',
            margin: '0 auto',
            padding: '0.5in',
            background: '#fff',
            boxSizing: 'border-box',
            color: '#000000',
            fontFamily: 'Arial, Helvetica, sans-serif',
          }}
        >
          {template === 'chronological' && <ChronologicalTemplate {...templateProps} />}
          {template === 'functional' && <FunctionalTemplate {...templateProps} />}
          {template === 'combination' && <CombinationTemplate {...templateProps} />}
          {template === 'pillar' && <PillarTemplate {...templateProps} />}
        </div>
      </div>
    );
  };

  return (
    <div className="editor-container">
      <header className="app-header">
        <div className="header-logo">
          <h1>Resume Generator</h1>
        </div>
        <div className="header-user">
          <span className="user-greeting">Hello, {user.name}</span>
          <button
            onClick={() => {
              logout();
              navigate('/auth');
            }}
            className="btn-primary logout-btn"
          >
            Sign Out
          </button>
        </div>
      </header>
      <div className="editor-content">
        {loading || switchingTemplate ? (
          <div className="loading-screen">{switchingTemplate ? 'Switching template...' : 'Loading resume...'}</div>
        ) : (
          <>
            <EditorForm
              personalInfo={personalInfo}
              setPersonalInfo={setPersonalInfo}
              summary={summary}
              setSummary={setSummary}
              education={education}
              experience={experience}
              projects={projects}
              techSkills={techSkills}
              setTechSkills={setTechSkills}
              softSkills={softSkills}
              setSoftSkills={setSoftSkills}
              certifications={certifications}
              languages={languages}
              hobbies={hobbies}
              profilePicture={profilePicture}
              setProfilePicture={setProfilePicture}
              roleTitle={roleTitle}
              setRoleTitle={setRoleTitle}
              additionalFields={additionalFields}
              handlers={handlers}
            />
            <div className="editor-preview">
              <div className="flex justify-between items-center mb-4">
                <h2 className="section-heading">Live Preview</h2>
                <div className="action-buttons flex gap-2">
                  <button
                    onClick={() => setIsTemplatePopupOpen(true)}
                    disabled={loading || switchingTemplate || !isPreviewReady}
                    className="btn-primary action-btn flex items-center space-x-2"
                  >
                    <span>Switch Template</span>
                  </button>
                </div>
              </div>
              {renderResumePreview()}
            </div>
          </>
        )}
      </div>
      <div className="editor-actions">
        <button onClick={() => saveResume(false)} disabled={loading || switchingTemplate} className="btn-primary action-btn">
          Save Resume
        </button>
        <button onClick={downloadResume} disabled={loading || switchingTemplate} className="btn-primary action-btn">
          Download PDF
        </button>
      </div>
      <TemplateSwitcher
        isOpen={isTemplatePopupOpen}
        onClose={() => setIsTemplatePopupOpen(false)}
        currentTemplate={template}
        onSelectTemplate={handleSwitchTemplate}
      />
    </div>
  );
}

export default Editor;
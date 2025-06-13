import React from 'react';

function EditorForm({
  personalInfo,
  setPersonalInfo,
  summary,
  setSummary,
  education,
  experience,
  projects,
  techSkills,
  setTechSkills,
  softSkills,
  setSoftSkills,
  certifications,
  languages,
  hobbies,
  profilePicture,
  setProfilePicture,
  roleTitle,
  setRoleTitle,
  additionalFields,
  handlers,
}) {
  return (
    <div className="editor-form">
      <h2 className="section-heading">Enter Resume Details</h2>
      <form className="details-form">
        {/* Profile Picture */}
        <div className="form-section">
          <h3 className="form-section-title">Profile Picture</h3>
          <div className="form-group">
            <label className="form-label">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => setProfilePicture(reader.result);
                  reader.readAsDataURL(file);
                }
              }}
              className="form-input"
            />
            {profilePicture && (
              <img src={profilePicture} alt="Preview" className="mt-2 w-24 h-24 rounded-full object-cover" />
            )}
          </div>
        </div>

        {/* Role Title */}
        <div className="form-section">
          <h3 className="form-section-title">Role Title</h3>
          <div className="form-group">
            <label className="form-label">Job Title</label>
            <input
              type="text"
              value={roleTitle || ''}
              onChange={(e) => setRoleTitle(e.target.value)}
              placeholder="E.g., Senior App Developer"
              className="form-input"
            />
          </div>
        </div>

        {/* Personal Info */}
        <div className="form-section">
          <h3 className="form-section-title">Personal Info</h3>
          {['name', 'email', 'phone', 'linkedin', 'portfolio', 'address', 'github', 'twitter', 'stackoverflow'].map((field) => (
            <div key={field} className="form-group">
              <label className="form-label capitalize">{field}</label>
              <input
                type={field === 'email' ? 'email' : field === 'linkedin' || field === 'portfolio' || field === 'github' || field === 'twitter' || field === 'stackoverflow' ? 'url' : 'text'}
                value={personalInfo[field] || ''}
                onChange={(e) => setPersonalInfo({ ...personalInfo, [field]: e.target.value })}
                placeholder={`Enter your ${field}`}
                className="form-input"
              />
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="form-section">
          <h3 className="form-section-title">Summary</h3>
          <textarea
            value={summary || ''}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Brief professional summary"
            className="form-textarea"
          />
        </div>

        {/* Education */}
        <div className="form-section">
          <div className="form-section-header">
            <h3 className="form-section-title">Education</h3>
            <button type="button" onClick={handlers.education.add} className="btn-primary add-btn">
              <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add
            </button>
          </div>
          {education.map((item, index) => (
            <div key={index} className="form-item">
              {['degree', 'institution', 'year'].map((field, i) => (
                <div key={field} className="form-group">
                  <input
                    type="text"
                    value={item[field] || ''}
                    onChange={(e) => handlers.education.update(index, field, e.target.value)}
                    placeholder={['Degree', 'Institution', 'Year'][i]}
                    className="form-input"
                  />
                </div>
              ))}
              {education.length > 1 && (
                <button type="button" onClick={() => handlers.education.delete(index)} className="btn-danger delete-btn">
                  <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6L18 18" />
                  </svg>
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Experience */}
        <div className="form-section">
          <div className="form-section-header">
            <h3 className="form-section-title">Experience</h3>
            <button type="button" onClick={handlers.experience.add} className="btn-primary add-btn">
              <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add
            </button>
          </div>
          {experience.map((item, index) => (
            <div key={index} className="form-item">
              {['company', 'role', 'duration', 'description'].map((field, i) => (
                <div key={field} className="form-group">
                  {field === 'description' ? (
                    <textarea
                      value={item[field] || ''}
                      onChange={(e) => handlers.experience.update(index, field, e.target.value)}
                      placeholder="Description (one point per line)"
                      className="form-textarea"
                    />
                  ) : (
                    <input
                      type="text"
                      value={item[field] || ''}
                      onChange={(e) => handlers.experience.update(index, field, e.target.value)}
                      placeholder={['Company', 'Role', 'Duration (e.g., 2020-2022)', 'Description'][i]}
                      className="form-input"
                    />
                  )}
                </div>
              ))}
              {experience.length > 1 && (
                <button type="button" onClick={() => handlers.experience.delete(index)} className="btn-danger delete-btn">
                  <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6L18 18" />
                  </svg>
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Projects */}
        <div className="form-section">
          <div className="form-section-header">
            <h3 className="form-section-title">Projects</h3>
            <button type="button" onClick={handlers.projects.add} className="btn-primary add-btn">
              <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add
            </button>
          </div>
          {projects.map((item, index) => (
            <div key={index} className="form-item">
              {['name', 'description', 'link'].map((field, i) => (
                <div key={field} className="form-group">
                  {field === 'description' ? (
                    <textarea
                      value={item[field] || ''}
                      onChange={(e) => handlers.projects.update(index, field, e.target.value)}
                      placeholder="Description"
                      className="form-textarea"
                    />
                  ) : (
                    <input
                      type={field === 'link' ? 'url' : 'text'}
                      value={item[field] || ''}
                      onChange={(e) => handlers.projects.update(index, field, e.target.value)}
                      placeholder={['Project Name', 'Description', 'Project Link'][i]}
                      className="form-input"
                    />
                  )}
                </div>
              ))}
              {projects.length > 1 && (
                <button type="button" onClick={() => handlers.projects.delete(index)} className="btn-danger delete-btn">
                  <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6L18 18" />
                  </svg>
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Tech Skills */}
        <div className="form-section">
          <div className="form-section-header">
            <h3 className="form-section-title">Tech Skills</h3>
            <button type="button" onClick={handlers.techSkills.add} className="btn-primary add-btn">
              <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add
            </button>
          </div>
          {techSkills.map((skill, index) => (
            <div key={index} className="form-item skill-item">
              <div className="form-group">
                <input
                  type="text"
                  value={skill.name || ''}
                  onChange={(e) => handlers.techSkills.update(index, 'name', e.target.value)}
                  placeholder="Skill (e.g., JavaScript)"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={skill.proficiency ?? 90}
                  onChange={(e) => handlers.techSkills.update(index, 'proficiency', parseInt(e.target.value))}
                  placeholder="Proficiency (0-100)"
                  className="form-input"
                />
              </div>
              {techSkills.length > 1 && (
                <button type="button" onClick={() => handlers.techSkills.delete(index)} className="btn-danger delete-btn">
                  <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6L18 18" />
                  </svg>
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Soft Skills */}
        <div className="form-section">
          <div className="form-section-header">
            <h3 className="form-section-title">Soft Skills</h3>
            <button type="button" onClick={handlers.softSkills.add} className="btn-primary add-btn">
              <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add
            </button>
          </div>
          {softSkills.map((skill, index) => (
            <div key={index} className="form-item skill-item">
              <input
                type="text"
                value={skill || ''}
                onChange={(e) => handlers.softSkills.update(index, e.target.value)}
                placeholder="Skill (e.g., Leadership)"
                className="form-input"
              />
              {softSkills.length > 1 && (
                <button type="button" onClick={() => handlers.softSkills.delete(index)} className="btn-danger delete-btn">
                  <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6L18 18" />
                  </svg>
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="form-section">
          <div className="form-section-header">
            <h3 className="form-section-title">Certifications</h3>
            <button type="button" onClick={handlers.certifications.add} className="btn-primary add-btn">
              <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add
            </button>
          </div>
          {certifications.map((item, index) => (
            <div key={index} className="form-item">
              {['name', 'issuer', 'year'].map((field, i) => (
                <div key={field} className="form-group">
                  <input
                    type="text"
                    value={item[field] || ''}
                    onChange={(e) => handlers.certifications.update(index, field, e.target.value)}
                    placeholder={['Certification', 'Issuer', 'Year'][i]}
                    className="form-input"
                  />
                </div>
              ))}
              {certifications.length > 1 && (
                <button type="button" onClick={() => handlers.certifications.delete(index)} className="btn-danger delete-btn">
                  <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6L18 18" />
                  </svg>
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Languages */}
        <div className="form-section">
          <div className="form-section-header">
            <h3 className="form-section-title">Languages</h3>
            <button type="button" onClick={handlers.languages.add} className="btn-primary add-btn">
              <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add
            </button>
          </div>
          {languages.map((item, index) => (
            <div key={index} className="form-item">
              {['language', 'proficiency', 'proficiencyLevel'].map((field, i) => (
                <div key={field} className="form-group">
                  {field === 'proficiencyLevel' ? (
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={item[field] ?? 0}
                      onChange={(e) => handlers.languages.update(index, field, parseFloat(e.target.value))}
                      placeholder="Proficiency Level (0-10)"
                      className="form-input"
                    />
                  ) : (
                    <input
                      type="text"
                      value={item[field] || ''}
                      onChange={(e) => handlers.languages.update(index, field, e.target.value)}
                      placeholder={['Language', 'Proficiency (e.g., Fluent)', 'Proficiency Level'][i]}
                      className="form-input"
                    />
                  )}
                </div>
              ))}
              {languages.length > 1 && (
                <button type="button" onClick={() => handlers.languages.delete(index)} className="btn-danger delete-btn">
                  <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6L18 18" />
                  </svg>
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Hobbies */}
        <div className="form-section">
          <div className="form-section-header">
            <h3 className="form-section-title">Hobbies</h3>
            <button type="button" onClick={handlers.hobbies.add} className="btn-primary add-btn">
              <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add
            </button>
          </div>
          {hobbies.map((hobby, index) => (
            <div key={index} className="form-item skill-item">
              <input
                type="text"
                value={hobby || ''}
                onChange={(e) => handlers.hobbies.update(index, e.target.value)}
                placeholder="Hobby (e.g., Reading)"
                className="form-input"
              />
              {hobbies.length > 1 && (
                <button type="button" onClick={() => handlers.hobbies.delete(index)} className="btn-danger delete-btn">
                  <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6L18 18" />
                  </svg>
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Additional Fields */}
        <div className="form-section">
          <div className="form-section-header">
            <h3 className="form-section-title">Additional Fields</h3>
            <button type="button" onClick={handlers.additionalFields.add} className="btn-primary add-btn">
              <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Section
            </button>
          </div>
          {additionalFields.map((field, fieldIndex) => (
            <div key={fieldIndex} className="form-item">
              <div className="form-group">
                <label className="form-label">Section Title</label>
                <input
                  type="text"
                  value={field.title || ''}
                  onChange={(e) => handlers.additionalFields.updateTitle(fieldIndex, e.target.value)}
                  placeholder="E.g., Awards"
                  className="form-input"
                />
              </div>
              {field.content.map((item, itemIndex) => (
                <div key={itemIndex} className="form-item">
                  {['name', 'year'].map((subField) => (
                    <div key={subField} className="form-group">
                      <input
                        type="text"
                        value={item[subField] || ''}
                        onChange={(e) => handlers.additionalFields.updateContent(fieldIndex, itemIndex, subField, e.target.value)}
                        placeholder={subField === 'name' ? 'Item Name' : 'Year'}
                        className="form-input"
                      />
                    </div>
                  ))}
                  {field.content.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handlers.additionalFields.deleteContentItem(fieldIndex, itemIndex)}
                      className="btn-danger delete-btn"
                    >
                      <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6L18 18" />
                      </svg>
                      Delete Item
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => handlers.additionalFields.addContentItem(fieldIndex)}
                className="btn-primary add-btn mt-2"
              >
                Add Item
              </button>
              {additionalFields.length > 0 && (
                <button
                  type="button"
                  onClick={() => handlers.additionalFields.delete(fieldIndex)}
                  className="btn-danger delete-btn mt-2"
                >
                  <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6L18 18" />
                  </svg>
                  Delete Section
                </button>
              )}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

export default EditorForm;

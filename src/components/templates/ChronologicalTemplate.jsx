import React from 'react';

function ChronologicalTemplate({
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
  additionalFields,
  isSectionEmpty,
}) {
  return (
    <div className="resume-container">
      {/* Header */}
      <div className="resume-header">
        <h1>{personalInfo.name || 'Your Name'}</h1>
        <p>
          {personalInfo.address && <span>{personalInfo.address}</span>}
          {personalInfo.phone && <span>{personalInfo.address && ' · '}({personalInfo.phone})</span>}
        </p>
        <p>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.linkedin && <span>{personalInfo.email && ' · '}<a href={personalInfo.linkedin}>{personalInfo.linkedin}</a></span>}
        </p>
        <p>
          {personalInfo.portfolio && <a href={personalInfo.portfolio}>{personalInfo.portfolio}</a>}
          {personalInfo.github && <span>{personalInfo.portfolio && ' · '}<a href={personalInfo.github}>{personalInfo.github}</a></span>}
        </p>
      </div>

      {/* Summary */}
      {!isSectionEmpty(summary, false) && (
        <div className="resume-section">
          <h2>Summary</h2>
          <p>{summary}</p>
        </div>
      )}

      {/* Skills */}
      {(!isSectionEmpty(techSkills) || !isSectionEmpty(softSkills)) && (
        <div className="resume-section">
          <h2>Skills</h2>
          <ul>
            {techSkills.map((skill, index) => (
              skill.name && (
                <li key={`tech-${index}`}>
                  {skill.name} {skill.proficiency && `(${skill.proficiency}%)`}
                </li>
              )
            ))}
            {softSkills.map((skill, index) => (
              skill && (
                <li key={`soft-${index}`}>
                  {skill}
                </li>
              )
            ))}
          </ul>
        </div>
      )}

      {/* Industry Experience */}
      {!isSectionEmpty(experience) && (
        <div className="resume-section">
          <h2>Industry Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} className="resume-item">
              <h3>{exp.company && exp.role ? `${exp.company}, ${exp.role}` : exp.role || 'Role'}</h3>
              {exp.description && (
                <ul>
                  {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {!isSectionEmpty(education) && (
        <div className="resume-section">
          <h2>Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="resume-item">
              <h3>
                {edu.degree || 'Degree'}
                {edu.year && `, ${edu.year}`}
              </h3>
              <p>{edu.institution || 'Institution'}</p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {!isSectionEmpty(projects) && (
        <div className="resume-section">
          <h2>Projects</h2>
          {projects.map((proj, index) => (
            <div key={index} className="resume-item">
              <h3>{proj.name || 'Project'}</h3>
              {proj.description && <p>{proj.description}</p>}
              {proj.link && <p><a href={proj.link}>{proj.link}</a></p>}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {!isSectionEmpty(certifications) && (
        <div className="resume-section">
          <h2>Certifications</h2>
          <ul>
            {certifications.map((cert, index) => (
              cert.name && (
                <li key={index}>
                  {cert.name}
                  {(cert.issuer || cert.year) && (
                    <span>
                      {cert.issuer && `, ${cert.issuer}`}
                      {cert.year && `, ${cert.year}`}
                    </span>
                  )}
                </li>
              )
            ))}
          </ul>
        </div>
      )}

      {/* Languages */}
      {!isSectionEmpty(languages) && (
        <div className="resume-section">
          <h2>Languages</h2>
          {languages.map((lang, index) => (
            <div key={index} className="resume-item">
              <p>
                {lang.language || 'Language'}: {lang.proficiency || 'Proficiency'} (Level: {lang.proficiencyLevel || 0}/10)
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Hobbies */}
      {!isSectionEmpty(hobbies) && (
        <div className="resume-section">
          <h2>Hobbies</h2>
          <p>{hobbies.filter(hobby => hobby).join(', ')}</p>
        </div>
      )}

      {/* Additional Fields */}
      {!isSectionEmpty(additionalFields) && additionalFields.map((field, index) => (
        !isSectionEmpty(field.content) && (
          <div key={index} className="resume-section">
            <h2>{field.title || 'Additional Section'}</h2>
            {field.content.map((item, i) => (
              <div key={i} className="resume-item">
                <h3>{item.name || 'Item'}</h3>
                {item.year && <p>{item.year}</p>}
              </div>
            ))}
          </div>
        )
      ))}
    </div>
  );
}

export default ChronologicalTemplate;
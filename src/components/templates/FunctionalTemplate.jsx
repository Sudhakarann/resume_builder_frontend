import React from 'react';

const FunctionalTemplate = ({
  personalInfo,
  summary,
  education,
  experience,
  projects,
  techSkills = [],
  softSkills = [],
  certifications,
  languages,
  hobbies,
  profilePicture,
  roleTitle,
  additionalFields = [],
  isSectionEmpty,
}) => {
  return (
    <div>
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          .resume-container {
            min-height: 100%;
            background: #eee;
            font-family: 'Lato', sans-serif;
            font-weight: 400;
            color: #222;
            font-size: 14px;
            line-height: 22px;
            padding-bottom: 30px;
            
          }
          .container {
            max-width: 700px;
            background: #fff;
            margin: 0px auto 0px;
            box-shadow: 1px 1px 2px #DAD7D7;
            border-radius: 3px;
            padding: 30px;
            margin-top: 30px;
          }
          .header {
            margin-bottom: 20px;
          }
          .full-name {
            font-size: 36px;
            text-transform: uppercase;
            margin-bottom: 4px;
          }
          .first-name {
            font-weight: 700;
          }
          .last-name {
            font-weight: 300;
          }
          .contact-info {
            margin-bottom: 15px;
          }
          .email,
          .phone {
            color: #999;
            font-weight: 300;
          }
          .separator {
            height: 8px;
            display: inline-block;
            border-left: 2px solid #999;
            margin: 0px 8px;
          }
          .position {
            font-weight: bold;
            display: inline-block;
            margin-right: 8px;
            text-decoration: underline;
          }
          .details {
            line-height: 18px;
          }
          .section {
            margin-bottom: 25px;
          }
          .section:last-of-type {
            margin-bottom: 0px;
          }
          .section__title {
            letter-spacing: 2px;
            color: #54AFE4;
            font-weight: bold;
            margin-bottom: 8px;
            text-transform: uppercase;
          }
          .section__list-item {
            margin-bottom: 25px;
          }
          .section__list-item:last-of-type {
            margin-bottom: 0;
          }
          .left,
          .right {
            vertical-align: top;
            display: inline-block;
          }
          .left {
            width: 60%;
          }
          .right {
            text-align: right;
            width: 39%;
          }
          .name {
            font-weight: bold;
          }
          a {
            text-decoration: none;
            color: #000;
            font-style: italic;
          }
          a:hover {
            text-decoration: underline;
            color: #000;
          }
          .skills__item {
            margin-bottom: 8px;
          }
          .skills__item .right {
            input {
              display: none;
            }
            label {
              display: inline-block;
              width: 16px;
              height: 16px;
              background: #C3DEF3;
              border-radius: 16px;
              margin-right: 2px;
            }
            input:checked + label {
              background: #79A9CE;
            }
          }
          /* Text justification styles */
          p, .desc, .text, .addr, .duration {
            text-align: justify;
          }
          .section__list-item .desc {
            text-align: justify;
          }
          .about .desc {
            text-align: justify;
          }
          /* Additional spacing adjustments */
          .section__list {
            margin-top: 8px;
          }
          .section__list-item > div {
            margin-bottom: 4px;
          }
          .section__list-item .name {
            margin-bottom: 2px;
          }
          .section__list-item .text {
            margin-top: 2px;
          }
          .skills {
            margin-top: 8px;
          }
          .about {
            margin-top: 8px;
          }
        `}
      </style>
      <link
        href="https://fonts.googleapis.com/css?family=Lato:400,300,700"
        rel="stylesheet"
        type="text/css"
      />
      <div className="resume-container">
        <div className="container">
          <div className="header">
            <div className="full-name">
              <span className="first-name">{personalInfo.name?.split(' ')[0] || 'John'}</span>{' '}
              <span className="last-name">{personalInfo.name?.split(' ').slice(1).join(' ') || 'Doe'}</span>
            </div>
            <div className="contact-info">
              {personalInfo.email && (
                <>
                  <span className="email">Email: </span>
                  <span className="email-val">{personalInfo.email}</span>
                </>
              )}
              {personalInfo.phone && (
                <>
                  <span className="separator"></span>
                  <span className="phone">Phone: </span>
                  <span className="phone-val">{personalInfo.phone}</span>
                </>
              )}
            </div>
            {!isSectionEmpty(summary, false) && (
              <div className="about">
                <span className="position">{roleTitle || 'Your Role'} </span>
                <span className="desc">{summary}</span>
              </div>
            )}
          </div>
          <div className="details">
            {!isSectionEmpty(experience) && (
              <div className="section">
                <div className="section__title">Experience</div>
                <div className="section__list">
                  {experience.map(
                    (exp, index) =>
                      exp.company && (
                        <div key={index} className="section__list-item">
                          <div className="left">
                            <div className="name">{exp.company}</div>
                            <div className="addr">{exp.location || 'Location'}</div>
                            <div className="duration">{exp.duration}</div>
                          </div>
                          <div className="right">
                            <div className="name">{exp.role}</div>
                            <div className="desc">
                              {exp.description
                                ?.split('\n')
                                .map((point, i) => point.trim() && <div key={i}>{point}</div>)}
                            </div>
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>
            )}
            {!isSectionEmpty(education) && (
              <div className="section">
                <div className="section__title">Education</div>
                <div className="section__list">
                  {education.map(
                    (edu, index) =>
                      edu.degree && (
                        <div key={index} className="section__list-item">
                          <div className="left">
                            <div className="name">{edu.institution}</div>
                            <div className="addr">{edu.location || 'Location'}</div>
                            <div className="duration">{edu.year}</div>
                          </div>
                          <div className="right">
                            <div className="name">{edu.degree}</div>
                            <div className="desc">{edu.description || 'Relevant coursework'}</div>
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>
            )}
            {!isSectionEmpty(projects) && (
              <div className="section">
                <div className="section__title">Projects</div>
                <div className="section__list">
                  {projects.map(
                    (proj, index) =>
                      proj.name && (
                        <div key={index} className="section__list-item">
                          <div className="name">
                            <a
                              href={proj.link || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {proj.name}
                            </a>
                          </div>
                          <div className="text">{proj.description}</div>
                        </div>
                      )
                  )}
                </div>
              </div>
            )}
            {(!isSectionEmpty(techSkills) || !isSectionEmpty(softSkills)) && (
              <div className="section">
                <div className="section__title">Skills</div>
                <div className="skills">
                  {techSkills.map(
                    (skill, index) =>
                      skill.name && (
                        <div key={index} className="skills__item">
                          <div className="left">
                            <div className="name">{skill.name}</div>
                          </div>
                          <div className="right">
                            {[...Array(5)].map((_, i) => {
                              const isChecked = i < Math.round((skill.proficiency || 90) / 20);
                              return (
                                <React.Fragment key={i}>
                                  <input
                                    id={`ck-${index}-${i}`}
                                    type="checkbox"
                                    checked={isChecked}
                                    readOnly
                                  />
                                  <label htmlFor={`ck-${index}-${i}`}></label>
                                </React.Fragment>
                              );
                            })}
                          </div>
                        </div>
                      )
                  )}
                  {softSkills.map(
                    (skill, index) =>
                      skill.trim() && (
                        <div key={`soft-${index}`} className="skills__item">
                          <div className="left">
                            <div className="name">{skill}</div>
                          </div>
                          <div className="right"></div>
                        </div>
                      )
                  )}
                </div>
              </div>
            )}
            {!isSectionEmpty(certifications) && (
              <div className="section">
                <div className="section__title">Certifications</div>
                <div className="section__list">
                  {certifications.map(
                    (cert, index) =>
                      cert.name && (
                        <div key={index} className="section__list-item">
                          <div className="name">{cert.name}</div>
                          <div className="text">
                            {cert.issuer} - {cert.year}
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>
            )}
            {!isSectionEmpty(languages) && (
              <div className="section">
                <div className="section__title">Languages</div>
                <div className="section__list">
                  {languages.map(
                    (lang, index) =>
                      lang.language && (
                        <div key={index} className="section__list-item">
                          <div className="name">{lang.language}</div>
                          <div className="text">{lang.proficiency}</div>
                        </div>
                      )
                  )}
                </div>
              </div>
            )}
            {!isSectionEmpty(hobbies) && (
              <div className="section">
                <div className="section__title">Interests</div>
                <div className="section__list">
                  <div className="section__list-item">
                    {hobbies.filter((hobby) => hobby.trim()).join(', ')}
                  </div>
                </div>
              </div>
            )}
            {additionalFields.map(
              (field, index) =>
                !isSectionEmpty(field.content) && (
                  <div key={index} className="section">
                    <div className="section__title">{field.title}</div>
                    <div className="section__list">
                      {field.content.map(
                        (item, i) =>
                          item.name && (
                            <div key={i} className="section__list-item">
                              <div className="name">{item.name}</div>
                              {item.year && <div className="text">{item.year}</div>}
                            </div>
                          )
                      )}
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunctionalTemplate;
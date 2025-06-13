// import React from 'react';

// function PillarTemplate({
//   personalInfo,
//   summary,
//   education,
//   experience,
//   projects,
//   techSkills,
//   softSkills,
//   certifications,
//   languages,
//   hobbies,
//   profilePicture,
//   roleTitle,
//   additionalFields,
//   isSectionEmpty,
// }) {
//   const awards = additionalFields.find(field => field.title.toLowerCase() === 'awards')?.content || [];

//   return (
//     <div className="resume-container flex w-[8.27in] min-h-[11in] mx-auto bg-gray-50 shadow-sm font-roboto text-sm text-black"> {/* Changed text-gray-900 to text-black */}
//       {/* Header */}
//       <div className="resume-header w-full bg-gray-800 text-white pt-4 pb-2"> {/* Keep text-white for header */}
//         <div className="flex flex-col md:flex-row items-center px-4">
//           <div className="w-32 h-32 mr-4 mb-4 md:mb-0">
//             <img
//               src={profilePicture || 'https://via.placeholder.com/150'}
//               alt="Profile"
//               className="w-full h-full rounded-full object-cover"
//             />
//           </div>
//           <div className="flex-grow text-center md:text-left text-black">
//             <div className="flex flex-col md:flex-row justify-between items-center">
//               <div className="primary-info">
//                 <h1 className="text-2xl font-bold uppercase text-black">{personalInfo.name || 'Your Name'}</h1>
//                 <div className="text-lg mb-2 text-black">{roleTitle || 'Your Role'}</div>
//                 <ul className="list-none space-y-1">
//                   {personalInfo.email && (
//                     <li>
//                       <a href={`mailto:${personalInfo.email}`} className="hover:underline"> {/* Keep text-white */}
//                         <i className="far fa-envelope mr-2 text-black"></i>{personalInfo.email}
//                       </a>
//                     </li>
//                   )}
//                   {personalInfo.phone && (
//                     <li>
//                       <a href={`tel:${personalInfo.phone}`} className="hover:underline"> {/* Keep text-white */}
//                         <i className="fas fa-mobile-alt mr-2 text-black"></i>{personalInfo.phone}
//                       </a>
//                     </li>
//                   )}
//                 </ul>
//               </div>
//               <div className="secondary-info mt-2 md:mt-0">
//                 <ul className="list-none space-y-1">
//                   {personalInfo.linkedin && (
//                     <li>
//                       <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline"> {/* Keep text-white */}
//                         <i className="fab fa-linkedin-in mr-2"></i>LinkedIn
//                       </a>
//                     </li>
//                   )}
//                   {personalInfo.github && (
//                     <li>
//                       <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:underline"> {/* Keep text-white */}
//                         <i className="fab fa-github-alt mr-2"></i>GitHub
//                       </a>
//                     </li>
//                   )}
//                   {personalInfo.portfolio && (
//                     <li>
//                       <a href={personalInfo.portfolio} target="_blank" rel="noopener noreferrer" className="hover:underline"> {/* Keep text-white */}
//                         <i className="fas fa-globe mr-2"></i>Portfolio
//                       </a>
//                     </li>
//                   )}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Body */}
//       <div className="flex w-full p-5">
//         {/* Left Column */}
//         <div className="w-3/4 pr-4">
//           {/* Summary */}
//           {!isSectionEmpty(summary, false) && (
//             <div className="resume-section mb-5">
//               <h2 className="text-lg font-bold uppercase border-b-2 border-gray-800 pb-2 mb-3">Career Summary</h2>
//               <p>{summary}</p>
//             </div>
//           )}

//           {/* Work Experience */}
//           {!isSectionEmpty(experience) && (
//             <div className="resume-section mb-5">
//               <h2 className="text-lg font-bold uppercase border-b-2 border-gray-800 pb-2 mb-3">Work Experience</h2>
//               <div className="relative pl-5">
//                 {experience.map((exp, index) => (
//                   exp.company && (
//                     <div key={index} className="mb-5 relative">
//                       <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-gray-800"></div>
//                       <div className="absolute left-1 top-4 bottom-0 w-0.5 bg-gray-800"></div>
//                       <div className="flex justify-between mb-1">
//                         <h3 className="font-bold">{exp.role || 'Role'}</h3>
//                         <div>{exp.company}</div>
//                       </div>
//                       <div className="text-sm text-black mb-2">{exp.duration || 'Duration'}</div> {/* Changed text-gray-600 to text-black */}
//                       {exp.description && (
//                         <div>
//                           <p>{exp.description.split('\n')[0]}</p>
//                           {exp.description.split('\n').length > 1 && (
//                             <>
//                               <h4 className="font-bold mt-2">Achievements:</h4>
//                               <ul className="list-disc pl-5">
//                                 {exp.description.split('\n').slice(1).map((point, i) => point.trim() && <li key={i}>{point}</li>)}
//                               </ul>
//                             </>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   )
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Projects */}
//           {!isSectionEmpty(projects) && (
//             <div className="resume-section mb-5">
//               <h2 className="text-lg font-bold uppercase border-b-2 border-gray-800 pb-2 mb-3">Projects</h2>
//               <ul className="space-y-4">
//                 {projects.map((proj, index) => (
//                   proj.name && (
//                     <li key={index}>
//                       <a
//                         href={proj.link || '#'}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="font-bold hover:underline"
//                       >
//                         {proj.name}
//                       </a>
//                       <p>{proj.description}</p>
//                     </li>
//                   )
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Certifications */}
//           {!isSectionEmpty(certifications) && (
//             <div className="resume-section mb-5">
//               <h2 className="text-lg font-bold uppercase border-b-2 border-gray-800 pb-2 mb-3">Certifications</h2>
//               <ul className="space-y-2">
//                 {certifications.map((cert, index) => (
//                   cert.name && (
//                     <li key={index}>
//                       <div className="font-bold">{cert.name}</div>
//                       <div className="text-sm text-black"> {/* Changed text-gray-600 to text-black */}
//                         {cert.issuer && `${cert.issuer}`}
//                         {cert.year && `${cert.issuer ? ' - ' : ''}${cert.year}`}
//                       </div>
//                     </li>
//                   )
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>

//         {/* Right Column */}
//         <div className="w-1/4">
//           {/* Skills */}
//           {(!isSectionEmpty(techSkills) || !isSectionEmpty(softSkills)) && (
//             <div className="resume-section mb-5">
//               <h2 className="text-lg font-bold uppercase border-b-2 border-gray-800 pb-2 mb-3">Skills & Tools</h2>
//               {techSkills.length > 0 && (
//                 <div className="mb-4">
//                   <h4 className="font-bold">Frontend</h4>
//                   <ul className="space-y-2">
//                     {techSkills
//                       .filter(skill => skill.name.toLowerCase().includes('react') || skill.name.toLowerCase().includes('angular') || skill.name.toLowerCase().includes('javascript') || skill.name.toLowerCase().includes('html') || skill.name.toLowerCase().includes('css'))
//                       .map((skill, index) => (
//                         skill.name && (
//                           <li key={index}>
//                             <div>{skill.name}</div>
//                             <div className="w-full bg-gray-200 h-2 rounded">
//                               <div
//                                 className="bg-gray-800 h-2 rounded"
//                                 style={{ width: `${skill.proficiency || 90}%` }}
//                               ></div>
//                             </div>
//                           </li>
//                         )
//                       ))}
//                   </ul>
//                 </div>
//               )}
//               {techSkills.length > 0 && (
//                 <div className="mb-4">
//                   <h4 className="font-bold">Backend</h4>
//                   <ul className="space-y-2">
//                     {techSkills
//                       .filter(skill => skill.name.toLowerCase().includes('python') || skill.name.toLowerCase().includes('django') || skill.name.toLowerCase().includes('php') || skill.name.toLowerCase().includes('ruby'))
//                       .map((skill, index) => (
//                         skill.name && (
//                           <li key={index}>
//                             <div>{skill.name}</div>
//                             <div className="w-full bg-gray-200 h-2 rounded">
//                               <div
//                                 className="bg-gray-800 h-2 rounded"
//                                 style={{ width: `${skill.proficiency || 90}%` }}
//                               ></div>
//                             </div>
//                           </li>
//                         )
//                       ))}
//                   </ul>
//                 </div>
//               )}
//               {softSkills.length > 0 && (
//                 <div>
//                   <h4 className="font-bold">Others</h4>
//                   <ul className="flex flex-wrap gap-2">
//                     {softSkills.map((skill, index) => (
//                       skill && (
//                         <li key={index}>
//                           <span className="badge bg-gray-200 text-black px-2 py-1 rounded">{skill}</span> {/* Changed text-gray-800 to text-black */}
//                         </li>
//                       )
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Education */}
//           {!isSectionEmpty(education) && (
//             <div className="resume-section mb-5">
//               <h2 className="text-lg font-bold uppercase border-b-2 border-gray-800 pb-2 mb-3">Education</h2>
//               <ul className="space-y-2">
//                 {education.map((edu, index) => (
//                   edu.degree && (
//                     <li key={index}>
//                       <div className="font-bold">{edu.degree}</div>
//                       <div>{edu.institution}</div>
//                       <div className="text-sm text-black">{edu.year}</div> {/* Changed text-gray-600 to text-black */}
//                     </li>
//                   )
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Awards */}
//           {!isSectionEmpty(awards) && (
//             <div className="resume-section mb-5">
//               <h2 className="text-lg font-bold uppercase border-b-2 border-gray-800 pb-2 mb-3">Awards</h2>
//               <ul className="space-y-2">
//                 {awards.map((award, index) => (
//                   award.name && (
//                     <li key={index} className="relative pl-6">
//                       <i className="fas fa-trophy absolute left-0 top-1 text-black"></i> {/* Changed text-gray-800 to text-black */}
//                       <div className="font-bold">{award.name}</div>
//                       {award.year && <div className="text-sm text-black">{award.year}</div>} {/* Changed text-gray-600 to text-black */}
//                     </li>
//                   )
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Languages */}
//           {!isSectionEmpty(languages) && (
//             <div className="resume-section mb-5">
//               <h2 className="text-lg font-bold uppercase border-b-2 border-gray-800 pb-2 mb-3">Languages</h2>
//               <ul className="space-y-2">
//                 {languages.map((lang, index) => (
//                   lang.language && (
//                     <li key={index}>
//                       <span className="font-bold">{lang.language}</span>
//                       <span className="text-sm text-black"> ({lang.proficiency})</span> {/* Changed text-gray-600 to text-black */}
//                     </li>
//                   )
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Interests */}
//           {!isSectionEmpty(hobbies) && (
//             <div className="resume-section mb-5">
//               <h2 className="text-lg font-bold uppercase border-b-2 border-gray-800 pb-2 mb-3">Interests</h2>
//               <ul className="space-y-1">
//                 {hobbies.map((hobby, index) => (
//                   hobby && <li key={index}>{hobby}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PillarTemplate;

// import React from 'react';

// function PillarTemplate({
//   personalInfo,
//   summary,
//   education,
//   experience,
//   projects,
//   techSkills,
//   softSkills,
//   certifications,
//   languages,
//   hobbies,
//   additionalFields,
//   isSectionEmpty,
// }) {
//   return (
//     <div className="resume-container">
//       {/* Header */}
//       <div className="resume-header">
//         <h1>{personalInfo.name || 'Your Name'}</h1>
//         <p>
//           {personalInfo.address && <span>{personalInfo.address}</span>}
//           {personalInfo.phone && <span>{personalInfo.address && ' · '}({personalInfo.phone})</span>}
//         </p>
//         <p>
//           {personalInfo.email && <span>{personalInfo.email}</span>}
//           {personalInfo.linkedin && <span>{personalInfo.email && ' · '}<a href={personalInfo.linkedin}>{personalInfo.linkedin}</a></span>}
//         </p>
//         <p>
//           {personalInfo.portfolio && <a href={personalInfo.portfolio}>{personalInfo.portfolio}</a>}
//           {personalInfo.github && <span>{personalInfo.portfolio && ' · '}<a href={personalInfo.github}>{personalInfo.github}</a></span>}
//         </p>
//       </div>

//       {/* Summary */}
//       {!isSectionEmpty(summary, false) && (
//         <div className="resume-section">
//           <h2>Summary</h2>
//           <p>{summary}</p>
//         </div>
//       )}

//       {/* Skills */}
//       {(!isSectionEmpty(techSkills) || !isSectionEmpty(softSkills)) && (
//         <div className="resume-section">
//           <h2>Skills</h2>
//           <ul>
//             {techSkills.map((skill, index) => (
//               skill.name && (
//                 <li key={`tech-${index}`}>
//                   {skill.name} {skill.proficiency && `(${skill.proficiency}%)`}
//                 </li>
//               )
//             ))}
//             {softSkills.map((skill, index) => (
//               skill && (
//                 <li key={`soft-${index}`}>
//                   {skill}
//                 </li>
//               )
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Industry Experience */}
//       {!isSectionEmpty(experience) && (
//         <div className="resume-section">
//           <h2>Industry Experience</h2>
//           {experience.map((exp, index) => (
//             <div key={index} className="resume-item">
//               <h3>{exp.company && exp.role ? `${exp.company}, ${exp.role}` : exp.role || 'Role'}</h3>
//               {exp.description && (
//                 <ul>
//                   {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line}</li>)}
//                 </ul>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Education */}
//       {!isSectionEmpty(education) && (
//         <div className="resume-section">
//           <h2>Education</h2>
//           {education.map((edu, index) => (
//             <div key={index} className="resume-item">
//               <h3>
//                 {edu.degree || 'Degree'}
//                 {edu.year && `, ${edu.year}`}
//               </h3>
//               <p>{edu.institution || 'Institution'}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Projects */}
//       {!isSectionEmpty(projects) && (
//         <div className="resume-section">
//           <h2>Projects</h2>
//           {projects.map((proj, index) => (
//             <div key={index} className="resume-item">
//               <h3>{proj.name || 'Project'}</h3>
//               {proj.description && <p>{proj.description}</p>}
//               {proj.link && <p><a href={proj.link}>{proj.link}</a></p>}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Certifications */}
//       {!isSectionEmpty(certifications) && (
//         <div className="resume-section">
//           <h2>Certifications</h2>
//           <ul>
//             {certifications.map((cert, index) => (
//               cert.name && (
//                 <li key={index}>
//                   {cert.name}
//                   {(cert.issuer || cert.year) && (
//                     <span>
//                       {cert.issuer && `, ${cert.issuer}`}
//                       {cert.year && `, ${cert.year}`}
//                     </span>
//                   )}
//                 </li>
//               )
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Languages */}
//       {!isSectionEmpty(languages) && (
//         <div className="resume-section">
//           <h2>Languages</h2>
//           {languages.map((lang, index) => (
//             <div key={index} className="resume-item">
//               <p>
//                 {lang.language || 'Language'}: {lang.proficiency || 'Proficiency'} (Level: {lang.proficiencyLevel || 0}/10)
//               </p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Hobbies */}
//       {!isSectionEmpty(hobbies) && (
//         <div className="resume-section">
//           <h2>Hobbies</h2>
//           <p>{hobbies.filter(hobby => hobby).join(', ')}</p>
//         </div>
//       )}

//       {/* Additional Fields */}
//       {!isSectionEmpty(additionalFields) && additionalFields.map((field, index) => (
//         !isSectionEmpty(field.content) && (
//           <div key={index} className="resume-section">
//             <h2>{field.title || 'Additional Section'}</h2>
//             {field.content.map((item, i) => (
//               <div key={i} className="resume-item">
//                 <h3>{item.name || 'Item'}</h3>
//                 {item.year && <p>{item.year}</p>}
//               </div>
//             ))}
//           </div>
//         )
//       ))}
//     </div>
//   );
// }

// export default PillarTemplate;



import React from 'react';
import PropTypes from 'prop-types';

function PillarTemplate({
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
    <div
      style={{
        width: '8.27in', // A4 width
        minHeight: '11.69in', // A4 height
        margin: '0 auto',
        padding: '0.5in',
        backgroundColor: '#ffffff',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '12px',
        lineHeight: '1.5',
        color: '#333333',
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: '20px',
          textAlign: 'center',
          borderBottom: '2px solid #2c3e50',
          paddingBottom: '10px',
        }}
      >
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#2c3e50',
            margin: '0 0 10px 0',
          }}
        >
          {personalInfo.name || 'Your Name'}
        </h1>
        <p style={{ margin: '5px 0' }}>
          {personalInfo.address && <span>{personalInfo.address}</span>}
          {personalInfo.phone && (
            <span>
              {personalInfo.address && ' · '}({personalInfo.phone})
            </span>
          )}
        </p>
        <p style={{ margin: '5px 0' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.linkedin && (
            <span>
              {personalInfo.email && ' · '}
              <a
                href={personalInfo.linkedin}
                style={{ color: '#0077b5', textDecoration: 'none' }}
              >
                {personalInfo.linkedin}
              </a>
            </span>
          )}
        </p>
        <p style={{ margin: '5px 0' }}>
          {personalInfo.portfolio && (
            <a
              href={personalInfo.portfolio}
              style={{ color: '#0077b5', textDecoration: 'none' }}
            >
              {personalInfo.portfolio}
            </a>
          )}
          {personalInfo.github && (
            <span>
              {personalInfo.portfolio && ' · '}
              <a
                href={personalInfo.github}
                style={{ color: '#0077b5', textDecoration: 'none' }}
              >
                {personalInfo.github}
              </a>
            </span>
          )}
        </p>
      </div>

      {/* Summary */}
      {!isSectionEmpty(summary, false) && (
        <div
          style={{
            marginBottom: '20px',
          }}
        >
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#2c3e50',
              marginBottom: '10px',
              borderBottom: '1px solid #2c3e50',
            }}
          >
            Summary
          </h2>
          <p style={{ color: '#333333' }}>{summary}</p>
        </div>
      )}

      {/* Skills */}
      {(!isSectionEmpty(techSkills) || !isSectionEmpty(softSkills)) && (
        <div
          style={{
            marginBottom: '20px',
          }}
        >
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#2c3e50',
              marginBottom: '10px',
              borderBottom: '1px solid #2c3e50',
            }}
          >
            Skills
          </h2>
          <ul
            style={{
              listStyleType: 'disc',
              paddingLeft: '20px',
              color: '#333333',
            }}
          >
            {techSkills.map(
              (skill, index) =>
                skill.name && (
                  <li key={`tech-${index}`}>
                    {skill.name} {skill.proficiency && `(${skill.proficiency}%)`}
                  </li>
                )
            )}
            {softSkills.map(
              (skill, index) =>
                skill && (
                  <li key={`soft-${index}`}>
                    {skill}
                  </li>
                )
            )}
          </ul>
        </div>
      )}

      {/* Industry Experience */}
      {!isSectionEmpty(experience) && (
        <div
          style={{
            marginBottom: '20px',
          }}
        >
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#2c3e50',
              marginBottom: '10px',
              borderBottom: '1px solid #2c3e50',
            }}
          >
            Industry Experience
          </h2>
          {experience.map(
            (exp, index) =>
              exp.company && (
                <div
                  key={index}
                  style={{
                    marginBottom: '15px',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#2c3e50',
                      marginBottom: '5px',
                    }}
                  >
                    {exp.company && exp.role
                      ? `${exp.company}, ${exp.role}`
                      : exp.role || 'Role'}
                    {exp.duration && ` (${exp.duration})`}
                  </h3>
                  {exp.description && (
                    <ul
                      style={{
                        listStyleType: 'disc',
                        paddingLeft: '20px',
                        color: '#333333',
                      }}
                    >
                      {exp.description.split('\n').map(
                        (line, i) =>
                          line.trim() && (
                            <li key={i} style={{ marginBottom: '5px' }}>
                              {line}
                            </li>
                          )
                      )}
                    </ul>
                  )}
                </div>
              )
          )}
        </div>
      )}

      {/* Education */}
      {!isSectionEmpty(education) && (
        <div
          style={{
            marginBottom: '20px',
          }}
        >
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#2c3e50',
              marginBottom: '10px',
              borderBottom: '1px solid #2c3e50',
            }}
          >
            Education
          </h2>
          {education.map(
            (edu, index) =>
              edu.degree && (
                <div
                  key={index}
                  style={{
                    marginBottom: '15px',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#2c3e50',
                      marginBottom: '5px',
                    }}
                  >
                    {edu.degree || 'Degree'}
                    {edu.year && `, ${edu.year}`}
                  </h3>
                  <p style={{ color: '#333333' }}>
                    {edu.institution || 'Institution'}
                  </p>
                </div>
              )
          )}
        </div>
      )}

      {/* Projects */}
      {!isSectionEmpty(projects) && (
        <div
          style={{
            marginBottom: '20px',
          }}
        >
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#2c3e50',
              marginBottom: '10px',
              borderBottom: '1px solid #2c3e50',
            }}
          >
            Projects
          </h2>
          {projects.map(
            (proj, index) =>
              proj.name && (
                <div
                  key={index}
                  style={{
                    marginBottom: '15px',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#2c3e50',
                      marginBottom: '5px',
                    }}
                  >
                    {proj.name || 'Project'}
                  </h3>
                  {proj.description && (
                    <p style={{ color: '#333333' }}>{proj.description}</p>
                  )}
                  {proj.link && (
                    <p>
                      <a
                        href={proj.link}
                        style={{ color: '#0077b5', textDecoration: 'none' }}
                      >
                        {proj.link}
                      </a>
                    </p>
                  )}
                </div>
              )
          )}
        </div>
      )}

      {/* Certifications */}
      {!isSectionEmpty(certifications) && (
        <div
          style={{
            marginBottom: '20px',
          }}
        >
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#2c3e50',
              marginBottom: '10px',
              borderBottom: '1px solid #2c3e50',
            }}
          >
            Certifications
          </h2>
          <ul
            style={{
              listStyleType: 'disc',
              paddingLeft: '20px',
              color: '#333333',
            }}
          >
            {certifications.map(
              (cert, index) =>
                cert.name && (
                  <li key={index} style={{ marginBottom: '5px' }}>
                    {cert.name}
                    {(cert.issuer || cert.year) && (
                      <span>
                        {cert.issuer && `, ${cert.issuer}`}
                        {cert.year && `, ${cert.year}`}
                      </span>
                    )}
                  </li>
                )
            )}
          </ul>
        </div>
      )}

      {/* Languages */}
      {!isSectionEmpty(languages) && (
        <div
          style={{
            marginBottom: '20px',
          }}
        >
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#2c3e50',
              marginBottom: '10px',
              borderBottom: '1px solid #2c3e50',
            }}
          >
            Languages
          </h2>
          {languages.map(
            (lang, index) =>
              lang.language && (
                <div
                  key={index}
                  style={{
                    marginBottom: '10px',
                  }}
                >
                  <p style={{ color: '#333333' }}>
                    {lang.language || 'Language'}: {lang.proficiency || 'Proficiency'} (Level: {lang.proficiencyLevel || 0}/10)
                  </p>
                </div>
              )
          )}
        </div>
      )}

      {/* Hobbies */}
      {!isSectionEmpty(hobbies) && (
        <div
          style={{
            marginBottom: '20px',
          }}
        >
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#2c3e50',
              marginBottom: '10px',
              borderBottom: '1px solid #2c3e50',
            }}
          >
            Hobbies
          </h2>
          <p style={{ color: '#333333' }}>
            {hobbies.filter(hobby => hobby.trim()).join(', ')}
          </p>
        </div>
      )}

      {/* Additional Fields */}
      {additionalFields.map(
        (field, index) =>
          !isSectionEmpty(field.content) && (
            <div
              key={index}
              style={{
                marginBottom: '20px',
              }}
            >
              <h2
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#2c3e50',
                  marginBottom: '10px',
                  borderBottom: '1px solid #2c3e50',
                }}
              >
                {field.title || 'Additional Section'}
              </h2>
              {field.content.map(
                (item, i) =>
                  item.name && (
                    <div
                      key={i}
                      style={{
                        marginBottom: '15px',
                      }}
                    >
                      <h3
                        style={{
                          fontSize: '16px',
                          fontWeight: 'bold',
                          color: '#2c3e50',
                          marginBottom: '5px',
                        }}
                      >
                        {item.name || 'Item'}
                      </h3>
                      {item.year && (
                        <p style={{ color: '#333333' }}>{item.year}</p>
                      )}
                    </div>
                  )
              )}
            </div>
          )
      )}
    </div>
  );
}

PillarTemplate.propTypes = {
  personalInfo: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    linkedin: PropTypes.string,
    portfolio: PropTypes.string,
    address: PropTypes.string,
    github: PropTypes.string,
    twitter: PropTypes.string,
    stackoverflow: PropTypes.string,
  }),
  summary: PropTypes.string,
  education: PropTypes.arrayOf(
    PropTypes.shape({
      degree: PropTypes.string,
      institution: PropTypes.string,
      year: PropTypes.string,
    })
  ),
  experience: PropTypes.arrayOf(
    PropTypes.shape({
      company: PropTypes.string,
      role: PropTypes.string,
      duration: PropTypes.string,
      description: PropTypes.string,
    })
  ),
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      link: PropTypes.string,
    })
  ),
  techSkills: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      proficiency: PropTypes.number,
    })
  ),
  softSkills: PropTypes.arrayOf(PropTypes.string),
  certifications: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      issuer: PropTypes.string,
      year: PropTypes.string,
    })
  ),
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      language: PropTypes.string,
      proficiency: PropTypes.string,
      proficiencyLevel: PropTypes.number,
    })
  ),
  hobbies: PropTypes.arrayOf(PropTypes.string),
  additionalFields: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          year: PropTypes.string,
        })
      ),
    })
  ),
  isSectionEmpty: PropTypes.func.isRequired,
};

PillarTemplate.defaultProps = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio: '',
    address: '',
    github: '',
    twitter: '',
    stackoverflow: '',
  },
  summary: '',
  education: [],
  experience: [],
  projects: [],
  techSkills: [],
  softSkills: [],
  certifications: [],
  languages: [],
  hobbies: [],
  additionalFields: [],
};

export default PillarTemplate;
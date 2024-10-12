import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockJobs = [
  {
    title: 'Frontend Developer',
    description: 'We are looking for a Frontend Developer to join our team.',
    requirements: 'Proficiency in JavaScript, React, and CSS.',
    tags: ['JavaScript', 'React', 'CSS'],
    companyName: 'Tech Innovations',
    contactInfo: 'hr@techinnovations.com',
    applications: [
      { id: 1, name: 'Alice', email: 'alice@example.com' },
      { id: 2, name: 'Bob', email: 'bob@example.com' },
    ],
  },
  {
    title: 'Backend Developer',
    description: 'Seeking a Backend Developer with experience in Node.js.',
    requirements: 'Experience with Node.js and database management.',
    tags: ['Node.js', 'Express', 'MongoDB'],
    companyName: 'Web Solutions',
    contactInfo: 'careers@websolutions.com',
    applications: [
      { id: 3, name: 'Charlie', email: 'charlie@example.com' },
    ],
  },
  
];

const Employer = ({ addJob }) => {
  const [title, setTitle] = useState('');
  const [jobDescription, setJobDescription] = useState(null);
  const [requirements, setRequirements] = useState('');
  const [tags, setTags] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jobDescription) {
        setError('Please upload a job description document.');
        return;
      }
    const newJob = {
      title,
      jobDescription,
      requirements,
      tags: tags.split(',').map(tag => tag.trim()),
      companyName,
      contactInfo,
      applications: [],
    };
    addJob(newJob);
    resetForm();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 16384) { // 16KB in bytes
      setJobDescription(file);
      setError('');
    } else {
      setError('File size must be 16KB or less.');
    }
  };

  const resetForm = () => {
    setTitle('');
    setJobDescription(null);
    setRequirements('');
    setTags('');
    setCompanyName('');
    setContactInfo('');
    setError('');
  };

  const viewApplications = (job) => {
    // Navigate to applicant profile (you can customize this route)
    // Here we can pass job applications as state to the applicant profile page
    navigate('/applications', { state: { applications: job.applications } });
  };

  return (
    <div className="employer">
      <h2><i className="fas fa-building icon"></i>Employer Section</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <div>
          <label>Job Description (max 16KB):</label>
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} required />
          {error && <p className="error">{error}</p>}
        </div>
        <textarea
          placeholder="Job Requirements"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          required
        ></textarea>
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Contact Info"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          required
        />
        <button type="submit"><i className="fas fa-paper-plane"></i>Post Job</button>
      </form>

      <h3>Posted Jobs:</h3>
      <ul>
        {mockJobs.length === 0 ? (
          <li>No jobs posted yet.</li>
        ) : (
          mockJobs.map((job, index) => (
            <li key={index}>
              <h4>{job.title}</h4>
              <p>{job.description}</p>
              <p>Requirements: {job.requirements}</p>
              <p>Tags: {job.tags.join(', ')}</p>
              <p>Company: {job.companyName}</p>
              <p>Contact: {job.contactInfo}</p>
              <p>Applications: {job.applications.length}</p>
              <button onClick={() => viewApplications(job)}>
                <i className="fas fa-eye"></i> View Applications
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Employer;

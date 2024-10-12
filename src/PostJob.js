import React, { useState } from 'react';

const PostJob = () => {
  const [jobDescription, setJobDescription] = useState(null);
  const [jobRequirements, setJobRequirements] = useState('');
  const [tags, setTags] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 16384) {
      setJobDescription(file);
      setError('');
    } else {
      setError('File size must be 16KB or less.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jobDescription) {
      setError('Please upload a job description document.');
      return;
    }

    console.log('Job Posted:', {
      jobDescription,
      jobRequirements,
      tags,
      companyName,
      contactInfo,
    });

    resetForm();
  };

  const resetForm = () => {
    setJobDescription(null);
    setJobRequirements('');
    setTags('');
    setCompanyName('');
    setContactInfo('');
    setError('');
  };

  return (
    <div className="post-job">
      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Job Description (max 16KB):</label>
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} required />
          {error && <p className="error">{error}</p>}
        </div>
        <div>
          <label>Job Requirements:</label>
          <textarea
            value={jobRequirements}
            onChange={(e) => setJobRequirements(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tags (comma-separated):</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contact Info:</label>
          <input
            type="text"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            required
          />
        </div>
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default PostJob;

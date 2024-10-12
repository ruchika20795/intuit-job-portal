import React, { useState, useEffect } from 'react';

const Freelancer = ({ jobs, userProfile, updateUserProfile }) => {
  const [skills, setSkills] = useState([]);
  const [githubUsername, setGithubUsername] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  
  useEffect(() => {
    if (userProfile.githubUsername) {
      fetch(`https://api.github.com/users/${userProfile.githubUsername}/repos`)
        .then(response => response.json())
        .then(data => {
          updateUserProfile(prev => ({ ...prev, projects: data }));
        })
        .catch(error => console.error('Error fetching GitHub projects:', error));
    }
  }, [userProfile.githubUsername, updateUserProfile]);

  const handleSkillChange = (skill) => {
    setSkills(prevSkills => {
      if (prevSkills.includes(skill)) {
        return prevSkills.filter(s => s !== skill);
      }
      return [...prevSkills, skill];
    });
  };

  const handleSubmitProfile = (e) => {
    e.preventDefault();
    updateUserProfile({ ...userProfile, skills, githubUsername });
    setGithubUsername('');
  };

  const handleFilterJobs = () => {
    const filtered = jobs.filter(job => 
      (skills.length === 0 || job.tags.some(tag => skills.includes(tag)))
    );
    setFilteredJobs(filtered);
  };

  const handleQuickApply = (job) => {
    job.applications.push(userProfile.githubUsername);
    alert(`Applied to: ${job.title}`);
  };

  return (
    <div className="freelancer">
      <h2><i className="fas fa-user-friends icon"></i>Freelancer Section</h2>
      
      <form onSubmit={handleSubmitProfile}>
        <h3>User Profile</h3>
        <div>
          <label>Select Skills:</label>
          <div>
            {['JavaScript', 'Python', 'Java', 'React', 'Node.js'].map(skill => (
              <label key={skill}>
                <input
                  type="checkbox"
                  checked={skills.includes(skill)}
                  onChange={() => handleSkillChange(skill)}
                />
                {skill}
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <label>GitHub Username:</label>
          <input
            type="text"
            value={githubUsername}
            onChange={(e) => setGithubUsername(e.target.value)}
            required
          />
        </div>
        
        <button type="submit"><i className="fas fa-user-edit"></i>Update Profile</button>
      </form>

      <h3>Your Projects:</h3>
      <ul>
        {userProfile.projects.map(project => (
          <li key={project.id}>
            <a href={project.html_url} target="_blank" rel="noopener noreferrer">{project.name}</a>
          </li>
        ))}
      </ul>

      <h3>Job Listings:</h3>
      <button onClick={handleFilterJobs}>Filter Jobs</button>
      <ul>
        {filteredJobs.length === 0 ? (
          <li>No jobs available.</li>
        ) : (
          filteredJobs.map((job, index) => (
            <li key={index}>
              <h4>{job.title} (Tags: {job.tags.join(', ')})</h4>
              <p>{job.description}</p>
              <button onClick={() => handleQuickApply(job)}><i className="fas fa-check"></i>Quick Apply</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Freelancer;

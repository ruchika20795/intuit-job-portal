import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostedJobs from './PostedJobs'; // Import the PostedJobs component

const Employer = () => {
  const navigate = useNavigate();

  return (
    <div className="employer">
      <h2>Employer Dashboard</h2>
      <div className="cards">
        <div className="card" onClick={() => navigate('/post-job')}>
          <h3>Post a New Job</h3>
          <p>Create a job listing for freelancers.</p>
        </div>
        <div className="card" onClick={() => navigate('/view-posted-jobs')}>
          <h3>View Posted Jobs</h3>
          <p>See and manage your posted jobs.</p>
        </div>
      </div>
    </div>
  );
};

export default Employer;

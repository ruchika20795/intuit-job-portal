import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployerDashboard.css';
import { Job } from '../../utils/types';

interface EmployerDashboardProps {
  addJob: (job: Job) => void;
  jobs: Job[];
}

const EmployerDashboard = (props: EmployerDashboardProps) => {
  const navigate = useNavigate();

  return (
    <div className="employer">
      <h2>Employer Dashboard</h2>
      <div className="cards">
        <div className="card" onClick={() => navigate('/post-job')}>
          <h3>Post a New Job</h3>
          <p>Create a job listing for freelancers.</p>
        </div>
        <div className="card" onClick={() => navigate('/view-jobs')}>
          <h3>View Posted Jobs</h3>
          <p>See and manage your posted jobs.</p>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;

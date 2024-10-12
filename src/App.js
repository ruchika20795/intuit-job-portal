import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import JobPortal from './JobPortal';
import './App.css';

import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [jobs, setJobs] = useState([]);
  const [userProfile, setUserProfile] = useState({
    skills: [],
    githubUsername: '',
    projects: [],
  });
  const [userRole, setUserRole] = useState(null);

  const addJob = (job) => {
    setJobs([...jobs, job]);
  };

  return (
    <Router>
      <div className="App">
        <h1>Job Portal</h1>
        {!userRole ? (
          <Login setUserRole={setUserRole} />
        ) : (
          <JobPortal 
            jobs={jobs} 
            addJob={addJob} 
            userProfile={userProfile} 
            updateUserProfile={setUserProfile} 
          />
        )}
      </div>
    </Router>
  );
}

export default App;

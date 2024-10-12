import React, { createContext, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Login";
import JobPortal from "./components/JobPortal";
import "./App.css";

import "@fortawesome/fontawesome-free/css/all.min.css";

export const UserContext = createContext();

function App() {
  const [jobs, setJobs] = useState([]);
  const [userProfile, setUserProfile] = useState({
    skills: [],
    githubUsername: "",
    projects: [],
  });
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);

  const addJob = (job) => {
    setJobs([...jobs, job]);
  };

  return (
    <UserContext.Provider value={{ user, setUser, userRole }}>
      <Router>
        <div className='App'>
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
    </UserContext.Provider>
  );
}

export default App;

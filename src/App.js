import React, { createContext, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Login/index.tsx";
import JobPortal from "./components/JobPortal";
import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";

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

  const handleLogout = () => {
    setUser(null);
    setUserRole(null);
    setUserProfile({
      skills: [],
      githubUsername: "",
      projects: [],
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser, userRole }}>
      <ThemeProvider>
        <Router>
          <div className='App'>
            <Header user={user} onLogout={handleLogout} />
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
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;

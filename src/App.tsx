import React, { createContext, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Login/index";
import JobPortal from "./components/JobPortal";
import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header/index";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Job } from "./utils/types.ts";

export interface UserContextProps {
  user: any;
  setUser: any;
  userRole: any;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: null,
  userRole: null,
});

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
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

  const content = (
    <Router>
      <div className='App'>
        <Header user={user} onLogout={handleLogout} />
        {!user ? (
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

  return (
    <UserContext.Provider value={{ user, setUser, userRole }}>
      <ThemeProvider children={content} />
    </UserContext.Provider>
  );
}

export default App;

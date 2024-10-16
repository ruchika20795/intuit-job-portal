import { createContext, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Login/index";
import JobPortal from "./components/JobPortal";
import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header/index";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Job } from "./utils/types";
import { UserRoles } from "./utils/constants";

export interface UserContextProps {
  userName: string | null;
  setUserName: (user: string | null) => void;
  userRole: UserRoles;
}

export const UserContext = createContext<UserContextProps>({
  userName: null,
  setUserName: () => {},
  userRole: UserRoles.Freelancer,
});

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [userRole, setUserRole] = useState(UserRoles.Freelancer);
  const [userName, setUserName] = useState<string | null>(null);

  const addJob = (job: Job) => {
    setJobs([...jobs, job]);
  };

  const handleLogout = () => {
    setUserName(null);
    setUserRole(UserRoles.Freelancer);
  };

  const content = (
    <Router>
      <div className='App'>
        <Header user={userName} onLogout={handleLogout} />
        {!userName ? (
          <Login setUserRole={setUserRole} />
        ) : (
          <JobPortal jobs={jobs} addJob={addJob} />
        )}
        <div className='footer'>
          <p>Job Portal © 2024</p>
        </div>
      </div>
    </Router>
  );

  return (
    <UserContext.Provider value={{ userName, setUserName, userRole }}>
      <ThemeProvider children={content} />
    </UserContext.Provider>
  );
}

export default App;

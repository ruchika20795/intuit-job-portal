import React from "react";
import { Route, Routes } from "react-router-dom";
import Freelancer from "./Freelancer";
import EmployerDashboard from "./components/EmployerDashboard";
import Applications from "./Applications";
import UserProfile from "./UserProfile";
import PostJob from "./components/PostJob";
import ViewJobs from "./components/ViewJobs";

const JobPortal = ({ jobs, addJob, userProfile, updateUserProfile }) => {
  return (
    <Routes>
      <Route
        path='/freelancer'
        element={
          <Freelancer
            jobs={jobs}
            userProfile={userProfile}
            updateUserProfile={updateUserProfile}
          />
        }
      />
      <Route
        path='/employer'
        element={<EmployerDashboard addJob={addJob} jobs={jobs} />}
      />
      <Route path='/applications' element={<Applications />} />
      <Route path='/user-profile' element={<UserProfile />} />
      <Route path='/post-job' element={<PostJob />} />
      <Route path='/view-jobs' element={<ViewJobs />} />
    </Routes>
  );
};

export default JobPortal;

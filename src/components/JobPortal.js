import React from "react";
import { Route, Routes } from "react-router-dom";
import EmployerDashboard from "./EmployerDashboard";
import Applications from "./Applications";
import UserProfile from "./UserProfile";
import PostJob from "./PostJob";
import ViewJobs from "./ViewJobs";
import FreelancerDashboard from "./FreelancerDashboard";

const JobPortal = ({ jobs, addJob, userProfile, updateUserProfile }) => {
  return (
    <Routes>
      <Route path='/freelancer' element={<FreelancerDashboard />} />
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

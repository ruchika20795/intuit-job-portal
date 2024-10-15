import React from "react";
import { Route, Routes } from "react-router-dom";
import EmployerDashboard from "./EmployerDashboard";
import Applications from "./Applications/index";
import UserProfile from "./UserProfile";
import PostJob from "./PostJob";
import ViewJobs from "./ViewJobs";
import FreelancerDashboard from "./FreelancerDashboard";
import { JobDetails } from "./JobDetails/index";

const JobPortal = ({ jobs, addJob, userProfile, updateUserProfile }) => {
  return (
    <Routes>
      <Route path='/freelancer' element={<FreelancerDashboard />} />
      <Route
        path='/employer'
        element={<EmployerDashboard addJob={addJob} jobs={jobs} />}
      />
      <Route path='/job/:id/applications' element={<Applications />} />
      <Route path='/user-profile' element={<UserProfile />} />
      <Route path='/post-job' element={<PostJob />} />
      <Route path='/view-jobs' element={<ViewJobs />} />
      <Route path='/job-details/:id' element={<JobDetails />} />
    </Routes>
  );
};

export default JobPortal;

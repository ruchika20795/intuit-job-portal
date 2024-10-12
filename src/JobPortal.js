import React from "react";
import { Route, Routes } from "react-router-dom";
import Freelancer from "./Freelancer";
import Employer from "./Employer";
import Applications from "./Applications";
import UserProfile from "./UserProfile";
import PostJob from "./PostJob";
import PostedJobs from "./PostedJobs";

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
        element={<Employer addJob={addJob} jobs={jobs} />}
      />
      <Route path='/applications' element={<Applications />} />
      <Route path='/user-profile' element={<UserProfile />} />
      <Route path='/post-job' element={<PostJob />} />
      <Route path='/view-posted-jobs' element={<PostedJobs />} />
    </Routes>
  );
};

export default JobPortal;

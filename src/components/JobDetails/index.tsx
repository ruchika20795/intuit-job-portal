import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../App";
import { UserRoles } from "../../utils/constants";
import "./JobDetails.css";
import { Job } from "../../utils/types";

export const JobDetails = () => {
  const { state } = useLocation();
  const { userRole } = useContext(UserContext);
  const [jobDetails, setJobDetails] = useState<Job | null>(null);

  useEffect(() => {
    if (state?.job) {
      setJobDetails(state.job);
    }
  }, [state]);

  if (!jobDetails) {
    return <p>Job not found.</p>;
  }
  const applyForJob = () => {
    // Show success toast message
    toast.success(`Successfully applied for ${jobDetails.title}`);
  };

  return (
    <div className='job-details'>
      <ToastContainer />
      <h2>{jobDetails.title}</h2>
      <h4>Company: {jobDetails.companyName}</h4>
      <p>
        <strong>Description:</strong> {jobDetails.description}
      </p>
      <p>
        <strong>Requirements:</strong> {jobDetails.requirements}
      </p>
      <p>
        <strong>Tags:</strong> {jobDetails.tags.join(", ")}
      </p>
      <p>
        <strong>Contact Info:</strong> {jobDetails.contactInfo}
      </p>
      {userRole === UserRoles.Freelancer && (
        <button className='apply-button' onClick={applyForJob}>
          Apply
        </button>
      )}
    </div>
  );
};

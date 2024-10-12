import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const JobDetails = () => {
  const { state } = useLocation();
  let job = useRef(null);
  useEffect(() => {
    if (state)
        job.current = state.job;
  }, [state]);
  
  if (!job.current) {
    return <p>Job not found.</p>;
  }
  return (
    <div className="job-details">
      <h2>{job.current.title}</h2>
      <h4>Company: {job.current.companyName}</h4>
      <p><strong>Description:</strong> {job.current.description}</p>
      <p><strong>Requirements:</strong> {job.current.requirements}</p>
      <p><strong>Tags:</strong> {job.current.tags.join(", ")}</p>
      <p><strong>Contact Info:</strong> {job.current.contactInfo}</p>
    </div>
  );
};

export default JobDetails;

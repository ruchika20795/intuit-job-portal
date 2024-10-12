import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postedJobs } from "../../utils/mockPostedJobs";
import { UserContext } from "../../App";
import "./ViewJobs.css";

const PostedJobs = () => {
  const { user, userRole } = useContext(UserContext);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredJobs = postedJobs.filter((job) => {
    if (userRole === "Employer") {
      return (
        job.createdBy === user &&
        job.title.toLowerCase().includes(filter.toLowerCase())
      );
    } else {
      return job.title.toLowerCase().includes(filter.toLowerCase());
    }
  });

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const viewApplications = (job) => {
    navigate(`/job/${job.id}/applications`, {
      state: { applications: job.applications },
    });
  };

  const applyForJob = (job) => {
    // Implement apply functionality
    console.log(`Applying for job: ${job.title}`);
  };

  const goToJobDetails = (job) => {
    navigate(`/job-details/${job.id}`, { state: { job } });
  };

  return (
    <div className='posted-jobs'>
      <h2>{userRole === "Freelancer" ? "View Jobs" : "Posted Jobs"}</h2>
      <input
        type='text'
        placeholder='Filter by title...'
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Company</th>
            <th>Tags</th>
            {userRole !== "Freelancer" && <th>Applications</th>}
            {userRole === "Freelancer" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {currentJobs.map((job) => (
            <tr key={job.id}>
              <td>
                <span className='link-text' onClick={() => goToJobDetails(job)}>
                  {job.title}
                </span>
              </td>
              <td>{job.companyName}</td>
              <td>{job.tags.join(", ")}</td>
              {userRole !== "Freelancer" && (
                <td>
                  <span
                    className='link-text'
                    onClick={() => viewApplications(job)}
                  >
                    {job.applications.length}
                  </span>
                </td>
              )}
              {userRole === "Freelancer" && (
                <td>
                  <button onClick={() => applyForJob(job)}>Apply</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className='pagination'>
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number + 1}
              onClick={() => handlePageChange(number + 1)}
              className={currentPage === number + 1 ? "active" : ""}
            >
              {number + 1}
            </button>
          ))}
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PostedJobs;

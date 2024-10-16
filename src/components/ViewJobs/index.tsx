import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postedJobs1 } from "../../utils/mock_jobs_data";
import { UserContext } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import { UserRoles } from "../../utils/constants";
import "react-toastify/dist/ReactToastify.css";
import "./ViewJobs.css";
import { Job } from "../../utils/types";

const ViewJobs = () => {
  const { userName, userRole } = useContext(UserContext);
  const navigate = useNavigate();

  const [filter, setFilter] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState(filter);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState(""); // Store input page number
  const itemsPerPage = 5;

  // Debounce for search filter
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilter(filter);
    }, 300);
    return () => clearTimeout(handler);
  }, [filter]);

  const filteredJobs = postedJobs1.filter((job) => {
    const searchTerm = debouncedFilter.toLowerCase();
    const isTitleMatch = job.title.toLowerCase().includes(searchTerm);
    const isTagMatch = job.tags.some((tag) =>
      tag.toLowerCase().includes(searchTerm)
    );

    if (userRole === UserRoles.Employer) {
      return job.createdBy === userName && (isTitleMatch || isTagMatch);
    }
    return isTitleMatch || isTagMatch;
  });

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setInputPage(""); // Clear input field on valid page change
    }
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleInputPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(e.target.value);
  };

  const jumpToPage = () => {
    const page = parseInt(inputPage);
    if (!isNaN(page)) handlePageChange(page);
  };

  const viewApplications = (job: Job) => {
    navigate(`/job/${job.id}/applications`, {
      state: { applications: job.applications },
    });
  };

  const applyForJob = (job: Job) => {
    toast.success(`Successfully applied for ${job.title}`);
  };

  const goToJobDetails = (job: Job) => {
    navigate(`/job-details/${job.id}`, { state: { job } });
  };

  return (
    <div className='posted-jobs'>
      <ToastContainer />
      <h2>{userRole === UserRoles.Freelancer ? "View Jobs" : "Posted Jobs"}</h2>
      <input
        type='text'
        className='search-input'
        placeholder='Filter by title or tags...'
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        disabled={currentJobs.length === 0}
      />
      <table>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Company</th>
            <th>Tags</th>
            <th>{userRole === UserRoles.Freelancer ? "Posted on" : "Created on"}</th>
            <th>
              {userRole === UserRoles.Freelancer ? "Actions" : "Applications"}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentJobs.length > 0 ? (
            currentJobs.map((job) => (
              <tr key={job.id}>
                <td>
                  <span
                    className='link-text'
                    onClick={() => goToJobDetails(job)}
                  >
                    {job.title}
                  </span>
                </td>
                <td>{job.companyName}</td>
                <td>{job.tags.join(", ")}</td>
                <td>{job.createdAt}</td>
                <td>
                  {userRole === UserRoles.Freelancer ? (
                    <button onClick={() => applyForJob(job)}>Apply</button>
                  ) : (
                    <span
                      className='link-text'
                      onClick={() => viewApplications(job)}
                    >
                      {job.applications.length}
                    </span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <p>No jobs found.</p>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className='pagination'>
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
            Previous
          </button>

          {/* Render only the first 3 page buttons */}
          {[...Array(Math.min(3, totalPages)).keys()].map((number) => (
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

          <div className='jump-to-page'>
            <input
              type='number'
              min='1'
              max={totalPages}
              placeholder='Go to...'
              value={inputPage}
              onChange={handleInputPageChange}
            />
            <button onClick={jumpToPage}>Go</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewJobs;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockUsers } from './utils/mockUsers'; // Import mock user data

const PostedJobs = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Mock data for posted jobs
  const postedJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      description: "We are looking for a Frontend Developer to join our team.",
      requirements: "Proficiency in JavaScript, React, and CSS.",
      tags: ["JavaScript", "React", "CSS"],
      companyName: "Tech Innovations",
      contactInfo: "hr@techinnovations.com",
      applications: [
        { id: 1, name: "Alice", email: "alice@example.com" },
        { id: 2, name: "Bob", email: "bob@example.com" },
      ],
    },
    {
      id: 2,
      title: "Backend Developer",
      description: "Seeking a Backend Developer for our services.",
      requirements: "Experience with Node.js and Express.",
      tags: ["Node.js", "Express", "MongoDB"],
      companyName: "Web Solutions",
      contactInfo: "hr@websolutions.com",
      applications: [
        { id: 3, name: "Charlie", email: "charlie@example.com" },
      ],
    },
    // Add more jobs as needed
  ];

  const filteredJobs = postedJobs.filter(job => job.title.toLowerCase().includes(filter.toLowerCase()));

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

  const viewProfile = (applicantId) => {
    const user = mockUsers.find((user) => user.id === applicantId);
    navigate('/user-profile', { state: { user } });
  };

  const viewApplications = (job) => {
    // Navigate to applicant profile (you can customize this route)
    // Here we can pass job applications as state to the applicant profile page
    navigate('/applications', { state: { applications: job.applications } });
  };

  return (
    <div className="posted-jobs">
      <h2>Posted Jobs</h2>
      <input
        type="text"
        placeholder="Filter by title..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Company</th>
            <th>Tags</th>
            <th>Applications</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentJobs.map((job) => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.companyName}</td>
              <td>{job.tags.join(', ')}</td>
              <td>{job.applications.length}</td>
              <td>
                <button onClick={() => viewApplications(job)}>
                  View Applications
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number + 1}
              onClick={() => handlePageChange(number + 1)}
              className={currentPage === number + 1 ? 'active' : ''}
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

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { mockUsers } from "../utils/mockUsers";

const Applications = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  // State to hold applications
  const [applications, setApplications] = useState([]);
  
  useEffect(() => {
    if (state && state.applications) {
      setApplications(state.applications);
    }
  }, [state]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(applications.length / itemsPerPage);
  const indexOfLastApplication = currentPage * itemsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - itemsPerPage;
  const currentApplications = applications.slice(
    indexOfFirstApplication,
    indexOfLastApplication
  );

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
    navigate("/user-profile", { state: { user } });
  };

  return (
    <div className='applications'>
      <h2>
        <i className='fas fa-file-alt icon'></i> Applications
      </h2>

      {applications.length === 0 ? (
        <p>No applications received for this job.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentApplications.map((app) => (
                <tr key={app.id}>
                  <td>{app.name}</td>
                  <td>{app.email}</td>
                  <td>
                    <button onClick={() => viewProfile(app.id)}>
                      <i className='fas fa-user'></i> View Profile
                    </button>
                  </td>
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

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Applications;

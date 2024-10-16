import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { mockUsers } from "../../utils/mockUsers";
import "./Applications.css";
import { Application } from "../../utils/types";

const Applications = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [applications, setApplications] = useState<Application[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jumpToPage, setJumpToPage] = useState("");

  const itemsPerPage = 5;
  const totalPages = Math.ceil(applications.length / itemsPerPage);

  useEffect(() => {
    if (state && state.applications) {
      setApplications(state.applications);
    }
  }, [state]);

  const indexOfLastApplication = currentPage * itemsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - itemsPerPage;
  const currentApplications = applications.slice(
    indexOfFirstApplication,
    indexOfLastApplication
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleJumpToPage = () => {
    const page = parseInt(jumpToPage);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setJumpToPage("");
    } else {
      alert(`Please enter a valid page number between 1 and ${totalPages}.`);
    }
  };

  const viewProfile = (applicantId: number) => {
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

              {/* Render only the first 3 pages */}
              {Array.from({ length: Math.min(3, totalPages) }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>

              {/* Jump to Page Input */}
              <div className='jump-to-page'>
                <input
                  type='number'
                  value={jumpToPage}
                  onChange={(e) => setJumpToPage(e.target.value)}
                  placeholder='Page #'
                  min='1'
                  max={totalPages}
                />
                <button onClick={handleJumpToPage}>Go</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Applications;

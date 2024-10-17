import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./FreelancerDashboard.css";
import { mockUsers } from "../../utils/mockUsers";
import { UserContext } from "../../App";

const FreelancerDashboard = () => {
  const navigate = useNavigate();
  const { userName } = useContext(UserContext);

  const viewProfile = () => {
    const user = mockUsers.find((user) => user.email === userName);
    navigate("/user-profile", { state: { user } });
  };

  return (
    <div className='freelancer'>
      <h2>Freelancer Dashboard</h2>
      <div className='cards'>
        <div className='card' onClick={() => navigate("/view-jobs")}>
          <h3>Jobs</h3>
          <p>View all jobs</p>
        </div>
        <div className='card' onClick={() => viewProfile()}>
          <h3>View my profile</h3>
          <p>See and manage your profile</p>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;

import React from 'react';
import { useLocation } from 'react-router-dom';

const UserProfile = () => {
  const location = useLocation();
  const { user } = location.state || {};

  if (!user) {
    return <p>User not found.</p>;
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Skills:</strong> {user.skills.join(', ')}</p>
      <p><strong>GitHub Profile:</strong> <a href={user.github} target="_blank" rel="noopener noreferrer">{user.github}</a></p>
      <h3>Projects:</h3>
      <ul>
        {user.projects.map((project, index) => (
          <li key={index}>
            <a href={project.url} target="_blank" rel="noopener noreferrer">{project.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;

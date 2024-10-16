import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import "./UserProfile.css";
import { UserContext } from "../../App";
import { UserRoles } from "../../utils/constants";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { User, Project } from "../../utils/types";

const FontAwesomeIcon =
  require("@fortawesome/react-fontawesome").FontAwesomeIcon;

interface FormErrors {
  name?: string;
  skills?: string;
}

const skillsOptions = [
  "React",
  "JavaScript",
  "Java",
  "Angular",
  "NodeJS",
  "TypeScript",
  "Python",
  "HTML",
  "CSS",
];

const UserProfile = () => {
  const location = useLocation();

  const { user } = location.state as { user: User };
  const { userRole } = useContext(UserContext);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name);
  const [email] = useState(user?.email); // Email is read-only
  const [selectedSkills, setSelectedSkills] = useState(user?.skills || []);
  const [github, setGithub] = useState(user?.github);
  const [projects, setProjects] = useState<Project[]>(
    user?.projects || [{ name: "", url: "" }]
  );
  const [errors, setErrors] = useState<FormErrors>({});

  if (!user) {
    return <p>User not found.</p>;
  }

  const handleSave = () => {
    // Form validation
    setErrors({}); // Clear previous errors
    const newErrors: FormErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (selectedSkills.length === 0)
      newErrors.skills = "At least one skill is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop if there are errors
    }
    // Save logic here (e.g., API call)
    setIsEditing(false);
    // Optionally update the user state or notify the user of success
  };

  const handleCancel = () => {
    setErrors({});
    setIsEditing(false);
  };

  const handleProjectChange = (
    index: number,
    field: keyof Project,
    value: string
  ) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    setProjects(updatedProjects);
  };

  const addProject = () => {
    setProjects([...projects, { name: "", url: "" }]);
  };

  return (
    <div className='user-profile'>
      <h2>User Profile</h2>
      <div className='details-content'>
        <div className='user-details'>
          {isEditing ? (
            <div>
              <label>Name:</label>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Name'
              />
              {errors.name && <p className='error'>{errors.name}</p>}
              <label>Email:</label>
              <input type='email' value={email} placeholder='Email' disabled />
              <label htmlFor='skills'>Skills:</label>
              <select
                id='skills'
                multiple
                value={selectedSkills}
                onChange={(e) =>
                  setSelectedSkills(
                    [...e.target.selectedOptions].map((option) => option.value)
                  )
                }
              >
                {skillsOptions.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
              {errors.skills && <p className='error'>{errors.skills}</p>}
              <label>Github profile URL:</label>
              <input
                type='text'
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder='GitHub Profile URL'
              />
              <label>Projects:</label>
              {projects.map((project, index) => (
                <div key={index} className='project-input'>
                  <input
                    type='text'
                    placeholder='Project Name'
                    value={project.name}
                    onChange={(e) =>
                      handleProjectChange(index, "name", e.target.value)
                    }
                  />
                  <input
                    type='text'
                    placeholder='Project Link'
                    value={project.url}
                    onChange={(e) =>
                      handleProjectChange(index, "url", e.target.value)
                    }
                  />
                </div>
              ))}
              <button onClick={addProject}>Add Project</button>
              <div className='edit-actions-cta'>
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          ) : (
            <div>
              <p>
                <strong>Name:</strong> {name}
              </p>
              <p>
                <strong>Email:</strong> {email}
              </p>
              <p>
                <strong>Skills:</strong> {selectedSkills.join(", ")}
              </p>
              <p>
                <strong>GitHub Profile:</strong>{" "}
                <a href={github} target='_blank' rel='noopener noreferrer'>
                  {github}
                </a>
              </p>
              <label>Projects:</label>
              {projects.length > 0 ? (
                <React.Fragment>
                  <p>
                    <strong>Projects:</strong>
                  </p>
                  <ul>
                    {projects.map((project, index) => (
                      <li key={index}>
                        <a
                          href={project.url}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {project.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </React.Fragment>
              ) : null}
              {userRole === UserRoles.Freelancer && (
                <button onClick={() => setIsEditing(true)}>Edit Profile</button>
              )}
            </div>
          )}
        </div>
        {!isEditing && (
          <div className='user-icon'>
            <FontAwesomeIcon icon={faUserCircle} size='6x' />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

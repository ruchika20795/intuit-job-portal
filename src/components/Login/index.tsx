import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { UserContext } from '../../App';

const Login = ({ setUserRole }) => {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = () => {
    let validationErrors: any = {};
    if (!role) validationErrors.role = "Role is required.";
    if (!username || !validateEmail(username)) validationErrors.username = "Enter a valid email.";
    if (!password || !validatePassword(password)) validationErrors.password = "Password must be at least 8 characters, include an uppercase letter, a number, and a special character.";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Simulate successful login
      setUserRole(role);
      setUser(username);
      navigate(role === 'Freelancer' ? '/freelancer' : '/employer');
    }
  };

  return (
    <div className="login">
      <h2><i className="fas fa-user-circle icon"></i>Login</h2>
      <label className="role-selection">
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select role</option>
          <option value="Freelancer">Freelancer</option>
          <option value="Employer">Employer</option>
        </select>
        {errors.role && <span className="error">{errors.role}</span>}
      </label>
      <input
        type="text"
        placeholder="Email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      {errors.username && <span className="error">{errors.username}</span>}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {errors.password && <span className="error">{errors.password}</span>}
      <div className="action-cta">
        <button onClick={handleLogin} className="login-button"><i className="fas fa-sign-in-alt"></i>Login</button>
      </div>
    </div>
  );
};

export default Login;

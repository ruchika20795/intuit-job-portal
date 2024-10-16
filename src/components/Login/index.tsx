import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { UserContext } from "../../App";
import { UserRoles } from "../../utils/constants";

interface LoginProps {
  setUserRole: (role: UserRoles) => void;
}

const Login = (props: LoginProps) => {
  const { setUserRole } = props;
  const [role, setRole] = useState(UserRoles.Freelancer);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();
  const { setUserName } = useContext(UserContext);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = () => {
    let validationErrors: any = {};
    if (!role) validationErrors.role = "Role is required.";
    if (!username || !validateEmail(username))
      validationErrors.username = "Enter a valid email.";
    if (!password || !validatePassword(password))
      validationErrors.password =
        "Password must be at least 8 characters, include an uppercase letter, a number, and a special character.";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Simulate successful login
      setUserRole(role);
      setUserName(username);
      navigate(role === UserRoles.Freelancer ? "/freelancer" : "/employer");
    }
  };

  return (
    <div className='login'>
      <h2>
        <i className='fas fa-user-circle icon'></i>Login
      </h2>
      <div className='role-selection'>
        <select
          className='login-input'
          value={role}
          onChange={(e) => setRole(e.target.value as UserRoles)}
        >
          <option value=''>Select role</option>
          <option value={UserRoles.Freelancer}>Freelancer</option>
          <option value={UserRoles.Employer}>Employer</option>
        </select>
        {errors.role && <span className='error'>{errors.role}</span>}
      </div>
      <input
        className='login-input'
        type='text'
        placeholder='Email'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      {errors.username && <span className='error'>{errors.username}</span>}
      <input
        className='login-input'
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {errors.password && <span className='error'>{errors.password}</span>}
      <div className='action-cta'>
        <button onClick={handleLogin} className='login-button'>
          <i className='fas fa-sign-in-alt'></i>Login
        </button>
      </div>
    </div>
  );
};

export default Login;

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // For mocking React Router
import { UserContext, UserContextProps } from '../../App';
import { UserRoles } from '../../utils/constants';
import Login from './index';

// Mock useNavigate hook from React Router
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Login Component', () => {
  const setUserRole = jest.fn();
  const setUserName = jest.fn();

  const mockUserContext: UserContextProps = {
    userName: '',
    userRole: UserRoles.Freelancer, // Or any default role
    setUserName,
    // setUserRole,
  };

  const renderLogin = () =>
    render(
      <UserContext.Provider value={mockUserContext}>
        <MemoryRouter>
          <Login setUserRole={setUserRole} />
        </MemoryRouter>
      </UserContext.Provider>
    );

  beforeEach(() => {
    jest.clearAllMocks(); // Reset mock function calls before each test
  });

  it('renders the login form', () => {
    renderLogin();
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('validates that the email is required and must be valid', () => {
    renderLogin();
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'invalid-email' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText(/enter a valid email/i)).toBeInTheDocument();
  });

  it('validates that the password must meet criteria', () => {
    renderLogin();
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'short' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(
      screen.getByText(
        /password must be at least 8 characters, include an uppercase letter, a number, and a special character/i
      )
    ).toBeInTheDocument();
  });

  it('calls setUserRole and setUserName on successful login', () => {
    renderLogin();

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'Password1!' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(setUserRole).toHaveBeenCalledWith(UserRoles.Freelancer);
    expect(setUserName).toHaveBeenCalledWith('test@example.com');
    expect(mockNavigate).toHaveBeenCalledWith('/freelancer');
  });

  it('navigates to employer route if role is employer', () => {
    renderLogin();

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: UserRoles.Employer },
    });

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'employer@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'Password1!' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(setUserRole).toHaveBeenCalledWith(UserRoles.Employer);
    expect(mockNavigate).toHaveBeenCalledWith('/employer');
  });

  it('shows error if role is not selected', () => {
    renderLogin();

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText(/role is required/i)).toBeInTheDocument();
  });
});

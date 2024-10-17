import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserRoles } from './utils/constants';
import App, { UserContextProps, UserContext } from './App';
import userEvent from '@testing-library/user-event';

// Mock components
jest.mock('./components/Login', () => () => <div>Login Component</div>);
jest.mock('./components/JobPortal', () => (props: any) => (
  <div>
    Job Portal Component
    <button onClick={() => props.addJob({ id: 1, title: 'Test Job' })}>
      Add Job
    </button>
  </div>
));
jest.mock('./components/Header', () => (props: any) => (
  <div>
    Header Component - User: {props.user || 'Guest'}
    <button onClick={props.onLogout}>Logout</button>
  </div>
));

describe('App Component', () => {
  const renderAppWithContext = (contextValue: UserContextProps) => {
    return render(
      <UserContext.Provider value={contextValue}>
        <App />
      </UserContext.Provider>
    );
  };

  it('renders the Login component when no user is logged in', () => {
    render(<App />);
    expect(screen.getByText(/login component/i)).toBeInTheDocument();
  });

  it('renders the JobPortal component when a user is logged in', () => {
    const contextValue: UserContextProps = {
      userName: 'John Doe',
      setUserName: jest.fn(),
      userRole: UserRoles.Freelancer,
    };

    renderAppWithContext(contextValue);

    expect(screen.getByText(/header component - user: Guest/i)).toBeInTheDocument();
    expect(screen.getByText(/freelancer component/i)).toBeInTheDocument();
  });

  it('logs out the user and returns to the Login component', async () => {
    const setUserName = jest.fn();
    const contextValue: UserContextProps = {
      userName: 'John Doe',
      setUserName,
      userRole: UserRoles.Freelancer,
    };

    renderAppWithContext(contextValue);

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();
    await userEvent.click(logoutButton);

    expect(setUserName).toHaveBeenCalledWith(null);
    expect(screen.getByText(/login component/i)).toBeInTheDocument();
  });

  it('shows the footer correctly', () => {
    render(<App />);
    expect(screen.getByText(/job portal © 2024/i)).toBeInTheDocument();
  });
});

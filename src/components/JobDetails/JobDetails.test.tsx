// JobDetails.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { UserRoles } from '../../utils/constants';
import { JobDetails } from './index';
import { UserContext } from '../../App';
import { ToastContainer } from 'react-toastify';
import * as reactRouterDom from 'react-router-dom';

// Mock the necessary hooks and components
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

describe('JobDetails', () => {
  const navigate = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    // Assign the mock implementation
    (reactRouterDom.useNavigate as jest.Mock).mockImplementation(() => navigate);
  });

  test('renders job details correctly', () => {
    const mockJob = {
      id: 1,
      title: 'Software Engineer',
      companyName: 'Tech Corp',
      description: 'Develop software applications.',
      requirements: 'Experience in React and Node.js.',
      tags: ['React', 'Node.js'],
      createdAt: '2024-10-17',
      contactInfo: 'contact@techcorp.com',
      applications: [],
    };

    // Mock the state to pass it to the useLocation hook
    (reactRouterDom.useLocation as jest.Mock).mockReturnValue({
      pathname: '/job-details',
      search: '',
      hash: '',
      state: { job: mockJob },
      key: 'test-key',
    });

    render(
      <UserContext.Provider value={{ userName: 'test@example.com', setUserName: jest.fn(), userRole: UserRoles.Freelancer }}>
        <ToastContainer />
        <JobDetails />
      </UserContext.Provider>
    );

    expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/Tech Corp/i)).toBeInTheDocument();
    expect(screen.getByText(/Develop software applications./i)).toBeInTheDocument();
    expect(screen.getByText(/Experience in React and Node.js./i)).toBeInTheDocument();
    expect(screen.getByText(/Tags:/i)).toBeInTheDocument();
    expect(screen.getByText(/React, Node.js/i)).toBeInTheDocument();
    expect(screen.getByText(/Posted on:/i)).toBeInTheDocument();
    expect(screen.getByText(/2024-10-17/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact Info:/i)).toBeInTheDocument();
    expect(screen.getByText(/contact@techcorp.com/i)).toBeInTheDocument();
  });

  test('displays job not found message when job details are not present', () => {
    (reactRouterDom.useLocation as jest.Mock).mockReturnValue({
      pathname: '/job-details',
      search: '',
      hash: '',
      state: {}, // No job state
      key: 'test-key',
    });

    render(
      <UserContext.Provider value={{ userName: 'test@example.com', setUserName: jest.fn(), userRole: UserRoles.Freelancer }}>
        <ToastContainer />
        <JobDetails />
      </UserContext.Provider>
    );

    expect(screen.getByText(/job not found/i)).toBeInTheDocument();
  });

  test('allows freelancers to apply for the job', () => {
    const mockJob = {
      id: 1,
      title: 'Software Engineer',
      companyName: 'Tech Corp',
      description: 'Job description here...',
      requirements: 'Job requirements here...',
      tags: ['React', 'Node.js'],
      createdAt: '2024-10-17',
      contactInfo: 'contact@techcorp.com',
      applications: [],
    };

    (reactRouterDom.useLocation as jest.Mock).mockReturnValue({
      pathname: '/job-details',
      search: '',
      hash: '',
      state: { job: mockJob },
      key: 'test-key',
    });

    render(
      <UserContext.Provider value={{ userName: 'test@example.com', setUserName: jest.fn(), userRole: UserRoles.Freelancer }}>
        <ToastContainer />
        <JobDetails />
      </UserContext.Provider>
    );

    const applyButton = screen.getByRole('button', { name: /apply/i });
    fireEvent.click(applyButton);

    expect(screen.getByText(/successfully applied for Software Engineer/i)).toBeInTheDocument();
  });

  test('allows employers to view applications', () => {
    const mockJob = {
      id: 1,
      title: 'Software Engineer',
      companyName: 'Tech Corp',
      description: 'Job description here...',
      requirements: 'Job requirements here...',
      tags: ['React', 'Node.js'],
      createdAt: '2024-10-17',
      contactInfo: 'contact@techcorp.com',
      applications: [{ applicantId: 1, name: 'John Doe' }],
    };

    (reactRouterDom.useLocation as jest.Mock).mockReturnValue({
      pathname: '/job-details',
      search: '',
      hash: '',
      state: { job: mockJob },
      key: 'test-key',
    });

    render(
      <UserContext.Provider value={{ userName: 'test@example.com', setUserName: jest.fn(), userRole: UserRoles.Employer }}>
        <ToastContainer />
        <JobDetails />
      </UserContext.Provider>
    );

    const viewApplicationsButton = screen.getByRole('button', { name: /see applicants/i });
    fireEvent.click(viewApplicationsButton);

    expect(navigate).toHaveBeenCalledWith(`/job/${mockJob.id}/applications`, {
      state: { applications: mockJob.applications },
    });
  });
});

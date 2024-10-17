import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EmployerDashboard from './index';
import { Job } from '../../utils/types';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn();

describe('EmployerDashboard', () => {
  const addJobMock = jest.fn();
  const jobsMock: Job[] = [];

  beforeEach(() => {
    // Clear any previous mock calls
    jest.clearAllMocks();
    
    // Set the mockNavigate to the mocked function
    (require('react-router-dom').useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    
    // Render the component with necessary props
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <MemoryRouter>
        <EmployerDashboard addJob={addJobMock} jobs={jobsMock} />
      </MemoryRouter>
    );
  });

  test('renders Employer Dashboard heading', () => {
    expect(screen.getByText(/employer dashboard/i)).toBeInTheDocument();
  });

  test('renders Post a New Job card', () => {
    expect(screen.getByText(/post a new job/i)).toBeInTheDocument();
    expect(screen.getByText(/create a job listing for freelancers/i)).toBeInTheDocument();
  });

  test('renders View Posted Jobs card', () => {
    expect(screen.getByText(/view posted jobs/i)).toBeInTheDocument();
    expect(screen.getByText(/see and manage your posted jobs/i)).toBeInTheDocument();
  });

  test('navigates to /post-job when Post a New Job card is clicked', () => {
    fireEvent.click(screen.getByText(/post a new job/i));

    expect(mockNavigate).toHaveBeenCalledWith('/post-job');
  });

  test('navigates to /view-jobs when View Posted Jobs card is clicked', () => {
    fireEvent.click(screen.getByText(/view posted jobs/i));

    expect(mockNavigate).toHaveBeenCalledWith('/view-jobs');
  });
});

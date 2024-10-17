import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Applications from './index';
// import { mockUsers } from '../../utils/mockUsers';
import { Application } from '../../utils/types';

const renderApplications = (applications: Application[] = []) => {
  return render(
    <MemoryRouter initialEntries={[{ state: { applications } }]}>
      <Routes>
        <Route path="/" element={<Applications />} />
        <Route path="/user-profile" element={<div>User Profile</div>} />
      </Routes>
    </MemoryRouter>
  );
};

describe('Applications Component', () => {
  it('renders a message when there are no applications', () => {
    renderApplications();

    expect(screen.getByText(/no applications received for this job/i)).toBeInTheDocument();
  });

  it('renders applications when provided', () => {
    const applications = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ];

    renderApplications(applications);

    expect(screen.getByText(/applications/i)).toBeInTheDocument();
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/jane smith/i)).toBeInTheDocument();
  });

  it('handles pagination correctly', () => {
    const applications = Array.from({ length: 12 }, (_, index) => ({
      id: index + 1,
      name: `User ${index + 1}`,
      email: `user${index + 1}@example.com`,
    }));

    renderApplications(applications);

    // Initial state
    expect(screen.getByText(/user 1/i)).toBeInTheDocument();
    expect(screen.queryByText(/user 6/i)).not.toBeInTheDocument();

    // Go to the next page
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    expect(screen.getByText(/user 6/i)).toBeInTheDocument();
    expect(screen.queryByText('User 1')).not.toBeInTheDocument();

    // Go to the previous page
    const previousButton = screen.getByRole('button', { name: /previous/i });
    fireEvent.click(previousButton);

    expect(screen.getByText('User 1')).toBeInTheDocument();
  });

  it('handles jumping to a specific page', () => {
    const applications = Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      name: `User ${index + 1}`,
      email: `user${index + 1}@example.com`,
    }));

    renderApplications(applications);

    // Initially, we should see user 1
    expect(screen.getByText('User 1')).toBeInTheDocument();

    // Jump to page 2
    fireEvent.change(screen.getByPlaceholderText(/page #/i), { target: { value: '2' } });
    fireEvent.click(screen.getByText(/go/i));

    expect(screen.getByText(/user 6/i)).toBeInTheDocument();
    expect(screen.queryByText('User 1')).not.toBeInTheDocument();
  });

  it('navigates to user profile on clicking view profile', () => {
    const applications = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
    ];

    renderApplications(applications);

    const viewProfileButton = screen.getByRole('button', { name: /view profile/i });
    fireEvent.click(viewProfileButton);

    expect(screen.getByText(/user profile/i)).toBeInTheDocument();
  });
});

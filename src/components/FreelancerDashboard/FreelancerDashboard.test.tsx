import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FreelancerDashboard from "./index";
import { UserContext } from "../../App";
import { UserRoles } from "../../utils/constants";

// Mock the useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn();

jest.mock("../../utils/mockUsers", () => ({
  mockUsers: [
    { id: 1, name: "User 1", email: "user1@example.com" },
    { id: 2, name: "User 2", email: "user2@example.com" },
  ],
}));

describe("FreelancerDashboard", () => {
  const setUserName = jest.fn();
  const userContextValue = {
    setUserName,
    userRole: UserRoles.Freelancer,
    userName: "user1@example.com",
  };

  beforeEach(() => {
    // Clear previous mock calls
    jest.clearAllMocks();

    // Set the mockNavigate to the mocked function
    (require("react-router-dom").useNavigate as jest.Mock).mockImplementation(
      () => mockNavigate
    );

    // Render the component with UserContext
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <UserContext.Provider value={userContextValue}>
        <MemoryRouter>
          <FreelancerDashboard />
        </MemoryRouter>
      </UserContext.Provider>
    );
  });

  test("renders Freelancer Dashboard heading", () => {
    expect(screen.getByText(/freelancer dashboard/i)).toBeInTheDocument();
  });

  test("renders Jobs card", () => {
    expect(screen.getByText('Jobs')).toBeInTheDocument();
    expect(screen.getByText('View all jobs')).toBeInTheDocument();
  });

  test("renders View my profile card", () => {
    expect(screen.getByText(/view my profile/i)).toBeInTheDocument();
    expect(
      screen.getByText(/see and manage your profile/i)
    ).toBeInTheDocument();
  });

  test("navigates to /view-jobs when Jobs card is clicked", () => {
    fireEvent.click(screen.getByText('Jobs'));
    expect(mockNavigate).toHaveBeenCalledWith("/view-jobs");
  });

  test("navigates to /user-profile when View my profile card is clicked", () => {
    fireEvent.click(screen.getByText(/view my profile/i));
    expect(mockNavigate).toHaveBeenCalledWith("/user-profile", {
      state: { user: { id: 1, name: "User 1", email: "user1@example.com" } },
    });
  });
});

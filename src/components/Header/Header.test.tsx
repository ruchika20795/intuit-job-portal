import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./index";
import { ThemeContext } from "../../context/ThemeContext";
import { Theme } from "../../utils/constants";

// Mock FontAwesomeIcon component
jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <span>Icon</span>,
}));

describe("Header", () => {
  const mockToggleTheme = jest.fn();
  const mockOnLogout = jest.fn();

  const renderHeader = (user: string | null, theme: Theme) => {
    render(
      <ThemeContext.Provider value={{ theme, toggleTheme: mockToggleTheme }}>
        <Header user={user} onLogout={mockOnLogout} />
      </ThemeContext.Provider>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders header with title and theme toggle button", () => {
    renderHeader(null, Theme.Light);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByText(/job portal/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/switch to dark mode/i)).toBeInTheDocument();
  });

  test("renders logout button when user is present", () => {
    renderHeader("user@example.com", Theme.Light);

    expect(screen.getByLabelText(/logout/i)).toBeInTheDocument();
  });

  test("does not render logout button when no user is present", () => {
    renderHeader(null, Theme.Light);

    expect(screen.queryByLabelText(/logout/i)).not.toBeInTheDocument();
  });

  test("toggles theme on button click", () => {
    renderHeader("user@example.com", Theme.Light);

    fireEvent.click(screen.getByLabelText(/switch to dark mode/i));
    expect(mockToggleTheme).toHaveBeenCalled();
  });

  test("shows logout confirmation modal when logout button is clicked", () => {
    renderHeader("user@example.com", Theme.Light);

    fireEvent.click(screen.getByLabelText(/logout/i));
    expect(
      screen.getByText(/are you sure you want to logout/i)
    ).toBeInTheDocument();
  });

  test("handles logout correctly", () => {
    renderHeader("user@example.com", Theme.Light);

    // Click logout button to show confirmation
    fireEvent.click(screen.getByLabelText(/logout/i));
    // Confirm logout
    fireEvent.click(screen.getByText(/yes/i));

    expect(mockOnLogout).toHaveBeenCalled();
  });

  test("cancels logout when cancel button is clicked", () => {
    renderHeader("user@example.com", Theme.Light);

    // Click logout button to show confirmation
    fireEvent.click(screen.getByLabelText(/logout/i));
    // Cancel logout
    fireEvent.click(screen.getByText(/cancel/i));

    expect(
      screen.queryByText(/are you sure you want to logout/i)
    ).not.toBeInTheDocument();
  });
});

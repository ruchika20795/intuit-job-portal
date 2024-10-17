import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserProfile from "./index";
import { UserContext } from "../../App";
import { BrowserRouter, useLocation } from "react-router-dom";
import { UserRoles } from "../../utils/constants";

const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  skills: ["React", "JavaScript"],
  github: "https://github.com/johndoe",
  projects: [{ name: "Project One", url: "https://projectone.com" }],
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

const renderWithContext = (userRole: UserRoles = UserRoles.Freelancer) => {
  (useLocation as jest.Mock).mockReturnValue({
    state: { user: mockUser },
  });
  render(
    <UserContext.Provider
      value={{ userName: "test@example.com", setUserName: jest.fn(), userRole }}
    >
      <BrowserRouter>
        <UserProfile />
      </BrowserRouter>
    </UserContext.Provider>
  );
};

describe("UserProfile", () => {
  test("renders user profile with data", () => {
    renderWithContext();

    expect(screen.getByText(/user profile/i)).toBeInTheDocument();
    expect(screen.getByText(/name/i)).toHaveTextContent(mockUser.name);
    expect(screen.getByText(/email/i)).toHaveTextContent(mockUser.email);
    expect(screen.getByText(/skills/i)).toHaveTextContent(
      mockUser.skills.join(", ")
    );
    expect(screen.getByText(/github profile/i)).toHaveTextContent(
      mockUser.github
    );
    expect(screen.getByText(/projects/i)).toBeInTheDocument();
  });

  test("enters edit mode and updates state", () => {
    renderWithContext();

    fireEvent.click(screen.getByRole("button", { name: /edit profile/i }));

    const nameInput = screen.getByPlaceholderText("Name") as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });

    expect(nameInput.value).toBe("Jane Doe");
  });

  test("shows error when saving without name or skills", () => {
    renderWithContext();

    fireEvent.click(screen.getByRole("button", { name: /edit profile/i }));
    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(
      screen.getByText(/at least one skill is required/i)
    ).toBeInTheDocument();
  });

  test("cancels editing and reverts to previous state", () => {
    renderWithContext();

    fireEvent.click(screen.getByRole("button", { name: /edit profile/i }));
    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(screen.getByText(/name/i)).toHaveTextContent(mockUser.name); // should show original name
  });

  test("adds a new project input", () => {
    renderWithContext();

    fireEvent.click(screen.getByRole("button", { name: /edit profile/i }));
    fireEvent.click(screen.getByRole("button", { name: /add project/i }));

    expect(screen.getAllByPlaceholderText("Project Name")).toHaveLength(2); // should have original + new
  });
});

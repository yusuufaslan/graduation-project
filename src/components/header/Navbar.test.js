import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn()
  }
}));

describe("Navbar", () => {
  it("renders correctly", () => {
    const { getByAltText, getByText } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(getByAltText("Your Company")).toBeInTheDocument();
    expect(getByText("About")).toBeInTheDocument();
    expect(getByText("Explore")).toBeInTheDocument();
    expect(getByText("Proposals")).toBeInTheDocument();
    expect(getByText("Create Project")).toBeInTheDocument();
  });

  it("updates current navigation item on click", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const proposalsLink = getByText("Proposals");
    fireEvent.click(proposalsLink);

    expect(proposalsLink).toHaveClass("bg-gray-900");
    expect(toast.success).not.toHaveBeenCalled();
  });

  it("handles sign out correctly", async () => {
    localStorage.setItem("token", "mock-token");

    const { getByRole, getByText } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const userMenuButton = getByRole("button", { name: "Open user menu" });
    fireEvent.click(userMenuButton);

    const signOutButton = getByText("Sign out");
    fireEvent.click(signOutButton);

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBeNull();
      expect(toast.success).toHaveBeenCalledWith("Logout successful!");
    });
  });
});

// CreateProject.test.js

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import CreateProject from "./CreateProject";
import Navbar from "../../components/header/Navbar";

// Mock the Navbar component to avoid rendering issues during tests
jest.mock("../../components/header/Navbar", () => () => <div>Mocked Navbar</div>);

// Mock axios
jest.mock("axios");

describe("CreateProject Component", () => {
  beforeEach(() => {
    axios.get.mockResolvedValueOnce({
      data: [
        { _id: "1", name: "Tag1" },
        { _id: "2", name: "Tag2" },
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders CreateProject component and form fields", async () => {
    render(
      <MemoryRouter>
        <CreateProject />
      </MemoryRouter>
    );

    expect(screen.getByText(/Mocked Navbar/i)).toBeInTheDocument();
    expect(screen.getByText(/Create New Project/i)).toBeInTheDocument();

    // Check if the form fields are present
    expect(screen.getByPlaceholderText(/Enter project name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter project description/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter project abstract/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Is Public/i)).toBeInTheDocument();

    // Simulate filling out the form
    fireEvent.change(screen.getByPlaceholderText(/Enter project name/i), {
      target: { value: "Test Project" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter project description/i), {
      target: { value: "This is a test project description." },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter project abstract/i), {
      target: { value: "This is a test project abstract." },
    });

    // Check if the values are correctly updated
    expect(screen.getByPlaceholderText(/Enter project name/i)).toHaveValue("Test Project");
    expect(screen.getByPlaceholderText(/Enter project description/i)).toHaveValue("This is a test project description.");
    expect(screen.getByPlaceholderText(/Enter project abstract/i)).toHaveValue("This is a test project abstract.");
  });
});

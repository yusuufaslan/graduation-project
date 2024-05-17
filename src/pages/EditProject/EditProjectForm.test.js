import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import EditProjectForm from './EditProjectForm';

// Mock the axios module
jest.mock('axios');

const mockProjectData = {
  project: {
    name: "Test Project",
    description: "This is a test project",
    abstract: "Abstract of the test project",
    tagIds: [],
    userIds: [],
    datasetIds: [],
    ownerId: "owner123",
    updated_at: new Date().toISOString(),
  },
};

const mockTagData = [
  { _id: "tag1", name: "Tag 1" },
  { _id: "tag2", name: "Tag 2" },
];

const mockUserNameInfo = {
  userNameInfo: {
    name: "John",
    surname: "Doe",
  },
};

describe('EditProjectForm', () => {
  beforeEach(() => {
    // Mock the axios.post and axios.get calls
    axios.post.mockResolvedValueOnce({ data: mockProjectData });
    axios.get.mockResolvedValueOnce({ status: 200, data: mockTagData });
    axios.get.mockResolvedValueOnce({ status: 200, data: mockUserNameInfo });
    
    // Mock localStorage.getItem to return a token
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue('mockToken');
  });

  test('renders without crashing and displays the project name', async () => {
    render(
      <BrowserRouter>
        <EditProjectForm />
      </BrowserRouter>
    );

    // Ensure loading text is present initially
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Wait for the project data to be fetched and displayed
    const projectElements = await screen.findAllByText(/Test Project/i);
    // Check if the number of elements with the text "Test Project" is as expected
    expect(projectElements.length).toBe(3);

    // Check if project details are rendered correctly
    expect(screen.getByText(/This is a test project/i)).toBeInTheDocument();
    expect(screen.getByText(/Abstract of the test project/i)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  });
});

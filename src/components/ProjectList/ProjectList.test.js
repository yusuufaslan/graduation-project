import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProjectList from './ProjectList';
import axios from 'axios';

jest.mock('axios');

const mockProjects = [
  {
    _id: 'project1',
    name: 'Test Project 1',
    ownerId: 'owner123',
    description: 'Description of Test Project a',
    tagIds: [{ _id: 'tag1', name: 'Tag 1' }],
    updated_at: new Date().toISOString(),
  },
  {
    _id: 'project2',
    name: 'Test Project 2',
    ownerId: 'owner456',
    description: 'Description of Test Project b',
    tagIds: [{ _id: 'tag2', name: 'Tag 2' }],
    updated_at: new Date().toISOString(),
  },
];

const mockUserNameInfo = {
  userNameInfo: {
    name: 'John',
    surname: 'Doe',
  },
};

describe('ProjectList', () => {
  beforeEach(() => {
    axios.get.mockImplementation((url, config) => {
      if (url.includes('user/name-from-id')) {
        expect(config.headers.Authorization).toEqual('Bearer mockToken');
        return Promise.resolve({ data: mockUserNameInfo });
      }
    });
  });

  test('renders project list correctly', async () => {
    render(
      <BrowserRouter>
        <ProjectList projects={mockProjects} mode="detail" />
      </BrowserRouter>
    );

    // Ensure loading text is present initially
    await waitFor(() => {
      expect(screen.queryAllByText(/Test Project 1/i)).toHaveLength(1); // Expect only one element with "Test Project 1"
      expect(screen.queryAllByText(/Test Project 2/i)).toHaveLength(1); // Expect only one element with "Test Project 2"
    });

    // Check if project details are rendered correctly
    expect(screen.getByText(/Description of Test Project a/i)).toBeInTheDocument();
    expect(screen.getByText(/Description of Test Project b/i)).toBeInTheDocument();
    expect(screen.queryAllByText(/Unknown User/i)).toHaveLength(2);
  });
});

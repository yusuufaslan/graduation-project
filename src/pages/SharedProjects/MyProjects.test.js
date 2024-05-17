import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import MyProjects from './MyProjects';

jest.mock('axios');

// Disable console.error and console.log
beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });
  
  // Re-enable console.error and console.log after tests
  afterAll(() => {
    console.error.mockRestore();
    console.log.mockRestore();
  });

describe('MyProjects', () => {
  beforeEach(() => {
    localStorage.clear(); // Clear local storage before each test
  });

  test('renders loading message initially', () => {
    render(
      <MemoryRouter>
        <MyProjects />
      </MemoryRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders "You have not shared any projects yet." message when no projects are returned', async () => {
    axios.get.mockResolvedValueOnce({ status: 200, data: { projects: [] } });
    render(
      <MemoryRouter>
        <MyProjects />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('You have not shared any projects yet.')).toBeInTheDocument();
    });
  });

  test('renders list of participated projects', async () => {
    const projects = [
      { id: 1, name: 'Project 1', tagIds: [1, 2, 3] },
      { id: 2, name: 'Project 2', tagIds: [4, 5, 6] },
    ];
    axios.get.mockResolvedValueOnce({ status: 200, data: { projects } });
    render(
      <MemoryRouter>
        <MyProjects />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull(); // Ensure loading state is gone
      expect(screen.getByText('Project 1')).toBeInTheDocument();
      expect(screen.getByText('Project 2')).toBeInTheDocument();
    });
  });
  

  test('handles error when fetching projects', async () => {
    const errorMessage = 'Failed to fetch projects';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));
    render(
      <MemoryRouter>
        <MyProjects />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(console.error);
    });
  });

  test('handles token authorization', async () => {
    const token = 'mocked_token';
    localStorage.setItem('token', token);
    axios.get.mockResolvedValueOnce({ status: 200, data: { projects: [] } });
    render(
      <MemoryRouter>
        <MyProjects />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:3838/api/user/owned-projects', {
        headers: { Authorization: `Bearer ${token}` },
      });
    });
  });
});

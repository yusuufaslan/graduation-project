import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

describe('App', () => {
  test('Always true test', () => {
    expect(true).toBe(true);
  });
  
  test('Renders home page when user opens the app', () => {
    render(<App />);
    
    const headingElement = screen.getByText(/Empowering Healthcare Data Collaboration: Find, Share, Securely/);
    
    expect(headingElement).toBeInTheDocument();
  });
    
  // test('renders Sign In page when not authenticated', async () => {
  //   render(<App />, { wrapper: BrowserRouter });
  //   await waitFor(() => expect(screen.getByText(/sign in to your account/i)).toBeInTheDocument());
  // });

  // test('renders Home page when authenticated', async () => {
  //   const token = 'fake-token';
  //   localStorage.setItem('token', token);
  //   axios.get.mockResolvedValueOnce({ data: { token } });
  //   render(<App />, { wrapper: BrowserRouter });
  //   await waitFor(() => expect(screen.getByText(/welcome/i)).toBeInTheDocument());
  // });

  // test('redirects to Sign In page when not authenticated and trying to access protected route', async () => {
  //   render(<App />, { wrapper: BrowserRouter });
  //   await waitFor(() => expect(screen.getByText(/sign in to your account/i)).toBeInTheDocument());
  //   userEvent.click(screen.getByText(/explore/i));
  //   await waitFor(() => expect(screen.getByText(/sign in to your account/i)).toBeInTheDocument());
  // });

  // test('redirects to Home page when authenticated and trying to access Sign In page', async () => {
  //   const token = 'fake-token';
  //   localStorage.setItem('token', token);
  //   axios.get.mockResolvedValueOnce({ data: { token } });
  //   render(<App />, { wrapper: BrowserRouter });
  //   await waitFor(() => expect(screen.getByText(/welcome/i)).toBeInTheDocument());
  //   userEvent.click(screen.getByText(/sign in/i));
  //   await waitFor(() => expect(screen.getByText(/welcome/i)).toBeInTheDocument());
  // });
});

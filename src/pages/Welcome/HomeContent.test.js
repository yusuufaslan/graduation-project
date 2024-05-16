import React from 'react';
import { render, screen } from '@testing-library/react';
import HomeContent from './HomeContent';

describe('HomeContent Component', () => {
  test('renders the hero section with correct text', () => {
    render(<HomeContent signedIn={false} />);

    // Check if the hero section text is rendered
    expect(screen.getByText(/Empowering Healthcare Data Collaboration/i)).toBeInTheDocument();
    expect(screen.getByText(/Join the movement towards revolutionizing healthcare collaboration!/i)).toBeInTheDocument();
  });

  test('renders sign-in button if not signed in', () => {
    render(<HomeContent signedIn={false} />);

    // Check if the Sign In button is rendered
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });

  test('does not render sign-in button if signed in', () => {
    render(<HomeContent signedIn={true} />);

    // Check if the Sign In button is not rendered
    expect(screen.queryByText(/Sign In/i)).toBeNull();
  });

  test('renders about section with correct text', () => {
    render(<HomeContent signedIn={false} />);

    // Check if the About section text is rendered
    expect(screen.getByText(/About Our Project/i)).toBeInTheDocument();
    expect(screen.getByText(/The innovative healthcare project endeavors to revolutionize/i)).toBeInTheDocument();
  });

  test('renders contact section with correct text', () => {
    render(<HomeContent signedIn={false} />);

    // Check if the Contact Us section text is rendered
    expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
    expect(screen.getByText(/Have questions or feedback/i)).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import About from './About';

// Mocking the components used in About component
jest.mock('../../components/header/Navbar', () => () => <div>Mocked Navbar</div>);
jest.mock('./HomeContent', () => (props) => <div>Mocked HomeContent with signedIn={props.signedIn.toString()}</div>);

describe('About Component', () => {
  test('renders Navbar and HomeContent components', () => {
    render(<About />);

    // Check if Navbar is rendered
    expect(screen.getByText('Mocked Navbar')).toBeInTheDocument();

    // Check if HomeContent is rendered with signedIn true
    expect(screen.getByText('Mocked HomeContent with signedIn=true')).toBeInTheDocument();
  });
});

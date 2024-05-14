import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import '@testing-library/jest-dom'; 
import SignUp from './SignUp'; 
import axios from 'axios'; 
import { toast } from 'react-toastify';

jest.mock('axios', () => ({
  get: jest.fn((url) => {
    if (url === 'http://localhost:3838/api/institution/get') {
      return Promise.resolve({ 
        status: 200, 
        data: [{ _id: '1', name: 'Institution 1' }, { _id: '2', name: 'Institution 2' }] 
      });
    }
  }),
  post: jest.fn((url, data) => {
    if (url === 'http://localhost:3838/api/user/signup') {
      if (data.email === 'existingemail@example.com') {
        return Promise.reject(new Error('User already exists'));
      } else {
        return Promise.resolve({ status: 200 });
      }
    }
  }),
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('SignUp component', () => {
  test('renders form fields', async () => {
    await act(async () => {
      render(
        <Router>
          <SignUp />
        </Router>
      );
    });

    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Surname')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
      expect(screen.getByLabelText('Role')).toBeInTheDocument();
      expect(screen.getByLabelText('Institution')).toBeInTheDocument();
      expect(screen.getByLabelText('Address')).toBeInTheDocument();
    });
  });

//   test('displays error message for invalid email format', async () => {
//     render(
//       <Router>
//         <SignUp />
//       </Router>
//     );

//     const emailInput = screen.getByLabelText('Email');

//     fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
//     fireEvent.blur(emailInput);

//     await waitFor(() => {
//       expect(screen.getByText('Invalid email format')).toBeInTheDocument();
//     });
//   });

//   test('displays error message if passwords do not match', async () => {
//     render(
//       <Router>
//         <SignUp />
//       </Router>
//     );

//     const passwordInput = screen.getByLabelText('Password');
//     const confirmPasswordInput = screen.getByLabelText('Confirm Password');

//     fireEvent.change(passwordInput, { target: { value: 'password' } });
//     fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

//     await waitFor(() => {
//       expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
//     });
//   });

//   test('submits the form with valid data', async () => {
//     render(
//       <Router>
//         <SignUp />
//       </Router>
//     );

//     const nameInput = screen.getByLabelText('Name');
//     const surnameInput = screen.getByLabelText('Surname');
//     const emailInput = screen.getByLabelText('Email');
//     const passwordInput = screen.getByLabelText('Password');
//     const confirmPasswordInput = screen.getByLabelText('Confirm Password');
//     const roleInput = screen.getByLabelText('Role');
//     const institutionInput = screen.getByLabelText('Institution');
//     const addressInput = screen.getByLabelText('Address');
//     const signUpButton = screen.getByRole('button', { name: /sign up/i });

//     fireEvent.change(nameInput, { target: { value: 'John' } });
//     fireEvent.change(surnameInput, { target: { value: 'Doe' } });
//     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//     fireEvent.change(passwordInput, { target: { value: 'password' } });
//     fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });
//     fireEvent.change(roleInput, { target: { value: 'student' } });
//     fireEvent.change(institutionInput, { target: { value: 'Institution 1' } });
//     fireEvent.change(addressInput, { target: { value: '123 Street, City, Country' } });

//     fireEvent.click(signUpButton);

//     await waitFor(() => {
//       expect(axios.post).toHaveBeenCalledWith(
//         'http://localhost:3838/api/user/signup',
//         {
//           name: 'John',
//           surname: 'Doe',
//           email: 'test@example.com',
//           password: 'password',
//           confirmPassword: 'password',
//           role: 'student',
//           institution: 'Institution 1',
//           address: '123 Street, City, Country',
//         }
//       );
//       expect(toast.success).toHaveBeenCalledWith(
//         "Welcome! We've sent you an email with a verification link. Please verify your email to complete the signup process."
//       );
//     });
//   });

//   test('displays error message if user already exists', async () => {
//     render(
//       <Router>
//         <SignUp />
//       </Router>
//     );

//     const emailInput = screen.getByLabelText('Email');
//     const signUpButton = screen.getByRole('button', { name: /sign up/i });

//     fireEvent.change(emailInput, { target: { value: 'existingemail@example.com' } });

//     fireEvent.click(signUpButton);

//     await waitFor(() => {
//       expect(axios.post).toHaveBeenCalledWith(
//         'http://localhost:3838/api/user/signup',
//         {
//           name: '',
//           surname: '',
//           email: 'existingemail@example.com',
//           password: '',
//           confirmPassword: '',
//           role: '',
//           institution: '',
//           address: '',
//         }
//       );
//       expect(toast.error).toHaveBeenCalledWith('User already exists. Please verify your account first.');
//     });
//   });
});

import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProposalsPage from './ProposalsPage';

test('renders proposals page with loading state', () => {
  const { getByText } = render(
    <MemoryRouter>
      <ProposalsPage />
    </MemoryRouter>
  );
  const loadingMessage = getByText('Proposals Loading...');
  expect(loadingMessage).toBeInTheDocument();
});

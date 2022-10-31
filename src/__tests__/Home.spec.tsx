import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import Home from '../pages/Home';
import AppReduxWrapper from '../utils/AppReduxWrapper';

describe('Home', () => {
  it('should render tournaments on Home', async () => {
    render(
      <AppReduxWrapper>
        <Home />
      </AppReduxWrapper>
    );

    expect(screen.getByText('Loading tournaments ...')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getAllByTestId('tournament')[0]).toBeInTheDocument()
    );
  });
});

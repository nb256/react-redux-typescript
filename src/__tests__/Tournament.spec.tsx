import React from 'react';

import { render, screen } from '@testing-library/react';

import Tournament from '../components/Tournament';
import AppReduxWrapper from '../utils/AppReduxWrapper';

describe('Tournament', () => {
  const tournament = {
    id: '1',
    name: 'Tournament 1',
    organizer: 'Organizer 1',
    game: 'Game 1',
    participants: { current: 0, max: 10 },
    startDate: new Date().toISOString(),
  };

  it('should render tournament details', () => {
    render(
      <AppReduxWrapper>
        <Tournament {...tournament} />
      </AppReduxWrapper>
    );

    expect(screen.getByText(tournament.name)).toBeInTheDocument();
    expect(
      screen.getByText(tournament.organizer, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(tournament.game, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `${tournament.participants.current}/${tournament.participants.max}`,
        { exact: false }
      )
    ).toBeInTheDocument();
  });
});

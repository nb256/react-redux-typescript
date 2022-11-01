import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Tournaments from '../components/Tournaments';
import AppReduxWrapper from '../utils/AppReduxWrapper';

describe('Tournaments', () => {
  it('should render "Loading tournaments ..." when tournaments are loading', () => {
    render(
      <Tournaments
        tournaments={[]}
        error={false}
        loading={true}
        retry={jest.fn()}
      />
    );

    expect(screen.getByText('Loading tournaments ...')).toBeInTheDocument();
  });

  it('should render "No tournaments found." when there is no tournaments', () => {
    render(
      <Tournaments
        tournaments={[]}
        error={false}
        loading={false}
        retry={jest.fn()}
      />
    );

    expect(screen.getByText('No tournaments found.')).toBeInTheDocument();
  });

  it('should render the tournaments', () => {
    render(
      <Tournaments
        tournaments={[]}
        error={true}
        loading={false}
        retry={jest.fn()}
      />
    );

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(
      screen.getByText('RETRY', { selector: 'button' })
    ).toBeInTheDocument();
  });

  it('should call retry function after clicking RETRY button', async () => {
    const retry = jest.fn();
    render(
      <Tournaments
        tournaments={[]}
        error={true}
        loading={false}
        retry={retry}
      />
    );

    await userEvent.click(screen.getByText('RETRY', { selector: 'button' }));
    expect(retry).toHaveBeenCalledTimes(1);
  });

  it('should render the tournaments', () => {
    const tournament = {
      id: '1',
      name: 'Tournament 1',
      organizer: 'Organizer 1',
      game: 'Game 1',
      startDate: '2022-10-31T11:58:18.357Z',
      participants: { current: 5, max: 10 },
    };
    render(
      <AppReduxWrapper>
        <Tournaments
          tournaments={[tournament]}
          error={false}
          loading={false}
          retry={jest.fn()}
        />
      </AppReduxWrapper>
    );

    expect(screen.getByText(tournament.name)).toBeInTheDocument();
    expect(
      screen.getByText(`Organizer: ${tournament.organizer}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Game: ${tournament.game}`)).toBeInTheDocument();
    expect(
      screen.getByText('31/10/2022, 11:58:18', { exact: false })
    ).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

  it('should edit tournament name', async () => {
    const updatedName = 'Tournament 2';

    render(
      <AppReduxWrapper>
        <Home />
      </AppReduxWrapper>
    );

    await waitFor(() =>
      expect(screen.getAllByTestId('tournament')[0]).toBeInTheDocument()
    );

    const firstTournament = screen.getAllByTestId('tournament')[0];

    window.prompt = jest.fn().mockImplementation(() => updatedName);

    await userEvent.click(
      within(firstTournament).getByText('EDIT', { selector: 'button' })
    );

    expect(screen.getByText(updatedName, { exact: false })).toBeInTheDocument();
  });

  it('should not edit if tournament name has special characters or only spaces', async () => {
    const updatedName = 'Tournament ^+^2';

    render(
      <AppReduxWrapper>
        <Home />
      </AppReduxWrapper>
    );

    await waitFor(() =>
      expect(screen.getAllByTestId('tournament')[0]).toBeInTheDocument()
    );

    const firstTournament = screen.getAllByTestId('tournament')[0];

    window.prompt = jest.fn().mockImplementation(() => updatedName);

    await userEvent.click(
      within(firstTournament).getByText('EDIT', { selector: 'button' })
    );

    const updatedNameElement = screen.queryByText(updatedName);
    expect(updatedNameElement).not.toBeInTheDocument();

    const onlySpaces = '   ';
    window.prompt = jest.fn().mockImplementation(() => onlySpaces);

    await userEvent.click(
      within(firstTournament).getByText('EDIT', { selector: 'button' })
    );

    const updatedNameElement2 = screen.queryByText(onlySpaces);
    expect(updatedNameElement2).not.toBeInTheDocument();
  });

  it('should delete tournament', async () => {
    render(
      <AppReduxWrapper>
        <Home />
      </AppReduxWrapper>
    );

    await waitFor(() =>
      expect(screen.getAllByTestId('tournament')[0]).toBeInTheDocument()
    );

    const firstTournament = screen.getAllByTestId('tournament')[0];

    window.confirm = jest.fn().mockImplementation(() => true);

    await userEvent.click(
      within(firstTournament).getByText('DELETE', { selector: 'button' })
    );

    expect(firstTournament).not.toBeInTheDocument();
  });

  it('should not delete tournament if user cancels', async () => {
    render(
      <AppReduxWrapper>
        <Home />
      </AppReduxWrapper>
    );

    await waitFor(() =>
      expect(screen.getAllByTestId('tournament')[0]).toBeInTheDocument()
    );

    const firstTournament = screen.getAllByTestId('tournament')[0];

    window.confirm = jest.fn().mockImplementation(() => false);

    await userEvent.click(
      within(firstTournament).getByText('DELETE', { selector: 'button' })
    );

    expect(firstTournament).toBeInTheDocument();
  });

  it('should search tournaments', async () => {
    render(
      <AppReduxWrapper>
        <Home />
      </AppReduxWrapper>
    );

    const searchInput = screen.getByPlaceholderText('Search tournament ...');
    await waitFor(() =>
      expect(screen.getAllByTestId('tournament')[0]).toBeInTheDocument()
    );
    const firstTournament = screen.getAllByTestId('tournament')[0];

    const firstTournamentName =
      within(firstTournament).getByTestId('tournament-name').textContent;

    if (!firstTournamentName) {
      throw new Error('firstTournamentName is undefined');
    }

    await userEvent.type(searchInput, firstTournamentName);
    await waitFor(() =>
      expect(screen.getAllByTestId('tournament').length === 1).toBeTruthy()
    );

    expect(
      screen.getByText(firstTournamentName, {
        exact: false,
      })
    ).toBeInTheDocument();

    await userEvent.type(searchInput, 'asdasdasdasdasda');

    await waitFor(() =>
      expect(screen.getByText('No tournaments found.')).toBeInTheDocument()
    );
  });

  it('should create a tournament', async () => {
    render(
      <AppReduxWrapper>
        <Home />
      </AppReduxWrapper>
    );

    const tournamentName = 'Tournament Create Test';

    window.prompt = jest.fn().mockImplementation(() => tournamentName);

    await userEvent.click(
      screen.getByText('CREATE TOURNAMENT', { selector: 'button' })
    );

    await waitFor(() =>
      expect(
        screen.getAllByText(tournamentName, { exact: false })[0]
      ).toBeInTheDocument()
    );
  });
});

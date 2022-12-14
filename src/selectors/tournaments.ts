import { RootState } from '../reducers';

export const getTournaments = (state: RootState) => state.tournaments.entities;

export const getTournamentsLoading = (state: RootState) =>
  state.tournaments.loading;

export const getTournamentsError = (state: RootState) =>
  state.tournaments.error;

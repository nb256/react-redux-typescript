import { useSelector, useDispatch } from 'react-redux';

import {
  getTournamentsError,
  getTournamentsLoading,
} from '../selectors/tournaments';

import { createTournament as createTournamentAction } from '../actions/tournament';

import { Tournament } from '../types/Tournament';

export default function useCreateTournament() {
  const loading = useSelector(getTournamentsLoading);
  const error = useSelector(getTournamentsError);

  const dispatch = useDispatch();

  const createTournament = (tournament: Partial<Tournament>) =>
    createTournamentAction(dispatch, tournament);

  return { error, loading, createTournament };
}

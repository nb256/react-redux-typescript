import {
  getTournamentsError,
  getTournamentsLoading,
} from '../selectors/tournaments';

import { createTournament as createTournamentAction } from '../features/tournaments';

import { Tournament } from '../types/Tournament';
import { useAppDispatch, useAppSelector } from '../store';

export default function useCreateTournament() {
  const loading = useAppSelector(getTournamentsLoading);
  const error = useAppSelector(getTournamentsError);

  const dispatch = useAppDispatch();

  const createTournament = (tournament: Partial<Tournament>) =>
    dispatch(createTournamentAction(tournament));

  return { error, loading, createTournament };
}

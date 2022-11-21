import {
  getTournamentsError,
  getTournamentsLoading,
} from '../selectors/tournaments';
import { editTournament as editTournamentAction } from '../features/tournaments';
import { Tournament } from '../types/Tournament';
import { useAppDispatch, useAppSelector } from '../store';

export default function useEditTournament() {
  const loading = useAppSelector(getTournamentsLoading);
  const error = useAppSelector(getTournamentsError);

  const dispatch = useAppDispatch();

  const editTournament = (tournament: Partial<Tournament>) =>
    dispatch(editTournamentAction(tournament));

  return { error, loading, editTournament };
}

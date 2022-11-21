import {
  getTournamentsError,
  getTournamentsLoading,
} from '../selectors/tournaments';
import { editTournament as editTournamentAction } from '../actions/tournament';
import { Tournament } from '../types/Tournament';
import { useAppDispatch, useAppSelector } from '../store';

export default function useEditTournament() {
  const loading = useAppSelector(getTournamentsLoading);
  const error = useAppSelector(getTournamentsError);

  const dispatch = useAppDispatch();

  const editTournament = (tournament: Partial<Tournament>) =>
    editTournamentAction(dispatch, tournament);

  return { error, loading, editTournament };
}

import {
  getTournamentsError,
  getTournamentsLoading,
} from '../selectors/tournaments';

import { deleteTournament as deleteTournamentAction } from '../actions/tournament';
import { useAppDispatch, useAppSelector } from '../store';

export default function useDeleteTournament() {
  const loading = useAppSelector(getTournamentsLoading);
  const error = useAppSelector(getTournamentsError);

  const dispatch = useAppDispatch();

  const deleteTournament = (tournamentId: string) =>
    deleteTournamentAction(dispatch, tournamentId);

  return { error, loading, deleteTournament };
}

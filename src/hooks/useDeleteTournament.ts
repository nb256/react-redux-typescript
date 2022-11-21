import {
  getTournamentsError,
  getTournamentsLoading,
} from '../selectors/tournaments';

import { deleteTournament as deleteTournamentAction } from '../features/tournaments';
import { useAppDispatch, useAppSelector } from '../store';

export default function useDeleteTournament() {
  const loading = useAppSelector(getTournamentsLoading);
  const error = useAppSelector(getTournamentsError);

  const dispatch = useAppDispatch();

  const deleteTournament = (tournamentId: string) =>
    dispatch(deleteTournamentAction(tournamentId));

  return { error, loading, deleteTournament };
}

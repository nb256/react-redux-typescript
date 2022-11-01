import { useSelector, useDispatch } from 'react-redux';

import {
  getTournamentsError,
  getTournamentsLoading,
} from '../selectors/tournaments';

import { deleteTournament as deleteTournamentAction } from '../actions/tournament';

export default function useDeleteTournament() {
  const loading = useSelector(getTournamentsLoading);
  const error = useSelector(getTournamentsError);

  const dispatch = useDispatch();

  const deleteTournament = (tournamentId: string) =>
    deleteTournamentAction(dispatch, tournamentId);

  return { error, loading, deleteTournament };
}

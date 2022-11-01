import { useSelector, useDispatch } from 'react-redux';

import {
  getTournamentsError,
  getTournamentsLoading,
} from '../selectors/tournaments';
import { editTournament as editTournamentAction } from '../actions/tournament';
import { Tournament } from '../types/Tournament';

export default function useEditTournament() {
  const loading = useSelector(getTournamentsLoading);
  const error = useSelector(getTournamentsError);

  const dispatch = useDispatch();

  const editTournament = (tournament: Partial<Tournament>) =>
    editTournamentAction(dispatch, tournament);

  return { error, loading, editTournament };
}

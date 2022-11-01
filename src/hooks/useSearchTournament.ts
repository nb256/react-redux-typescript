import { useSelector, useDispatch } from 'react-redux';

import {
  getTournamentsError,
  getTournamentsLoading,
} from '../selectors/tournaments';

import { searchTournaments as searchTournamentsAction } from '../actions/tournaments';

export default function useSearchTournament() {
  const loading = useSelector(getTournamentsLoading);
  const error = useSelector(getTournamentsError);

  const dispatch = useDispatch();

  const searchTournament = (query: string) =>
    searchTournamentsAction(dispatch, query);

  return { error, loading, searchTournament };
}

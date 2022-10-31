import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getTournaments,
  getTournamentsError,
  getTournamentsLoading,
} from '../selectors/tournaments';
import { fetchTournaments } from '../actions/tournaments';

export default function useTournaments() {
  const tournaments = useSelector(getTournaments);
  const loading = useSelector(getTournamentsLoading);
  const error = useSelector(getTournamentsError);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchTournaments(dispatch);
  }, [dispatch]);

  const retry = () => fetchTournaments(dispatch);

  return { tournaments, error, loading, retry };
}

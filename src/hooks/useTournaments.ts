import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getTournaments,
  getTournamentsError,
  getTournamentsLoading,
} from '../selectors/tournaments';
import { fetchTournaments, searchTournaments } from '../actions/tournaments';
import { useLocation } from 'react-router-dom';

export default function useTournaments() {
  const { search } = useLocation();
  const tournaments = useSelector(getTournaments);
  const loading = useSelector(getTournamentsLoading);
  const error = useSelector(getTournamentsError);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchTournaments(dispatch);
  }, [dispatch]);

  const query = useMemo(() => new URLSearchParams(search), [search]).get(
    'query'
  );

  const retry = () =>
    query ? searchTournaments(dispatch, query) : fetchTournaments(dispatch);

  return { tournaments, error, loading, retry };
}

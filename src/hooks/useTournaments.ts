import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import {
  getTournaments,
  getTournamentsError,
  getTournamentsLoading,
} from '../selectors/tournaments';
import { fetchTournaments, searchTournaments } from '../features/tournaments';
import { useAppDispatch, useAppSelector } from '../store';

export default function useTournaments() {
  const { search } = useLocation();
  const tournaments = useAppSelector(getTournaments);
  const loading = useAppSelector(getTournamentsLoading);
  const error = useAppSelector(getTournamentsError);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTournaments());
  }, [dispatch]);

  const query = useMemo(() => new URLSearchParams(search), [search]).get(
    'query'
  );

  const retry = () =>
    query ? dispatch(searchTournaments(query)) : dispatch(fetchTournaments);

  return { tournaments, error, loading, retry };
}

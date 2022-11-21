import { useEffect, useMemo } from 'react';
import {
  getTournaments,
  getTournamentsError,
  getTournamentsLoading,
} from '../selectors/tournaments';
import { fetchTournaments, searchTournaments } from '../actions/tournaments';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';

export default function useTournaments() {
  const { search } = useLocation();
  const tournaments = useAppSelector(getTournaments);
  const loading = useAppSelector(getTournamentsLoading);
  const error = useAppSelector(getTournamentsError);

  const dispatch = useAppDispatch();

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

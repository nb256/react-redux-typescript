import {
  getTournamentsError,
  getTournamentsLoading,
} from '../selectors/tournaments';

import { searchTournaments as searchTournamentsAction } from '../features/tournaments';
import { useAppDispatch, useAppSelector } from '../store';

export default function useSearchTournament() {
  const loading = useAppSelector(getTournamentsLoading);
  const error = useAppSelector(getTournamentsError);

  const dispatch = useAppDispatch();

  const searchTournament = (query: string) =>
    dispatch(searchTournamentsAction(query));

  return { error, loading, searchTournament };
}

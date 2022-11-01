import { AnyAction, Dispatch } from 'redux';

import request from '../utils/request';
import { API_TOURNAMENTS_URL } from '../constants/api';
import { Tournament } from '../types/Tournament';

export const FETCH_TOURNAMENTS_BEGIN = 'FETCH_TOURNAMENTS_BEGIN';
export const FETCH_TOURNAMENTS_SUCCESS = 'FETCH_TOURNAMENTS_SUCCESS';
export const FETCH_TOURNAMENTS_FAILURE = 'FETCH_TOURNAMENTS_FAILURE';

export const fetchTournamentsBegin = () => ({
  type: FETCH_TOURNAMENTS_BEGIN,
});

export const fetchTournamentsSuccess = (tournaments: Tournament[]) => ({
  type: FETCH_TOURNAMENTS_SUCCESS,
  payload: { tournaments },
});

export const fetchTournamentsFailure = () => ({
  type: FETCH_TOURNAMENTS_FAILURE,
});

export async function fetchTournaments(dispatch: Dispatch<AnyAction>) {
  dispatch(fetchTournamentsBegin());

  const tournaments = await request<Tournament[]>(API_TOURNAMENTS_URL);
  if (!tournaments) {
    return dispatch(fetchTournamentsFailure());
  }

  dispatch(fetchTournamentsSuccess(tournaments));
}

export const SEARCH_TOURNAMENTS_BEGIN = 'SEARCH_TOURNAMENTS_BEGIN';
export const SEARCH_TOURNAMENTS_SUCCESS = 'SEARCH_TOURNAMENTS_SUCCESS';
export const SEARCH_TOURNAMENTS_FAILURE = 'SEARCH_TOURNAMENTS_FAILURE';

export const searchTournamentsBegin = () => ({
  type: SEARCH_TOURNAMENTS_BEGIN,
});

export const searchTournamentsSuccess = (tournaments: Tournament[]) => ({
  type: SEARCH_TOURNAMENTS_SUCCESS,
  payload: { tournaments },
});

export const searchTournamentsFailure = () => ({
  type: SEARCH_TOURNAMENTS_FAILURE,
});

export async function searchTournaments(
  dispatch: Dispatch<AnyAction>,
  query: string
) {
  dispatch(searchTournamentsBegin());

  const tournaments = await request<Tournament[]>(
    `${API_TOURNAMENTS_URL}?q=${query}`
  );
  if (!tournaments) {
    return dispatch(searchTournamentsFailure());
  }

  dispatch(searchTournamentsSuccess(tournaments));
}

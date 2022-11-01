import { AnyAction, Dispatch } from 'redux';

import request from '../utils/request';
import { API_TOURNAMENTS_URL } from '../constants/api';
import { Tournament } from '../types/Tournament';

export const EDIT_TOURNAMENT_BEGIN = 'EDIT_TOURNAMENT_BEGIN';
export const EDIT_TOURNAMENT_SUCCESS = 'EDIT_TOURNAMENT_SUCCESS';
export const EDIT_TOURNAMENT_FAILURE = 'EDIT_TOURNAMENT_FAILURE';

export const editTournamentBegin = () => ({
  type: EDIT_TOURNAMENT_BEGIN,
});

export const editTournamentSuccess = (tournament: Partial<Tournament>) => ({
  type: EDIT_TOURNAMENT_SUCCESS,
  payload: { tournament },
});

export const editTournamentFailure = () => ({
  type: EDIT_TOURNAMENT_FAILURE,
});

export async function editTournament(
  dispatch: Dispatch<AnyAction>,
  tournament: Partial<Tournament>
) {
  dispatch(editTournamentBegin());

  // Optimistic update
  dispatch(editTournamentSuccess(tournament));

  const updatedTournament = await request<Tournament>(
    `${API_TOURNAMENTS_URL}/${tournament.id}`,
    {
      method: 'PATCH',
      body: JSON.stringify({ name: tournament.name }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (!updatedTournament) {
    window?.alert("Couldn't update tournament");
    dispatch(editTournamentFailure());
    //refresh the page to get the latest data
    window?.location.reload();
  }
}

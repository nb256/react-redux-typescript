import {
  FETCH_TOURNAMENTS_BEGIN,
  FETCH_TOURNAMENTS_FAILURE,
  FETCH_TOURNAMENTS_SUCCESS,
} from '../actions/tournaments';
import {
  EDIT_TOURNAMENT_BEGIN,
  EDIT_TOURNAMENT_SUCCESS,
  EDIT_TOURNAMENT_FAILURE,
} from '../actions/tournament';
import { Tournament } from '../types/Tournament';

const initialState = {
  loading: false,
  error: false,
  tournaments: [],
};

export default function tournaments(
  state: {
    loading: boolean;
    error: boolean;
    tournaments: Tournament[];
  } = initialState,
  action: {
    type: string;
    payload: { tournaments: Tournament[]; tournament: Tournament };
  }
) {
  switch (action.type) {
    case FETCH_TOURNAMENTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case FETCH_TOURNAMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        tournaments: action.payload.tournaments,
      };

    case FETCH_TOURNAMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        tournaments: [],
      };

    case EDIT_TOURNAMENT_BEGIN:
      return {
        ...state,
      };

    case EDIT_TOURNAMENT_SUCCESS:
      return {
        ...state,
        tournaments: state.tournaments.map((tournament) =>
          tournament.id === action.payload.tournament.id
            ? { ...tournament, ...action.payload.tournament }
            : tournament
        ),
      };

    case EDIT_TOURNAMENT_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
}

import {
  FETCH_TOURNAMENTS_BEGIN,
  FETCH_TOURNAMENTS_FAILURE,
  FETCH_TOURNAMENTS_SUCCESS,
  SEARCH_TOURNAMENTS_BEGIN,
  SEARCH_TOURNAMENTS_FAILURE,
  SEARCH_TOURNAMENTS_SUCCESS,
} from '../actions/tournaments';
import {
  EDIT_TOURNAMENT_BEGIN,
  EDIT_TOURNAMENT_SUCCESS,
  EDIT_TOURNAMENT_FAILURE,
  DELETE_TOURNAMENT_BEGIN,
  DELETE_TOURNAMENT_SUCCESS,
  DELETE_TOURNAMENT_FAILURE,
  CREATE_TOURNAMENT_BEGIN,
  CREATE_TOURNAMENT_SUCCESS,
  CREATE_TOURNAMENT_FAILURE,
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
    payload: {
      tournaments: Tournament[];
      tournament: Tournament;
      tournamentId: string;
    };
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

    case DELETE_TOURNAMENT_BEGIN:
      return {
        ...state,
      };

    case DELETE_TOURNAMENT_SUCCESS:
      return {
        ...state,
        tournaments: state.tournaments.filter(
          (tournament) => tournament.id !== action.payload.tournamentId
        ),
      };

    case DELETE_TOURNAMENT_FAILURE:
      return {
        ...state,
      };

    case SEARCH_TOURNAMENTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case SEARCH_TOURNAMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        tournaments: action.payload.tournaments,
      };

    case SEARCH_TOURNAMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        tournaments: [],
      };

    case CREATE_TOURNAMENT_BEGIN:
      return {
        ...state,
      };

    case CREATE_TOURNAMENT_SUCCESS:
      return {
        ...state,
        tournaments: [action.payload.tournament, ...state.tournaments],
      };

    case CREATE_TOURNAMENT_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
}

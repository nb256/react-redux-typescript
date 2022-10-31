import {
  FETCH_TOURNAMENTS_BEGIN,
  FETCH_TOURNAMENTS_FAILURE,
  FETCH_TOURNAMENTS_SUCCESS,
} from '../actions/tournaments';
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
    payload: { tournaments: Tournament[] };
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

    default:
      return state;
  }
}

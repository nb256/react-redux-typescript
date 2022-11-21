import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Tournament } from '../types/Tournament';
import { API_TOURNAMENTS_URL } from '../constants/api';
import request from '../utils/request';

export const fetchTournaments = createAsyncThunk(
  'tournaments/getTournaments',
  async () => {
    const response = await request<Tournament[]>(API_TOURNAMENTS_URL);
    return response;
  }
);

export const searchTournaments = createAsyncThunk(
  'tournaments/searchTournaments',
  async (query: string) => {
    const response = await request<Tournament[]>(
      `${API_TOURNAMENTS_URL}?q=${query}`
    );
    return response;
  }
);

export const createTournament = createAsyncThunk(
  'tournaments/createTournament',
  async (tournament: Partial<Tournament>) => {
    const response = await request<Tournament>(API_TOURNAMENTS_URL, {
      method: 'POST',
      body: JSON.stringify(tournament),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  }
);

export const editTournament = createAsyncThunk(
  'tournaments/editTournament',
  async (tournament: Partial<Tournament>) => {
    const response = await request<Tournament>(
      `${API_TOURNAMENTS_URL}/${tournament.id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ name: tournament.name }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  }
);

export const deleteTournament = createAsyncThunk(
  'tournaments/deleteTournament',
  async (tournamentId: string) => {
    const response = await request<Tournament>(
      `${API_TOURNAMENTS_URL}/${tournamentId}`,
      {
        method: 'DELETE',
      }
    );
    return response;
  }
);

interface TournamentsState {
  entities: Tournament[];
  loading: boolean;
  error: boolean;
  pendingEditTournaments: Tournament[];
  pendingDeleteTournaments: Tournament[];
}

const tournamentsSlice = createSlice({
  name: 'tournaments',
  initialState: {
    loading: false,
    error: false,
    entities: [],
    pendingEditTournaments: [],
    pendingDeleteTournaments: [],
  } as TournamentsState,
  reducers: {},
  extraReducers: {
    [fetchTournaments.pending.type]: (state) => {
      state.loading = true;
    },
    [fetchTournaments.fulfilled.type]: (
      state,
      action: PayloadAction<Tournament[]>
    ) => {
      state.loading = false;
      state.entities = action.payload;
    },
    [fetchTournaments.rejected.type]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [searchTournaments.pending.type]: (state) => {
      state.loading = true;
    },
    [searchTournaments.fulfilled.type]: (
      state,
      action: PayloadAction<Tournament[]>
    ) => {
      state.loading = false;
      state.entities = action.payload;
    },
    [searchTournaments.rejected.type]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [createTournament.fulfilled.type]: (
      state,
      action: PayloadAction<Tournament>
    ) => {
      state.loading = false;
      state.entities.unshift(action.payload);
    },
    [editTournament.pending.type]: (
      state,
      action: PayloadAction<
        Tournament,
        string,
        { arg: { id: string; name: string } }
      >
    ) => {
      state.pendingEditTournaments.push(
        state.entities.filter(
          (tournament) => tournament.id === action.meta.arg.id
        )[0]
      );
      state.entities = state.entities.map((tournament) =>
        tournament.id === action.meta.arg.id
          ? { ...tournament, name: action.meta.arg.name }
          : tournament
      );
    },
    [editTournament.rejected.type]: (
      state,
      action: PayloadAction<
        Tournament,
        string,
        { arg: { id: string; name: string } }
      >
    ) => {
      state.entities = state.entities.map((tournament) =>
        tournament.id === action.meta.arg.id
          ? state.pendingEditTournaments.filter(
              (tournament) => tournament.id === action.meta.arg.id
            )[0]
          : tournament
      );
      state.pendingEditTournaments = state.pendingEditTournaments.filter(
        (tournament) => tournament.id !== action.meta.arg.id
      );
    },
    [editTournament.fulfilled.type]: (
      state,
      action: PayloadAction<Tournament>
    ) => {
      state.pendingEditTournaments = state.pendingEditTournaments.filter(
        (tournament) => tournament.id !== action.payload.id
      );
    },
    [deleteTournament.pending.type]: (
      state,
      action: PayloadAction<Tournament, string, { arg: string }>
    ) => {
      state.pendingDeleteTournaments.push(
        state.entities.filter(
          (tournament) => tournament.id === action.meta.arg
        )[0]
      );
      state.entities = state.entities.filter(
        (tournament) => tournament.id !== action.meta.arg
      );
    },
    [deleteTournament.rejected.type]: (
      state,
      action: PayloadAction<Tournament, string, { arg: string }>
    ) => {
      state.entities.push(
        state.pendingDeleteTournaments.filter(
          (tournament) => tournament.id === action.meta.arg
        )[0]
      );
      state.pendingDeleteTournaments = state.pendingDeleteTournaments.filter(
        (tournament) => tournament.id !== action.meta.arg
      );
    },
    [deleteTournament.fulfilled.type]: (
      state,
      action: PayloadAction<Tournament, string, { arg: string }>
    ) => {
      state.pendingDeleteTournaments = state.pendingDeleteTournaments.filter(
        (tournament) => tournament.id !== action.meta.arg
      );
    },
  },
});

export default tournamentsSlice.reducer;

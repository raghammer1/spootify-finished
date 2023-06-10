import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  newReleases: [],
  playlists: [],
  categories: [],
};

const slice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    tokenSetter: (state, { payload: { to } }) => {
      state.token = to;
    },
    setPlaylists: (state, { payload }) => {
      state.playlists = payload.playlists;
    },
    setCategories: (state, { payload }) => {
      state.categories = payload.categories;
    },
    setNewReleases: (state, { payload }) => {
      state.newReleases = payload.newReleases;
    },
  },
});

export default slice.reducer;
export const { tokenSetter, setPlaylists, setCategories, setNewReleases } =
  slice.actions;

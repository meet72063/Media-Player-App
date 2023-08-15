import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const userplaylistSlice = createSlice({
  name: "playlists",
  initialState: {
    userPlaylists: [],
    favouritePlaylist: [],
    songTobeAdded: "",
  },
  reducers: {
    setUserPlaylists: (state, { payload }) => {
      state.userPlaylists = payload;
    },
    addToFavouritePlaylist: (state, { payload }) => {
      state.favouritePlaylist.push(payload);
    },
    removeFromFavouritePlaylist: (state, { payload }) => {
      state.favouritePlaylist = state.favouritePlaylist.filter(
        (item) => item._id !== payload._id
      );
    },
    setFavouritePlaylist: (state, { payload }) => {
      state.favouritePlaylist = payload;
    },
    setSongToBeAdded: (state, { payload }) => {
      state.songTobeAdded = payload;
    },
    updateUserPlaylist:(state,{payload})=>{
      const filteredplaylist = state.userPlaylists.filter((playlist)=>playlist._id!==payload._id)
      filteredplaylist.unshift(payload)
      state.userPlaylists = filteredplaylist
    }
  },
});

export const {
  setUserPlaylists,
  addToFavouritePlaylist,
  removeFromFavouritePlaylist,
  setFavouritePlaylist,
  setSongToBeAdded,
  updateUserPlaylist
} = userplaylistSlice.actions;
export default userplaylistSlice.reducer;

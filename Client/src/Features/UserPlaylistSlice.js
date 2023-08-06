import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'




const userplaylistSlice = createSlice({
    name:"playlists",
    initialState:{
      userPlaylists:[],
      favouritePlaylist:[]
    },
    reducers:{
        setUserPlaylists:(state,{payload})=>{
          state.userPlaylists=payload
          
        },
        addToFavouritePlaylist:(state,{payload})=>{
          state.favouritePlaylist.push(payload)
          console.log(state.favouritePlaylist)
        },
        removeFromFavouritePlaylist:(state,{payload})=>{
          state.favouritePlaylist = state.favouritePlaylist.filter((item)=>item._id!==payload._id)
          console.log(state.favouritePlaylist)

        },
        setFavouritePlaylist:(state,{payload})=>{
          console.log(payload)
          state.favouritePlaylist = payload
        }
    },
   
})

export const {setUserPlaylists,addToFavouritePlaylist,removeFromFavouritePlaylist, setFavouritePlaylist} = userplaylistSlice.actions
export default userplaylistSlice.reducer
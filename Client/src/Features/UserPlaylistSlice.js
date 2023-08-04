import { createSlice } from '@reduxjs/toolkit'



const userplaylistSlice = createSlice({
    name:"playlists",
    initialState:{
      userPlaylists:[]
    },
    reducers:{
        setUserPlaylists:(state,{payload})=>{
          state.userPlaylists=payload
        }
    }

})

export const {setUserPlaylists} = userplaylistSlice.actions
export default userplaylistSlice.reducer
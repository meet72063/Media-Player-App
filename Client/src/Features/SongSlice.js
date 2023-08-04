import { createSlice } from "@reduxjs/toolkit";



 const songSlice = createSlice({
    name:'songs',
    initialState:{
      playlist:[],
      createPlaylist:[],

     
    },
    reducers:{
      setPlayList:(state,{payload})=>{
        state.playlist = payload
      },
     addToCreatePlaylist:(state,{payload})=>{
        state.createPlaylist.push(payload)
     },
     removeFromCreatePlaylist:(state,{payload})=>{
      state.createPlaylist = state.createPlaylist.filter((song)=>song.url!==payload.url)
     },
     clearCreatePlaylist:(state)=>{
      state.createPlaylist=[]
     }
    }
    
})



export default songSlice.reducer

export const {setPlayList,addToCreatePlaylist,removeFromCreatePlaylist,clearCreatePlaylist} = songSlice.actions

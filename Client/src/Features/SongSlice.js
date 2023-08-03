import { createSlice } from "@reduxjs/toolkit";



 const songSlice = createSlice({
    name:'songs',
    initialState:{
      playlist:[],
     
    },
    reducers:{
      setPlayList:(state,{payload})=>{
        state.playlist = payload
      },
   
    }
    
})



export default songSlice.reducer

export const {setPlayList} = songSlice.actions

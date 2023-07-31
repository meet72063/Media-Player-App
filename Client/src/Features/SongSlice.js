import { createSlice } from "@reduxjs/toolkit";



 const songSlice = createSlice({
    name:'songs',
    initialState:{},
    reducers:{
      GetSongs:(state,{payload})=>{
   
        state=payload
        console.log(state)
     
      }
    }
    
})

export default songSlice.reducer
export const {GetSongs} = songSlice.actions



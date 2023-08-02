import { FlashlightOffRounded } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";



 const songSlice = createSlice({
    name:'songs',
    initialState:{
      packagelaylist:[],
      loop:FlashlightOffRounded
    },
    reducers:{
      setPlayList:(state,{payload})=>{
        state.playlist = payload
      }
    }
    
})

export default songSlice.reducer
export const {setPlayList} = songSlice.actions



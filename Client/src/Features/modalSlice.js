import { createSlice } from "@reduxjs/toolkit"

const modalSlice = createSlice({
    name:'modal',
    initialState:{
      openModal:true
    },
    reducers:{
      setState:(state,{payload})=>{
        console.log(payload)
        state.openModal = payload
      }
    }
  })

  export const {setState} = modalSlice.actions
export default modalSlice.reducer
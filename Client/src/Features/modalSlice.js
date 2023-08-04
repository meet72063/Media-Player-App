import { createSlice } from "@reduxjs/toolkit"

const modalSlice = createSlice({
    name:'modal',
    initialState:{
      openModal:false
    },
    reducers:{
      setOpenModal:(state,{payload})=>{
        state.openModal = payload
      }
    }
  })

  export const {setOpenModal} = modalSlice.actions
export default modalSlice.reducer
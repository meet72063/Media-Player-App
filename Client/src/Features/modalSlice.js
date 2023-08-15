import { createSlice } from "@reduxjs/toolkit"

const modalSlice = createSlice({
    name:'modal',
    initialState:{
      openLoginModal:false,
      openSideBar:false
      
    },
    reducers:{
      setLoginModal:(state,{payload})=>{
        state.openLoginModal = payload
      },
      setSideBar:(state,{payload})=>{
        state.openSideBar = payload
      }
    
    }
  })

  export const {setLoginModal,setSideBar} = modalSlice.actions
export default modalSlice.reducer
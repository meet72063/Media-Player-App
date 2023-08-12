import { createSlice } from "@reduxjs/toolkit"

const modalSlice = createSlice({
    name:'modal',
    initialState:{
      openLoginModal:false,
      
     
      

    },
    reducers:{
      setLoginModal:(state,{payload})=>{
        state.openLoginModal = payload
      }
    
    }
  })

  export const {setLoginModal} = modalSlice.actions
export default modalSlice.reducer
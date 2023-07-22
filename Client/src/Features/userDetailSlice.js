import {createSlice}  from '@reduxjs/toolkit'

const initialState = {}


const userDetailsSlice = createSlice({
    name:'userDetails',
    initialState,
    reducers:{
     storeUserDetails:(state,{payload})=>{
        state = payload
       
     }
    }
    
})

export default userDetailsSlice.reducer
export const {storeUserDetails} = userDetailsSlice.actions

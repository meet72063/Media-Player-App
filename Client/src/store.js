import {configureStore} from '@reduxjs/toolkit'
import userDetailsReducer from './Features/userDetailSlice'

export default configureStore({
    reducer:{
        userDetails:userDetailsReducer
    }
})
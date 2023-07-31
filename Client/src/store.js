import {configureStore} from '@reduxjs/toolkit'
import userDetailsReducer from './Features/userDetailSlice'
import songReducer from './Features/SongSlice'
import currentTrackReducer from './Features/CurrentTrack'
import artistReducer from './Features/artistSlice'




export default configureStore({
    reducer:{
        userDetails:userDetailsReducer,
        songs:songReducer,
        artists:artistReducer,
        currentTrack:currentTrackReducer
    }
})
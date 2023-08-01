import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userDetailsReducer from './Features/userDetailSlice'
import songReducer from './Features/SongSlice'
import currentTrackReducer from './Features/CurrentTrack'
import artistReducer from './Features/artistSlice'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import {persistReducer,persistStore} from 'redux-persist'
// import persistReducer from 'redux-persist/es/persistReducer'

const persistConfig = {
    key:'root',
    storage
    
}

const rootReducer = combineReducers({
        userDetails:userDetailsReducer,
        songs:songReducer,
        artists:artistReducer,
        currentTrack:currentTrackReducer
})

const persistedReducer = persistReducer(persistConfig,rootReducer)


export const store = configureStore({
    reducer:persistedReducer,
    middleware:[thunk]
})





export const persistor = persistStore(store)
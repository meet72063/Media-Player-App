import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentplaying:null,
    isPlaying:false,
    startPlay:false,
    isLoading:true,
    allSongs:{},
    error:false,
    songsLoading:true,
    allArtist:'',
    ArtistFetchError:false,
    artistLoading:true,
    nextSongsPlaylist:[],
    songs:[]
}


 const currentTrack = createSlice({
    name:'CurrentTrack',
    initialState,
    reducers:{
       setCurrentTrack:(state,{payload})=>{
          state.currentplaying = payload
       },
       setIsplaying:(state,{payload})=>{
         state.isPlaying=payload
       },
      startPlay:(state,{payload})=>{
          state.isPlaying = true
          state.startPlay=true
      },
      setIsLoading:(state,{payload})=>{
        state.isLoading = payload
      },
      GetAllSongs:(state,{payload})=>{
        state.allSongs=payload
      },
      setError:(state,{payload})=>{
        state.error=payload
      },
      setSongLoading:(state,{payload})=>{
        state.songsLoading=payload
      },
      GetAllArtists:(state,{payload})=>{
        state.allArtist=payload
      },
      setArtistFechError:(state,{payload})=>{
        state.ArtistFetchError=payload
      },
      setArtistLoading:(state,{payload})=>{
        state.artistLoading=payload
      },
      setartistSongs:(state,{payload})=>{
        state.songs.push(payload)
      },
      setNextSongsPlaylist:(state,{payload})=>{
        state.nextSongsPlaylist = payload
      }
    }
    
})

export const {setCurrentTrack,
  setIsplaying,
  startPlay,
  setIsLoading,
  GetAllSongs,
  setError,
  setSongLoading,
  GetAllArtists,
  setArtistFechError,
  setArtistLoading,
  setartistSongs,
  setNextSongsPlaylist,
    }  = currentTrack.actions
export default currentTrack.reducer



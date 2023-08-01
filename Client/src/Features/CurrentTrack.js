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
    songs:[],
    currentArtist:'',

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
      },
      setcurrentArtist:(state,{payload})=>{
        state.currentArtist = payload
      },
      //pushing songs at the end of the allsongs to play the artist palylist
      pushPlaylist:(state,{payload})=>{
       payload.forEach((item)=>state.nextSongsPlaylist.push(item))
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
  setcurrentArtist,
  pushPlaylist
    }  = currentTrack.actions
export default currentTrack.reducer



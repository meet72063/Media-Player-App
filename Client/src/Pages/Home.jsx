import React, { useEffect, useState } from 'react'
import MainContent from '../Components/Home/MainContent'

import { useDispatch, useSelector } from 'react-redux'
import { GetAllSongs,setError,setSongLoading,GetAllArtists,setArtistFechError,setArtistLoading, setIsplaying} from '../Features/CurrentTrack'

import { getAllSongs,getAllArtists,} from '../api/user'






const Home = () => {
 
  const dispatch = useDispatch()



  useEffect(() => {
   
    const gettingsongs = async () => {
      try {
        const { songs } = await getAllSongs()
        dispatch(GetAllSongs(songs))
        // dispatch(setNextSongsPlaylist(songs))
       dispatch( setSongLoading(false))
       dispatch(setError(false))

      } catch (error) {
        console.log(error)
        dispatch( setSongLoading(false))
        dispatch(setError(true))
      }

    }
    gettingsongs()
  }, [])

  useEffect(()=>{
    const getartists = async ()=>{
        try {
        const Artists = await getAllArtists()
        
        dispatch(GetAllArtists(Artists))
        dispatch(setArtistLoading(false))
        dispatch(setArtistFechError(false))
        } catch (error) {
            console.log(error)
        dispatch(setArtistLoading(false))
           dispatch( setArtistFechError(true))
        }
       

    }
    getartists()
},[])






  return (
    <div className= 'bg-black w-[1349.4px] mb-0  pt-3 h-[150vh] '>
           <MainContent/>
        </div>
   
  )
}

export default Home

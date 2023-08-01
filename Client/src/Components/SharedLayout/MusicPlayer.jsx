import React from 'react'
import { Outlet } from 'react-router-dom'
import AudioPlayer from '../MusicPlayer/AudioPlayer'
import { useSelector } from 'react-redux'
import NavBar from './NavBar'


const MusicPlayer = () => {
    const {startPlay}= useSelector((store)=>store.currentTrack)
    
   
    
  return (
    <div className='bg-black '>
      <div className='w-[1349.4px] pt-3'>
        <NavBar/>
      </div>
        <Outlet/>
         
             { startPlay? <AudioPlayer/>:''}
             
          </div>
   
  )
}

export default MusicPlayer

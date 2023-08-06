import React, {useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import AudioPlayer from '../MusicPlayer/AudioPlayer'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from './NavBar'
import Nav from './Nav'
import Modal from './Modal'





const MusicPlayer = () => {
    const {currentplaying}= useSelector((store)=>store.currentTrack)
    // const {favouritePlaylist} = useSelector(store=>store.playlists)
    const dispatch = useDispatch()
     
 
    
     const {openModal}= useSelector(store=>store.modal)
    
    
  return (
    <div className={` bg-[url('./music12.jpg')] bg-[] bg-cover bg-opacity-[0.5] bg-center -z-20`} >
     
     
      <div className='w-[1349.4px] pt-3 mb-20'>
        
        <Nav/>
       {openModal && <Modal/> }
       
      </div>
        <Outlet/>
        
             { currentplaying? <AudioPlayer/>:''}
             
          </div>
   
  )
}

export default MusicPlayer

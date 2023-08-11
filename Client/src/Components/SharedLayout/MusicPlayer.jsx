import React, {useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import AudioPlayer from '../MusicPlayer/AudioPlayer'
import { useDispatch, useSelector } from 'react-redux'
import Modal from './Modal'
import Header from '../Layout/Header'






const MusicPlayer = () => {
    const {currentplaying}= useSelector((store)=>store.currentTrack)
     
 
    
     const {openModal}= useSelector(store=>store.modal)
    
    
  return (
    <div className={` bg-[url('/img4.jpg')] bg-[rgba(0,0,0,0.2)]  bg-blend-multiply  bg-cover  bg-center  w-[100%] `} >
     
     
      <div >
      {openModal && <Modal/> }
        
        <Header/>
       
       
      </div>
        <Outlet/>
        
             { currentplaying? <AudioPlayer/>:''}
             
          </div>
   
  )
}

export default MusicPlayer

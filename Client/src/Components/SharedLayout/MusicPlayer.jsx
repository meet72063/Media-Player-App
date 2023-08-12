import React, {useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import AudioPlayer from '../MusicPlayer/AudioPlayer'
import { useDispatch, useSelector } from 'react-redux'
import LoginModal from '../../Modals/LoginModal'
import Header from '../Layout/Header'
import DeletePlaylistModal from '../../Modals/DeletePlaylistModal'






const MusicPlayer = () => {
    const {currentplaying}= useSelector((store)=>store.currentTrack)
     
 
    
     const {openLoginModal,openDeletePlaylistModal}= useSelector(store=>store.modal)
    
    
  return (
    <div className={` bg-[url('/img4.jpg')] bg-[rgba(0,0,0,0.2)]  bg-blend-multiply  bg-cover  bg-center  w-[100%] `} >
     
     
      <div >
      {openLoginModal && <LoginModal/> }
      {openDeletePlaylistModal &&<DeletePlaylistModal/>}
       
        
        <Header/>
       
       
      </div>
        <Outlet/>
        
             { currentplaying? <AudioPlayer/>:''}
             
          </div>
   
  )
}

export default MusicPlayer

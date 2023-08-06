import React, { useEffect, useRef, useCallback, useState } from 'react'
import { PlayCircleOutline, PauseCircle, SkipNext, SkipPrevious, SkipPreviousTwoTone, SkipNextTwoTone,LoopSharp } from '@mui/icons-material'
import { setIsplaying, setCurrentTrack} from '../../Features/CurrentTrack'
import {setPlayList} from '../../Features/SongSlice'
import { useDispatch, useSelector } from 'react-redux'
import Error from '../SharedComponents/Error'
import {faHeart} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {addToFavouritePlaylist,removeFromFavouritePlaylist} from '../../Features/UserPlaylistSlice'
import {setOpenModal} from '../../Features/modalSlice'
import {getData} from '../../localStorage'
import axios from 'axios'


const userDetails = getData()

const Control = ({ isPlaying, audioRef, setProgressValue, progressRef, duration, currentplaying,error,loop,setLoop}) => {
  const { allSongs} = useSelector((store) => store.currentTrack)
  const {playlist} = useSelector(store=>store.songs)
  const {favouritePlaylist} = useSelector(store=>store.playlists)
 const [favourite ,setFavourite] = useState(false)
 let index 
 
 
  const dispatch = useDispatch()
  const playAnimationRef = useRef()

useEffect(()=>{
  if(playlist.length===0){
    dispatch(setPlayList(allSongs))
  }
},[])


//to check wheather track is in favourite playlist or not 
useEffect(()=>{
   let arr = favouritePlaylist.filter((song)=>song._id===currentplaying._id)
   if(arr.length!==0){
    setFavourite(true)
   }else{
    setFavourite(false)
   }

},[currentplaying])


//upload favourite songs
useEffect(()=>{
  if(userDetails){
      const pushFavouriteSongs=async()=>{
        let token = localStorage.getItem("token")
      try {

        const res = await axios.patch(`http://localhost:5000/favouriteSongs`,favouritePlaylist,{headers:{
          'Authorization':`Bearer ${token}`
        }})
         
      } catch (error) {
          console.log(error)
      }
  }
  pushFavouriteSongs()
  }
  
},[favouritePlaylist])


 playlist?.some((song,i)=>{
  if(song.name===currentplaying.name){
    index =i
    return true 
  }
 })

 const loopHandler = ()=>{
  setLoop(!loop)
 }

 const favouriteHandler = ()=>{
  if(!userDetails){
    dispatch( setOpenModal(true))
    return
  }
  if(favourite){
    dispatch(removeFromFavouritePlaylist(currentplaying))
    setFavourite(false)
  }else{
    dispatch(addToFavouritePlaylist(currentplaying))
    setFavourite(true)
  }
 }


  const setPreviousSong = () => {
    if (index > 0) {
      const newIndex = index - 1
      dispatch(setCurrentTrack({ ...playlist[newIndex] }))
    } else {
      const newIndex = playlist.length - 1
      dispatch(setCurrentTrack({ ...playlist[newIndex]}))
    }

  }

  const setNextSong = () => {
    let maxIndex = playlist.length - 1
    if (index===maxIndex) {
      dispatch(setPlayList(allSongs))
      dispatch(setCurrentTrack({ ...playlist[0] }))

    }else if(index===undefined){
      dispatch(setCurrentTrack({ ...playlist[0] }))
      
    }
     else {
      const newIndex = index + 1
      dispatch(setCurrentTrack({ ...playlist[newIndex]}))
    }

  }



  const repeat = useCallback(() => {
    const currentTime = audioRef.current?.currentTime
    setProgressValue(currentTime)
    progressRef.current.value = currentTime

    playAnimationRef.current = requestAnimationFrame(repeat)

  }, [duration])


  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play()
      playAnimationRef.current = requestAnimationFrame(repeat)

    } else {
      audioRef.current.pause()
      cancelAnimationFrame(playAnimationRef.current)

    }

  }, [isPlaying, repeat])



  return (

    <div className='flex justify-center gap-x-4 '>
      <button onClick={setPreviousSong}>
        <SkipPrevious />
      </button>
      <button onClick={() => audioRef.current.currentTime -= 10}>
        <SkipPreviousTwoTone />
      </button>
      <button onClick={() => dispatch(setIsplaying(!isPlaying))} >
        {isPlaying ? <PauseCircle /> : <PlayCircleOutline />}
      </button>
      <button onClick={() => audioRef.current.currentTime += 10}>
        <SkipNextTwoTone />
      </button>
      <button onClick={setNextSong}>
        <SkipNext />
      </button>
      <button  onClick={loopHandler}>
      <LoopSharp className={`text-${loop?'green-700':'white'}`}/>
      </button>
      <button className='ml-1' onClick={favouriteHandler}>
        {favourite?<FontAwesomeIcon icon={faHeart} style={{color: "#e61414",}} />: 
        <FontAwesomeIcon icon={faHeart} />
      } 
        
      </button>

    {error&&<Error/>}

    </div>

  )
}

export default Control

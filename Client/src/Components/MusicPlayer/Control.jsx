import React, { useEffect, useRef, useCallback ,useState} from 'react'
import { PlayCircleOutline, PauseCircle, SkipNext, SkipPrevious, SkipPreviousTwoTone, SkipNextTwoTone,LoopSharp } from '@mui/icons-material'
import { setIsplaying, setCurrentTrack} from '../../Features/CurrentTrack'
import {setPlayList} from '../../Features/SongSlice'
import { useDispatch, useSelector } from 'react-redux'
import Error from '../SharedComponents/Error'




const Control = ({ isPlaying, audioRef, setProgressValue, progressRef, duration, currentplaying,error,loop,setLoop}) => {
  const { allSongs} = useSelector((store) => store.currentTrack)
  const {playlist} = useSelector(store=>store.songs)
 let index 
 
 
  const dispatch = useDispatch()
  const playAnimationRef = useRef()

useEffect(()=>{
  if(playlist.length===0){
    dispatch(setPlayList(allSongs))
  }
},[])



 playlist?.some((song,i)=>{
  if(song.name===currentplaying.name){
    index =i
    return true 
  }
 })

 const loopHandler = ()=>{
  setLoop(!loop)
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

    {error&&<Error/>}

    </div>

  )
}

export default Control

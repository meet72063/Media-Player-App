import React, { useEffect, useRef, useCallback ,useState} from 'react'
import { PlayCircleOutline, PauseCircle, SkipNext, SkipPrevious, SkipPreviousTwoTone, SkipNextTwoTone } from '@mui/icons-material'
import { setIsplaying, setCurrentTrack } from '../../Features/CurrentTrack'
import { useDispatch, useSelector } from 'react-redux'
import Error from '../SharedComponents/Error'




const Control = ({ isPlaying, audioRef, setProgressValue, progressRef, duration, currentplaying,error}) => {
  const { nextSongsPlaylist} = useSelector((store) => store.currentTrack)
 let index 
 nextSongsPlaylist.some((song,i)=>{
  if(song.name===currentplaying.name){
    index =i
    return true 
  }
 })

  

 
  const dispatch = useDispatch()
  const playAnimationRef = useRef()

 



  const setPreviousSong = () => {
    if (index > 0) {
      const newIndex = index - 1
      dispatch(setCurrentTrack({ ...nextSongsPlaylist[newIndex] }))
    } else {
      const newIndex = nextSongsPlaylist.length - 1
      dispatch(setCurrentTrack({ ...nextSongsPlaylist[newIndex]}))
    }

  }

  const setNextSong = () => {
    let maxIndex = nextSongsPlaylist.length - 1
    if (index === maxIndex) {
      dispatch(setCurrentTrack({ ...nextSongsPlaylist[0] }))

    } else {
      const newIndex = index + 1
      dispatch(setCurrentTrack({ ...nextSongsPlaylist[newIndex]}))
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
    {error&&<Error/>}

    </div>

  )
}

export default Control

import React, { useEffect, useState } from 'react'
import { PauseSharp, PlaceSharp, PlayArrow, PlayArrowSharp } from '@mui/icons-material'
import {useDispatch, useSelector} from "react-redux"
import { setIsplaying,setCurrentTrack,startPlay} from '../../Features/CurrentTrack'



const SongCard = ({name,url}) => {
  const {currentplaying,isPlaying} = useSelector(store=>store.currentTrack)
  const [playing,setPlaying] = useState(false)
  const dispatch = useDispatch()
  
  useEffect(()=>{
   if(currentplaying?.name!==name) setPlaying(false)
  },[currentplaying])
  
  useEffect(()=>{
   if (currentplaying?.name===name&&isPlaying){
      setPlaying(true)
   }
  },[currentplaying,isPlaying])
  
  const handlePlaying = ()=>{
    if(currentplaying?.name===name){
      
      setPlaying(!playing)
      dispatch(setIsplaying(!playing))
      return
    }
   
    dispatch(setCurrentTrack({url,name}))
    dispatch(startPlay(true))
    setPlaying(true)

  }
  
  return (
    <div>
       <div className='bg-red-300 h-14 w-[800px] rounded-md pl-5'>
        <div className='flex place-items-center justify-between pr-7 '>
            <div className='flex gap-28 pt-2 d'>
                <img src="/musicwheel.png" alt="" className=' h-10 w-10'/>
            <h2 className='text-2xl font-extralight text-black'>{name}</h2>
            </div>
            <div className=''>
              <button onClick={handlePlaying}>{playing?<PauseSharp/>:<PlayArrowSharp/>}</button>
                  
            </div>
        </div>
         
       </div>
    </div>
  )
}

export default SongCard
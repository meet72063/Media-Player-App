import React, { useEffect, useState } from 'react'
import { PauseSharp, PlaceSharp, PlayArrow, PlayArrowSharp } from '@mui/icons-material'
import {useDispatch, useSelector} from "react-redux"
import { setIsplaying,setCurrentTrack,} from '../../Features/CurrentTrack'
import { setPlayList,setNotShuffled } from '../../Features/SongSlice'




const SongCard = ({name,url,albums,_id,artist,img}) => {
 
  const {currentplaying,isPlaying} = useSelector(store=>store.currentTrack)
  const [playing,setPlaying] = useState(false)
  const dispatch = useDispatch()
  
  useEffect(()=>{
   if(currentplaying?.name!==name) setPlaying(false)
  },[currentplaying])
  
  useEffect(()=>{
   if (currentplaying?.name===name){
      setPlaying(isPlaying)
   }
  },[currentplaying,isPlaying])
  
  const handlePlaying = ()=>{
    if(currentplaying?.name===name){
      
      setPlaying(!playing)
      dispatch(setIsplaying(!playing))
      return
    }
   
    dispatch(setCurrentTrack({url,name,_id}))
    dispatch(setIsplaying(true))
    setPlaying(true)
    dispatch(setPlayList(albums))
    dispatch(setNotShuffled(albums))

  }
  
  return (
    <div>
       <div className='bg-red-300 h-14  sm:w-[80%] sm:mr-8 rounded-md pl-5  '>
        <div className='flex items-center justify-between '>
                <img src={img||"/musicwheel.png"} alt="Cover" className=' h-10 w-10  pt-1 rounded-lg pr-1'/>
                
                  <h1 className=' xs:text-sm xs:text-black   sm:text-2xl font-extralight mr-2 text-black'>{name}</h1>
               <h1 className='  text-rose-900 font-thin tracking-wider xs:text-sm sm:text-lg'>{artist}</h1>
                
         
            <div className='pr-4'>
              <button onClick={handlePlaying}>{playing?<PauseSharp/>:<PlayArrowSharp/>}</button>
                  
            </div>
        </div>
         
       </div>
    </div>
  )
}

export default SongCard

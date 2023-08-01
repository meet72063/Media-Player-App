import React, { useRef,useState} from 'react'
import DispalyTrack from './DispalyTrack'
import Control from './Control'
import {  useSelector } from 'react-redux'
import { MusicNoteOutlined } from '@mui/icons-material'






const AudioPlayer = () => {
const {currentplaying,isPlaying}  = useSelector((store)=>store.currentTrack)



const [progressValue,setProgressValue] = useState(0)
const [duration , setDuration] = useState(0)
// const [isMinimize,setIsminimize] = useState(false)


    const audioRef = useRef()
    const progressRef = useRef()
    
  
  return (
    <div className='  w-full bg-black flex flex-col align-text-bottom  sticky bottom-0  ' >
          <div className='pl-3 pr-3' >
    <div className='grid grid-cols-[50%_50%] pt-3 gap-x-5 pl-20 bg-slate-600 rounded-full'>
      <div className='pt-4'  >
        <DispalyTrack {...{audioRef,currentplaying,isPlaying,progressRef,progressValue,setProgressValue,duration,setDuration}}/>
      
      <Control {...{audioRef,currentplaying,isPlaying,progressRef,progressValue,setProgressValue,duration,setDuration}} />
       
      </div>
      <div className=' justify-evenly  flex text-3xl  max-w-[600px]'>
        <div className='flex'>
          <MusicNoteOutlined/>
          <h1 className='font-thin font-sans  '>{currentplaying?.name}</h1> 

        </div>
        
         
        
        <img src='/musicwheel.png' alt="isong" className={`w-[82px] pb-1 h-[82px] rounded-full ${isPlaying&&'animate-spin'} ` } />
         
      
      
      </div>
     
      
       
    </div>
    </div>
    </div>
  )
}

export default AudioPlayer

import React, { useRef,useState} from 'react'
import DispalyTrack from './DispalyTrack'
import Control from './Control'
import {  useSelector } from 'react-redux'
import { MusicNoteOutlined,LoopSharp } from '@mui/icons-material'






const AudioPlayer = () => {
const {currentplaying,isPlaying}  = useSelector((store)=>store.currentTrack)



const [progressValue,setProgressValue] = useState(0)
const [duration , setDuration] = useState(0)
const [loop,setLoop] = useState(false)


    const audioRef = useRef()
    const progressRef = useRef()
    
  
  return (
    <div className='  w-[100%] bg-black z-10  align-text-bottom  fixed bottom-0 border-t-[0.2px]  border-slate-600 ' >
          <div className='pl-3 pr-3' >
    <div className='grid grid-cols-[50%_50%] pt-3 gap-x-5 sm:pl-20 bg-transparent text-white '>
      <div className='pt-4'  >
        <DispalyTrack {...{audioRef,currentplaying,isPlaying,progressRef,progressValue,setProgressValue,duration,setDuration,loop}}/>
      
      <Control {...{audioRef,currentplaying,isPlaying,progressRef,progressValue,setProgressValue,duration,setDuration ,loop,setLoop}} />
       
      </div>
      <div className=' pl-2  xs:pl-6 xs:text-sm sm:justify-evenly  flex sm:text-3xl  max-w-[600px]'>
        
           <div className='flex'>
          <MusicNoteOutlined/>
          <h1 className='font-thin font-sans  '>{currentplaying?.name}</h1> 

        </div>
      

       
        
         
        
        <img src='/musicwheel.png' alt="musicIcon" className={` sm:w-[82px] pb-1 sm:h-[82px]  w-16 h-16  rounded-full  ` } />  
        {/* ${isPlaying&&'animate-spin'} */}
         
      
      
      </div>
     
      
       
    </div>
    </div>
    </div>
  )
}

export default AudioPlayer

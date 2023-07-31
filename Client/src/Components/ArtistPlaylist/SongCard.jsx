import React from 'react'
import { PauseSharp, PlaceSharp, PlayArrow, PlayArrowSharp } from '@mui/icons-material'

const SongCard = () => {
  return (
    <div>
       <div className='bg-red-300 h-14 w-[800px] rounded-md pl-5'>
        <div className='flex place-items-center justify-between pr-7 '>
            <div className='flex gap-28 pt-2 d'>
                <img src="/musicwheel.png" alt="" className=' h-10 w-10'/>
            <h2 className='text-2xl font-extralight text-black'>Let me put you Game</h2>
            </div>
            <div className=''>
                
            <PlayArrowSharp/> 
            <PauseSharp/>
                  
            </div>
        </div>
         
       </div>
    </div>
  )
}

export default SongCard

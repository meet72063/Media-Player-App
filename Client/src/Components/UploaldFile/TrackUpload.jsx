import React from 'react'
import { DeleteOutline } from '@mui/icons-material'


const TrackUpload = ({source,deleteFile}) => {
  return (
    <div className='bg-white text-center flex flex-col justify-center rounded-lg w-[500px] '>
       <audio src={source} controls></audio>
       <div className=' pr-5 flex justify-end'>
             <button className='  mt-4 space-x-1 ' onClick={() => deleteFile('song')}>
                <DeleteOutline />
                <span className='text-red-600 font-semibold '>Delete </span>
            </button>
        </div>
    </div>
  )
}

export default TrackUpload

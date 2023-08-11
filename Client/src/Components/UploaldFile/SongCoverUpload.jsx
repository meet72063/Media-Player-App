import { DeleteOutline } from '@mui/icons-material'
import React from 'react'

const SongCoverUpload = ({songCover,deleteFile}) => {
    console.log(songCover)
    return (
        <> <div className='relative'>
             <div className='flex justify-center  '>
                <img src={songCover} alt="songcover" className='w-[300px] rounded-lg h-[180px]' />

            </div>

             <button className=' absolute bottom-0 right-0 pr-3 flex justify-center mt-4 space-x-1 ' onClick={() => deleteFile('songCover')}>
                <DeleteOutline />
                <span className='text-red-600 font-semibold '>Delete </span>
            </button>
       
        </div>
           
           
        </>
    )
}

export default SongCoverUpload

import React from 'react'
import { Add } from '@mui/icons-material'
import {useNavigate} from 'react-router-dom'

const NewPlaylistCard = () => {
    const navigate = useNavigate()
    return (
        <div className='flex mb-16 pt-5 pl-5' >
            <div className='bg-zinc-900  border-black border-[0.3px] w-[200px] h-[270px] rounded-md p-2 cursor-pointer'>
                <div className='   bg-zinc-800  h-[20%] w-[30%] mt-20 ml-[60px] rounded-md'>
                    <button className=' pb-1  mt-3 ml-4  text-white font-bold' onClick={()=>navigate('/createPlaylist')}>
                        <Add />
                    </button>
                </div>
                <h2 className='  text-white font-thin s text-lg ml-8 mt-2'>Create a playlist</h2>


            </div>
        </div>
    )
}

export default NewPlaylistCard

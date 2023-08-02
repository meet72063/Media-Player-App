import React from 'react'
import SongsHorizontalList from '../Components/Home/SongsHorizontalList'

const AllSongs = () => {
  return (
    <div className='bg-black flex gap-3  pb-1  pl-3 pr-3 min-h-screen'>
        <div className=' bg-zinc-800 w-full pt-8'>

     <SongsHorizontalList/>
     </div>
    </div>
  )
}

export default AllSongs

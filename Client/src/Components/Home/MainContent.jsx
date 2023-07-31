import React from 'react'
import SongsHorizontalList from './SongsHorizontalList'
import ArtistsIconsList from './ArtistsIconsList'

const MainContent = () => {
  return (
    <div className='bg-black flex gap-3 h-[90%] pb-1  pl-3 pr-3'>
        <div className=' bg-zinc-800 w-full pt-3'>
            <SongsHorizontalList homepage={true}/>
           
            <ArtistsIconsList/>
 </div>
</div>
  )
}

export default MainContent

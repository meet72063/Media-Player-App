import React, { useEffect, useState } from 'react'
import SongCard from './SongCard'
import { useDispatch, useSelector } from 'react-redux'

import Error from '../SharedComponents/Error'
import {Link} from 'react-router-dom'
import Loading from '../SharedComponents/Loading'
// import ArtistsIconsList from './ArtistsIconsList'

const SongsHorizontalList = ({homepage}) => {
  
  const {allSongs,songsLoading,error} = useSelector((store)=>store.currentTrack)
 
  if(songsLoading ) {
    return <Loading/>
  }

  if (error) {
    return <Error error='something went wrong' />
  }

  const Songs = homepage?allSongs?.slice(0,6):allSongs
  
  
  return (
  
    <div className='pl-4 space-y-4'>
      <div className='flex justify-between mr-12 pr-3'>
      {homepage && <h1 className='text-3xl text-white font-thin'>New Releases</h1>}
 {homepage && <Link to = '/home/allSongs'> <h1 className='pt-3 text-xl text-red-500 font-sans ' >See more</h1></Link>}
      </div>
        <div className=' rounded-lg grid grid-cols-6 pt-1  '>
    
      {Songs?.map((song, index) => {
         

        return <SongCard key={index} {...song} index={index}  />
      })}
   </div>
</div>

  )
}

export default SongsHorizontalList

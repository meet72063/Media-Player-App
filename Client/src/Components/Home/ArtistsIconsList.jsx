import React, { useEffect, useState } from 'react'
import ArtistIcons from './ArtistIcons'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../SharedComponents/Loading'
import Error from '../SharedComponents/Error'


const ArtistsIconsList = () => {
    const  {allArtist,ArtistFetchError,artistLoading}  = useSelector((store)=>store.currentTrack)
   

if(artistLoading){
    return <Loading/>
}

if(ArtistFetchError){
    return <Error error='something went wrong' />
}
 
  return (
<div className='mt-20 ml-5 space-y-8'>
  <h1 className='text-3xl text-white font-thin'>Artists</h1>
<div className=' grid grid-cols-6 gap-1'>
    {allArtist?.map((artist,index)=>{
     
        return  <ArtistIcons key={index} {...artist}/>
    })}

  
</div>
</div>
  )
}

export default ArtistsIconsList

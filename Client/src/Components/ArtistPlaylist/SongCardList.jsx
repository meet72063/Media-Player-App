import React, { useEffect } from 'react'
import { pushPlaylist} from '../../Features/CurrentTrack'
import SongCard from './SongCard'
import { useDispatch } from 'react-redux'

const SongCardList = ({albums}) => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(pushPlaylist(albums))
  },[])
 
  return (
    <div className='pt-3 space-y-3 ml-1 pb-40'>
        {albums.map((track,index)=>{
          return <SongCard key={index} {...track}/>
        })}



    </div>
  )
}

export default SongCardList

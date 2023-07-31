import React from 'react'
import SongCard from './SongCard'

const SongCardList = ({albums}) => {
  return (
    <div className='pt-3 space-y-3 ml-1 pb-40'>
        {albums.map((track,index)=>{
          return <SongCard key={index} />
        })}



    </div>
  )
}

export default SongCardList

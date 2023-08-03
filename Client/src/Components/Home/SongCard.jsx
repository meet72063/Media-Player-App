import React from 'react'
import {setCurrentTrack,setIsplaying,} from '../../Features/CurrentTrack'
import {useDispatch} from 'react-redux'


const SongCard = ({url,artist,name,img,index,_id}) => {
  

  const dispatch = useDispatch()
  const currentTrackHandler = ()=>{
      dispatch(setCurrentTrack({url,artist,img,name,index,_id}))
      dispatch(setIsplaying(true))
  }
  return (
    <>
    <div className='flex mb-16 ' >
         <div className='bg-black border-[0.001px] border-slate-500  w-[160px] h-[240px] rounded-md p-2 cursor-pointer'onClick={currentTrackHandler}>
         <img src={img} alt="cover pic" className='w-[140px] h-[140px]  rounded-lg mb-2' />
         <h2 className='text-lg font-thin  mb-1 text-white '>{name} </h2>
         <h2 className='text-gray-500 text-sm'>{artist}</h2>
          </div>
     </div>
    
    </>
   
  )
}

export default SongCard

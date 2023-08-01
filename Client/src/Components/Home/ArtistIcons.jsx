import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'





const ArtistIcons = ({img,name,_id}) => {
  const navigate = useNavigate()
  return (
    <div className='space-y-2 text-red-400  text-lg font-semibold' onClick={()=>navigate(`artist/${_id}`)}>
           <img src={img} className='w-[150px] h-[150px] rounded-[100px]'  alt='img'/>
           <h1 className='pl-8 font-light ml-5'>{name}</h1>
    </div>

  )
}




export default ArtistIcons





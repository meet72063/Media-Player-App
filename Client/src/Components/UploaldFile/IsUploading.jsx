import React from 'react'
import { useSelector } from 'react-redux'

const IsUploading = ({progress}) => {
const artist = useSelector((store)=>store.artists)


  return (
    <div className='bg-white font-semibold  text-lg text-center flex flex-col justify-center w-[500px] rounded-lg' >
         Uploading... {Math.floor(progress)}% Done
    </div>
  )
}

export default IsUploading

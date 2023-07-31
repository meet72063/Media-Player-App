import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MusicNoteSharp } from '@mui/icons-material'
import {getData} from '../../localStorage'

const NavBar = () => {
  const userDetails = getData()
  const navigate = useNavigate()
const logInOutHandler=()=>{
 if(userDetails){
   localStorage.removeItem("token")
   localStorage.removeItem("userDetails")
 }
 navigate('/signUp')

}
  return (
    <div className='h-[5rem] bg-gray-300 pl-3 place-content-center pr-3 grid  grid-cols-3 text-zinc-700 font-bold  ml-4 mr-2  rounded-sm text-center mb-4 border-black  justify-between  '>
        <div className='flex space-x text-3xl  '>
       <img src="/Spotify.png" alt="logo"  className='w-[50px] h-[50px]'/> 

        <span> <MusicNoteSharp/></span>   <h1 className='pt-2'> Musica</h1> 
        </div>
        <div className='space-x-4 '>
      <input type="text" className='text-xl font-thin pl-3 p-1 rounded-lg ' placeholder='search any song'/>
      <button className='bg-zinc-700 pl-2 pr-2 pb-1 text-xl text-white rounded-lg'>Search</button>
       </div>

       <div className='flex justify-end space-x-2 place'>
        
     {userDetails&& <Link to='/profile'> <img src="/profile-circle.svg" alt="" className='w-[50px] h-[50px]' /></Link>}
        <button onClick={logInOutHandler} className=' rounded-lg text-white text-base p-1 mt-2 bg-zinc-700 '>{userDetails?'Log out':'Log In'}</button>
       </div>
    </div>
  )
}

export default NavBar

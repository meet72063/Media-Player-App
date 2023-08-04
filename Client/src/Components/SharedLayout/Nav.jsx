import React from 'react'
import { MusicNoteSharp } from '@mui/icons-material'
import { TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import {getData} from '../../localStorage'
import { setOpenModal } from '../../Features/modalSlice'
import { useDispatch } from 'react-redux'


const Nav = () => {
    const userDetails = getData()
    const navigate = useNavigate()
    const dispatch = useDispatch()
  const logInOutHandler=()=>{
   if(userDetails){
     localStorage.removeItem("token")
     localStorage.removeItem("userDetails")
   }
   navigate('/signUp')
  
  }
 const handlePlaylistPage = ()=>{
  if(!userDetails){
    dispatch( setOpenModal(true))
  }
  else{
    navigate('/playlists')
  }
 }

  return (
    <div className='bg-black  fixed top-0 h-[14%] pt-2 w-full  flex text-slate-400 pl-2 pr-2'>
          <img src="/Spotify.png" alt="logo"  className='w-[50px] h-[50px] mt-1 ml-2'/> 

<span className='ml-1'> <MusicNoteSharp/></span>   <h1 className='pt-2 inline-block text-3xl ml-1'> Musica</h1> 
   <div className='flex pt-5 space-x-5 ml-16 mr-5'>
      <Link to='/' >Home</Link>
      <Link to='/artists'  >Artists</Link>
      <Link to='/allsongs'>Songs</Link>      
   </div>
<div className='ml-32 pt-2 flex '>
<TextField id="standard-basic" placeholder="search songs" variant="standard"  sx={{ input: { color: 'white'} }} focused />
<div className='ml-32 mt-3'>
   <button  onClick={handlePlaylistPage}  className='cursor-pointer'>Playlists</button> 
</div>
 <div className={`${userDetails?"fixed right-5 top-0":"fixed right-6 top-8 "}`}>
    {userDetails&& <Link to='/profile' > <img src="/profile-circle.svg" alt="" className='w-[50px] h-[50px]' /></Link>}
  <button onClick={logInOutHandler} className=' rounded-lg text-white text-base  bg-transparent '>{userDetails?'Log out':'Log In'}</button>

 </div>
   


</div>

  

    </div>
  )
}

export default Nav


import React, { useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {getData} from "../../localStorage"
import { setOpenModal } from '../../Features/modalSlice'
import {setFavouritePlaylist} from '../../Features/UserPlaylistSlice'







const NavLinks = () => {
  let userDetails = getData()
  const dispatch = useDispatch()
  const navigate = useNavigate()
   
  const logInOutHandler=()=>{
    if(userDetails){
      localStorage.removeItem("token")
      localStorage.removeItem("userDetails")
      localStorage.removeItem("persist:root")
      dispatch(setFavouritePlaylist([]))
 }
    navigate('/signUp')
   
   }

   const navigation = (e)=>{
    if(!userDetails){
      e.preventDefault()
      dispatch(setOpenModal(true))

    }
   }


   const  style =({ isActive ,isPanding}) =>
      isPanding?"text-blue-300" :isActive ? "text-red-400 ease-in-out transition-all" : ""

  return (
    <div className='md:flex md:flex-row cursor-pointer  transition-all text-black ease-in-out md:justify-around md:items-center flex flex-col items-center justify-around   md:text-white h-full w-full   '>
       <NavLink to='/'  className={style} >Home</NavLink>
       <NavLink to='/allsongs'className={style}>Library</NavLink>
       <NavLink to='/artists'className={style}>Artists</NavLink>
       <NavLink onClick={navigation} to='playlists'className={style}>Playlists</NavLink>
       <NavLink onClick={navigation} to='favourites' className={style}>Favourites</NavLink>
       <div>
        {userDetails? <div className='pb-3 text-base font-thin '>
            <Link to="/profile"> <img src="/profile-circle.svg" alt="profile pic" width='50px'  /></Link>
         <button onClick={logInOutHandler}>logout</button>
          </div>:<button onClick={logInOutHandler} className='pr-3 pl-5 pt-2 pb-2 border-red-800 border-[0.1px] rounded-lg'>login</button>}
        </div>

    </div>
  )
}

export default NavLinks

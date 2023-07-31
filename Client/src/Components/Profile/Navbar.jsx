import React from 'react'
import { useState } from 'react';
import { NavLink, useNavigate} from 'react-router-dom'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';



const Navbar = () => {
  const [dropDown , setDropDown] = useState(false)
  const navigate = useNavigate()
  
  const logOut =()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('userDetails')
    navigate('/')
  }
  
  return (
    <nav className='flex bg-black text-white w-screen h-20 justify-between pl-16 '>
      <div className='flex '>
        <div className="flex space-x-2  items-center ">
          <NavLink to='/home'>
            <img src="./Spotify.png" alt="spotify icon" className="w-9 " />
          </NavLink>
          <span className=" font-semibold text-2xl pr-3">Spotify</span>
         </div>
       </div>
       <div className='flex mr-3' >
          <div className='flex text-1xl font-semibold  mt-6 space-x-8 mr-20'>
            <h1>Premium</h1>
            <h1>Support</h1>
            <h1>Download</h1>
            <span>|</span>
            <div className='text-white flex space-x-3 justify-center'>
             <AccountCircleOutlinedIcon/>
             
             <span className='mr-10'>Profile</span>
             <div className='flex flex-col align-middle ml-9'>
             <KeyboardArrowDownSharpIcon onClick={()=>setDropDown(!dropDown)}/>

              
              {dropDown? <div className='bg-black text-white ml-6 cursor-pointer  pr-2 pl-2 rounded-sm' onClick={logOut} >
                  <h1  >log Out</h1>
              </div>:''}
              
             </div>
             
             </div>
           
            </div>
           
           

          </div>
         
     
    </nav>
  )
}

export default Navbar

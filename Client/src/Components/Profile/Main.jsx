import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import Card from './Card'
import Details from './Details'
import EditProfile from './EditProfile'




const Main = () => {
  const [editProfile,setEditProfile] = useState(false)
  const { userDetails } = useSelector((store) => store)
  // console.log(userDetails)   {}  why?




  return (
    <div className='bg-slate-800  w-screen h-full  '>
      <div className='bg-white mr-20 ml-16  w-[90vw]  grid grid-cols-1  '>
        <div className='flex space-x-20'>
          <Sidebar />

          <div className='flex flex-col  mt-5 mb-20 w-[60vw] pr-10 '>

           {editProfile?<EditProfile setEditProfile={setEditProfile}/>:<Details setEditProfile={setEditProfile} />}
            <div>
              <Card />
            </div>
          </div>

        </div>




      </div>
    </div>
  )
}

export default Main

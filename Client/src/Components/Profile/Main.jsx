import React from 'react'
import Sidebar from './Sidebar'
import {useSelector} from 'react-redux'
import {getData} from '../../localStorage'




const Main = () => {
  const {userDetails}= useSelector((store)=>store)
  // console.log(userDetails)   {}  why?
  
//getting data from localStorage 
const data= getData()


  return (
    <div className='bg-slate-800  w-screen  '>
      <div className='bg-white mr-20 ml-20 w-[88vw] h-[590px] grid grid-cols-1'>
        <div className='flex'>
          <Sidebar/>

          <div className='flex flex-col ml-16 mt-5 mb-20'>
            <h1 className='font-semibold text-6xl'>Account overview</h1>
            <h2 className='mt-10 text-2xl font-semibold'>Profile</h2>
            <div className=' mt-10 space-y-10 font-semibold text-gray-500'>
              <div className='flex justify-between border-b-[0.3px] pb-3 '>
                <h1>UserName</h1>
                <h1 className='text-gray-700' >{data?.name||'abcd'}</h1>

              </div>

              <div className='flex justify-between border-b-[0.3px] pb-2'>
                <h1>Email</h1>
                <h1 className='text-gray-700' >{data?.email||'abcd@gmail.com'}</h1>

              </div>

              <div className='flex justify-between border-b-[0.3px] pb-2'>
                <h1>Date of birth</h1>
                <h1 className='text-gray-700' >{data?`${data?.date}-${data?.month}-${data?.year}`:'DD/MM/YYYY'}</h1>

              </div>
              <div className='flex justify-between border-b-[0.3px] pb-2'>
                <h1>Country or origion</h1>
                <h1 className='text-gray-700'>India</h1>
              </div>
             
            </div>

            <div>
            <button className="  mt-6 rounded-full bg-transparent px-12 py-3 text-base font-bold text-black transition duration-200  border-[1px] border-black hover:bg-gray hover:shadow-lg  " 
          type="submit" >
          Edit profile
        </button>
            </div>
          </div>
         
        </div>



      </div>
    </div>
  )
}

export default Main

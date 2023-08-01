import React, { useState } from 'react'
import Form from '../Components/AlmostDone/Form'
import {NavLink} from 'react-router-dom'

const AlmostDone = () => {
  return (
    <div>
      <main>
        <div className='flex-col '>
        <div className="bg-white pt-[32px] pb-[28px] pl-[51px] pr-[0px] text-black flex flex-col align-center ">
        <div className="flex space-x-2 justify-center pr-6 ">
          <NavLink to='/home'>
            <img src="./spotify2.png" alt="spotify icon" className="w-9"/>
          </NavLink>
          <span className=" font-semibold text-2xl">Musica</span>
        </div>
        <div className='mt-[48px] flex justify-center'>
          <h2 className=' text-[40px] font-bold'>Almost Done</h2>
        </div>
        
       
      </div>
      
        
          <div className='flex justify-center'>
            <Form />
           
          </div>
          
                
           
      
        </div>
      </main>
    </div>
  )
}

export default AlmostDone

import React from 'react'
import {} from '../../Features/modalSlice'
import { useDispatch } from 'react-redux'
import {setOpenModal} from '../../Features/modalSlice'
import { useNavigate } from 'react-router-dom'

const Modal = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogin = () =>{
     navigate('/login')
     dispatch(setOpenModal(false))
    }
  return (
    <div className=' w-[100%] h-[100%] fixed  bg-[rgba(0,0,0,0.7)] shadow-lg' onClick={()=>dispatch(setOpenModal(false))} >
      <div className=' bg-slate-100 border-[0.3px] border-slate-400 w-[490px] p-1 h-[180px]  text-black z-10 fixed left-[32%]  top-[25%] rounded-md ' onClick={(e)=>e.stopPropagation()}>
      <button onClick={()=>dispatch(setOpenModal(false))} className='relative left-[94%] text-xl font-semibold hover:text-[23px]'>x</button>
         <div className= ' p-2 absolute top-3 left-[3%] '>
           <div className='space-y-3'>
             <h1 className='text-2xl font-bold '>Not Logged In </h1>
                <h2>please login to save songs to playlist</h2>
           </div>
         </div>
         <div className='space-x-3  absolute right-1 bottom-3  '>
                    <button className='bg-white w-24 h-8 rounded-lg font-semibold hover:bg-slate-200 active:bg-slate-300 ' onClick={()=>dispatch(setOpenModal(false))}  >Cancel</button>
                    <button className='bg-[rgba(200,0,0,0.7)] w-24 text-white font-semibld h-8 rounded-lg hover:bg-[rgba(200,0,0,0.6)]'onClick={handleLogin} >Login </button>
                </div>
      </div>
    </div>
  )
}

export default Modal

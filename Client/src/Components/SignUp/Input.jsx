// import {
//     Card,
//     Input,
//     Button,
//     Typography,
  
//   } from '@material-tailwind/react'
import { useState } from "react";
import {NavLink ,useNavigate}   from 'react-router-dom'
import axios from 'axios'
import Error from "../SharedComponents/Error";


 

 

  export default function InputField() {
    const [userDetails,setUserDetails] = useState({name:'',email:'',password:''})
    const [error,setError] = useState(null)
    
    const navigate = useNavigate()
    
    const onChangeHandler = (e)=>{
      setError(null)
      setUserDetails({...userDetails,[e.target.name]:e.target.value})


    }

    const handleSubmit= async(e)=>{
        e.preventDefault()
      try {
        const response = await axios.post('http://localhost:5000/signUp',userDetails)
         localStorage.setItem("token",response.data.token)
         
         navigate('/almostDone')
      } catch (error) {
        setError(error.response?.data?.messege||error.response?.data?.error||'something went wrong')
         
      }
    }

    

    return (

      <div color="transparent"  className="text-white">
        <h2  color="blue-gray">
          Sign Up
        </h2>
        <h2 color="gray" className="mt-1 text-gray-400 font-normal">
          Enter your details to register.
          {error?<Error error={error} />:''}
           
        </h2>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 ">
          <div className="mb-4 flex flex-col gap-3 align-middle text-black font-semibold">
            <div className="flex flex-col">
               <label htmlFor="name" className="text-white">Name</label>
            <input  id="name" className="pl-2 w-56 font-extrabold tracking-widest rounded-sm"  value={userDetails.name}  color="white"  onChange={onChangeHandler} name='name' />
            </div>
           
           <div  className="flex flex-col">
             <label htmlFor="email" className="text-white">Email</label>
            <input  id="email" className="pl-2 w-56 font-extrabold tracking-widest rounded-sm"   value={userDetails.email} color="white" onChange={onChangeHandler} name="email"/>
           </div>
           
           <div className="flex flex-col">
            <label htmlFor="password" className="text-white">Password</label>
            <input id="password" className="pl-2 w-56 font-extrabold tracking-widest rounded-sm" type="password"   name="password" color="white" value={userDetails.password} onChange={onChangeHandler}/>
           </div>
            
          </div>
          <button className="mt-6  text-blue-500 transition-colors hover:text-blue-700" type="submit"  onClick={handleSubmit} > 
            Register
          </button>
          <div className="mt-6">
            <hr/>
             <h2 color="gray" className="mt-4 text-white  text-center font-normal">
            Already have an account?{" "}
            <NavLink
              to='/login'
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign In
            </NavLink>
          </h2>
          </div>
         
        </form>
      </div>
    );
  }
import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
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
        const response = await axios.post('http://localhost:5000/signup',userDetails)
         localStorage.setItem("token",response.data.token)
         
         navigate('/almostDone')
      } catch (error) {
        setError(error.response.data.messege||error.response.data.error)
         
      }
    }

    

    return (

      <Card color="transparent" shadow={false} className="text-white">
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 text-gray-400 font-normal">
          Enter your details to register.
          {error?<Error error={error} />:''}
           
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 ">
          <div className="mb-4 flex flex-col gap-6 text-white font-semibold">
            <Input  className="pl-1 font-extrabold tracking-widest rounded-sm"  label="Name" value={userDetails.name}  color="white"  onChange={onChangeHandler} name='name' />
            <Input  className="pl-1 font-extrabold tracking-widest rounded-sm"  label="Email" value={userDetails.email} color="white" onChange={onChangeHandler} name="email"/>
            <Input className="pl-1 font-extrabold tracking-widest rounded-sm" type="password"  label="Password" name="password" color="white" value={userDetails.password} onChange={onChangeHandler}/>
          </div>
          <Button className="mt-6  text-blue-500 transition-colors hover:text-blue-700" type="submit" fullWidth onClick={handleSubmit} > 
            Register
          </Button>
          <div className="mt-6">
            <hr/>
             <Typography color="gray" className="mt-4 text-white  text-center font-normal">
            Already have an account?{" "}
            <NavLink
              to='/login'
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign In
            </NavLink>
          </Typography>
          </div>
         
        </form>
      </Card>
    );
  }
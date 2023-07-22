import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
import { useState } from "react";
import axios from 'axios'
import Error from "../SharedComponents/Error";
import {useNavigate,NavLink} from 'react-router-dom'
import {saveData} from '../../localStorage'
 
   
  export default function InputLogin() {
    const [userDetails,setUserDetails] = useState({email:'',password:''})
    const [error,setError] = useState(null)
   const navigate = useNavigate()
  
    const handleChange =(e)=>{
      setError(null)
      setUserDetails({...userDetails,[e.target.name]:e.target.value})
    }
  
    const handleSubmit =async(e)=>{
    e.preventDefault()
   
    try {
      const  response = await axios.post('http://localhost:5000/login',userDetails)
      
      localStorage.setItem("token",response.data.token)
      saveData(response.data.data)
      
      navigate('/')
      
    } catch (error) {
      setError(error.response.data.error||error.response.data)
    }
    }
    

    return (
      <Card color="transparent" className="text-white" shadow={false} >
        <Typography variant="h4" color="blue-gray">
          Sign in
        </Typography>
        {error?<Error error={error} />:''}
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6 text-white">
            <Input className="pl-1 font-extrabold tracking-widest rounded-sm" color="white"  label="Email" name="email" value={userDetails.email} onChange={handleChange} />
            <Input className="pl-1 font-extrabold tracking-widest rounded-sm" color="white" type="password"  label="Password" name="password" value={userDetails.password} onChange={handleChange}/>
          </div>
          <Button className="mt-6  text-blue-500 transition-colors hover:text-blue-700" fullWidth type="submit" onClick={handleSubmit}>
            Sign in
          </Button>
          <div className="mt-14">
            <hr/>
          <Typography color="gray" className="mt-4 text-center font-normal text-white">
          Don't have an account?{" "}
            <NavLink
              to='/signup'
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign Up
            </NavLink>
          </Typography>
          </div>
        
          
        </form>
      </Card>
    );
  }
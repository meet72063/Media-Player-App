import {
  Card,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import {storeUserDetails} from '../../Features/userDetailSlice'
import { useState } from "react";
import {useNavigate,NavLink} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import Error from '../SharedComponents/Error'
import {saveData} from '../../localStorage'

export default function Form() {
  const [additonalDetails, setAdditionalDetails] = useState({ nickname: '',  month: '', year: '', gender: '' })
  const [error,setError] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const dateChangehandler = (e) => {
    setError(null)
    let value = e.target.value
    let dateArray = value.split('-')
    
    setAdditionalDetails({ ...additonalDetails, date: dateArray[2], month: dateArray[1], year: dateArray[0] })

  }

  const genderHandler = (e) => {
    setError(null)
    setAdditionalDetails({ ...additonalDetails, gender: e.target.id })
  }

  const handleSubmit =async (e)=>{
    e.preventDefault()
    
  try {
    const token = localStorage.getItem("token")
    
    const res = await axios.patch('http://localhost:5000/update', additonalDetails, {
  headers: {
    'content-type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  
});

   dispatch(storeUserDetails(res.data.data))
   
   saveData(res.data.data)
   navigate('/profile')
  } catch (error) {
      setError(error.response.data||error.response.message)
  }
    
  }



  return (
    <Card color="transparent" shadow={false}>
    {error? <Error error={error} />:''}

      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <Typography color="gray" className="mb-2  font-bold">
          What should we call you?
        </Typography>
        <div className="mb-2 flex flex-col">
          <input className="ml-2 px-4 mt-1 py-2 border rounded" type="text" placeholder="Name" value={additonalDetails.nickname} onChange={(e) => {
            setAdditionalDetails({ ...additonalDetails, nickname: e.target.value })
            setError(null)
          }} />
          <label className="pl-7 text-sm p-1">This appears on your profile</label>
        </div>
        <div className="mt-5">
          <Typography color="gray" className="mb-2  font-bold">
            What's your date of birth?
          </Typography>
          <div className="flex space-x-2 ">
            <div>

              <div className="relative max-w-lg">
                <input   type="date" className="w-60 bg-gray-50 border border-gray-300 text-base  rounded-lg focus:ring-blue-500 focus:border-blue-500 block  pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" onChange={dateChangehandler} />
              </div>


              {/* gender Radio Buttons */}

              <div className="mt-6">

                <Typography color="gray" className="mb-2  font-bold">
                  What's is your gender?
                </Typography>
                <div className="flex space-x-3">


                  <label htmlFor="Male">Male</label>
                  <input type="radio" id="Male" name="gender" onChange={genderHandler} />
                  <label htmlFor="Female">Female</label>
                  <input type="radio" id="Female" name="gender" onChange={genderHandler} />
                  <label htmlFor="Non-binary">Non-binary</label>
                  <input type="radio" id="Non-binary" name="gender" onChange={genderHandler} />
                  <label htmlFor="Other">Other</label>
                  <input type="radio" id="Other" name="gender" onChange={genderHandler} />
                </div>
                <div className="mt-4">
                  <input type="radio" id="" name="gender" onChange={genderHandler} checked={!(additonalDetails.gender)} />
                  <span className="pl-2">Prefer not to say</span>

                </div>
              </div>


            </div>

          </div>
        </div>

        <div className="mt-5 flex justify-center space-x-6"> 
          <button className="rounded-full bg-green-500 px-12 py-3 text-base font-bold text-black transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200 hover:px-11 " 
          type="submit" onClick={handleSubmit}>
          Sign Up
        </button>
        <Typography color="gray" className="mt-2 text-center font-normal">
            <NavLink
              to='/home'
              className="font-medium ml-4 text-lg text-blue-500 transition-colors hover:text-orange-300 "
            >
              skip for now 
            </NavLink>
          </Typography>
        </div>
      </form>
    </Card>
  );
}
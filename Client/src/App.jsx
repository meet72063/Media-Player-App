import { NavLink, Route, Router, Routes } from "react-router-dom"
import Login from "./Pages/Login"
import SignUp from "./Pages/SignUp"
import AlmostDone from "./Pages/AlmostDone"
import Home from "./Pages/Home"
import Start from "./Pages/Start"
import Profile from "./Pages/Profile"




function App() {

  return (
    <>
   <Routes>
    <Route path="/" element={<h1>Landing Page</h1>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/signup" element={<SignUp/>} />
    <Route path="/almostDone" element={<AlmostDone/>} />
    <Route path="/start" element={<Start/>} />
    <Route path = "/profile" element={<Profile/>} />

    

    <Route path="/home" element={<Home/>}/>

    



   </Routes>
      
    </>
  )
}

export default App

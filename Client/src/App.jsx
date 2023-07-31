import { NavLink, Route, Router, Routes } from "react-router-dom"
import Login from "./Pages/Login"
import SignUp from "./Pages/SignUp"
import AlmostDone from "./Pages/AlmostDone"
import Home from "./Pages/Home"
import Start from "./Pages/Start"
import Profile from "./Pages/Profile"
import MusicPlayer from "./Components/SharedLayout/MusicPlayer"
import AdminPage from "./Pages/AdminPage"
import AllSongs from "./Pages/AllSongs"
import ArtistPlayList from "./Pages/ArtistPlaylist"




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
    <Route path='/home' element={<MusicPlayer/>}>
       <Route index element={<Home/>}/>
    <Route path='uploadSong' element = {<AdminPage/>}/>  
    <Route path='allSongs' element = {<AllSongs/>}/> 
    </Route>
    <Route path='artist/:id' element={<ArtistPlayList/>} />

   

    



   </Routes>
      
    </>
  )
}

export default App

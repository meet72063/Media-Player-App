import { LensTwoTone } from "@mui/icons-material"
import axios from "axios"
const baseUrl = 'http://localhost:5000'
const token = localStorage.getItem("token")



 export const getAllSongs = async()=>{
    
    const res = await axios.get(`${baseUrl}/getAllSongs`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
        
      })
    return res.data
   
}

export const getAllArtists = async()=>{
  let token = localStorage.getItem("token")
  const res = await axios.get(`${baseUrl}/getAllArtists`,{
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return res.data.artists
}


//create new playlist

export const createNewPlaylist = async (data)=>{
  console.log(token)
  const res = await axios.post(`${baseUrl}/newplaylist`,data,{headers:{
    'Authorization': `Bearer ${token}`
  }})
  return res.data
}


// Get Allplaylist

export const getAllPlaylist = async(data)=>{
  console.log(token)
 const res = await axios.get(`${baseUrl}/getallplaylists`,{
  headers:{
    'Authorization':`Bearer ${token}`
  }
 })
 return res.data.playlists
}

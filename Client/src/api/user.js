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
  const res = await axios.get(`${baseUrl}/getAllArtists`,{
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return res.data.artists
}

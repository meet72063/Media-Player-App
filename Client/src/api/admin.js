import axios from 'axios'




const baseUrl = 'http://localhost:5000/admin'
const token = localStorage.getItem("token")


export const saveSong =async (data)=>{

   
    const res = await axios.post(`${baseUrl}/songs/addSong`, data, {
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
        
      })
      return res.data

    }

export const saveArtistPlaylist = async(data)=>{
  console.log(data)
  console.log(token)
  const res = await axios.post(`${baseUrl}/artist`,data,{
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    
  })
return res

}

export const addingSongs = async(data)=>{
 

  const res = await axios.patch(`${baseUrl}/addingSongs/64c67176eae1c866d207bca6`,data,{
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    
  })
return res

}
import React, { useEffect, useState } from 'react'
import NewPlaylistCard from '../Components/Playlist/NewPlaylistCard'
import PlaylistCard from '../Components/Playlist/PlaylistCard'
import Error from '../Components/SharedComponents/Error'
import Loading from '../Components/SharedComponents/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { setUserPlaylists } from '../Features/UserPlaylistSlice'
import { HeadsetRounded } from '@mui/icons-material'
import axios from 'axios'



const Playlists = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [allPlaylists, setAllPlaylists] = useState([])

  const dispatch = useDispatch()




  useEffect(() => {
    let token = localStorage.getItem("token")
    const gettingPlaylists = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/getallplaylists`,{
          headers:{
            'Authorization':`Bearer ${token}`
          }
         })
        setAllPlaylists(res.data.playlists)
        dispatch(setUserPlaylists(res.data.playlists))
        setLoading(false)
      } catch (error) {
        console.log(error)
        setError(true)
      }
    }

    gettingPlaylists()
  }, [])

  if(loading){
    return  <div className='min-h-screen'>
       <Loading />
    </div>
   
  }

  if (error) {
    return <div className='min-h-screen'>
      <Error error={'Sorry! something went wrong'} />

    </div>
  }

  return (
    <div className='min-h-screen pb-40'>
      <div className='pt-5 pl-5 pr-3 mb-5 space-y-5'>
        <h1 className='text-5xl  text-red-300'>Playlists</h1>
        {allPlaylists.length === 0 ?
          (<h2 className='text-lg text-zinc-400 font-thin'>You do'nt have any playlist yet </h2>) : (
            <h2 className='text-lg text-zinc-400 font-thin'>Here are the playlists created by you <HeadsetRounded /> </h2>)
        }
      </div>
      <div className='grid xs:grid-cols-2 sm:grid-cols-3 pr-2  lg:grid-cols-5'>
        <NewPlaylistCard />
          { (allPlaylists.map((playlist, index) => {
          return <PlaylistCard {...playlist} key={index} />
        }))}

      </div>




    </div>
  )
}

export default Playlists

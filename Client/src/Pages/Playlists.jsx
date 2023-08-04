import React, { useEffect, useState } from 'react'
import NewPlaylistCard from '../Components/Playlist/NewPlaylistCard'
import PlaylistCard from '../Components/Playlist/PlaylistCard'
import { getAllPlaylist } from '../api/user'
import Error from '../Components/SharedComponents/Error'
import Loading from '../Components/SharedComponents/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { setUserPlaylists } from '../Features/UserPlaylistSlice'
import { HeadsetRounded } from '@mui/icons-material'



const Playlists = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [allPlaylists, setAllPlaylists] = useState([])

  const dispatch = useDispatch()




  useEffect(() => {
    const gettingPlaylists = async () => {
      try {
        const playlists = await getAllPlaylist()
        setAllPlaylists(playlists)
        dispatch(setUserPlaylists(playlists))
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
    <div className='min-h-screen'>
      <div className='pt-5 pl-5 mb-5 space-y-5'>
        <h1 className='text-5xl  text-red-300'>Playlists</h1>
        {allPlaylists.length === 0 ?
          (<h2 className='text-lg text-zinc-400 font-thin'>You do'nt have any playlist yet </h2>) : (
            <h2 className='text-lg text-zinc-400 font-thin'>Here are the playlists created by you <HeadsetRounded /> </h2>)
        }
      </div>
      <div className='grid grid-cols-5'>
        <NewPlaylistCard />
          { (allPlaylists.map((playlist, index) => {
          return <PlaylistCard {...playlist} key={index} />
        }))}

      </div>




    </div>
  )
}

export default Playlists

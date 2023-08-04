import React, { useEffect, useState } from 'react'
import { TextField } from '@mui/material'
import SongCard from '../Components/Playlist/SongCard'
import { useDispatch, useSelector } from 'react-redux'
import { clearCreatePlaylist } from '../Features/SongSlice'
import { createNewPlaylist } from '../api/user'
import { useNavigate } from 'react-router-dom'
import Loading from '../Components/SharedComponents/Loading'

const CreatePlaylist = () => {
  const { allSongs } = useSelector(store => store.currentTrack)
  const { createPlaylist } = useSelector(store => store.songs)
  const { } = useSelector(store => store.modal)
  const [playlistInfo, setPlaylistInfo] = useState({ name: '', description: '' })
  const [loading, setLoading] = useState(false)


  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clearCreatePlaylist())
  }, [])

  const navigate = useNavigate()
  const handleInput = (e) => {
    setPlaylistInfo({ ...playlistInfo, [e.target.name]: e.target.value })
  }

  const submitPlaylist = async () => {
    if (!playlistInfo.name) {
      alert('please provide name of the playlist')
      return
    }
    if (createPlaylist.length === 0) {
      alert('Playlist can not be empty')
      return
    }

    try {
      setLoading(true)
      const response = await createNewPlaylist({ name: playlistInfo.name, description: playlistInfo.description, songs: createPlaylist })
      navigate('/playlists')
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  if (loading) {
    return <div className='min-h-screen'>
             <Loading />
           </div>

  }

  return (
    <div className='min-h-screen ml-5 mr-5 text-white '>
      <div className='flex border-b-[0.1px] pb-5 border-zinc-600 pt-4  justify-between'>
        <h1 className=' text-red-300 text-4xl font-semibold'>Create a playlist</h1>
        <button className='pl-6 pr-6 rounded-md bg-red-500 mr-6' onClick={submitPlaylist} >Create</button>

      </div>

      <div className='flex mt-8 ml-10 space-x-10 '>
        <div className='flex flex-col'>
          <label htmlFor="playlistName" className='font-thin text-xl text-zinc-300'>Playlist Name</label>
          <TextField id="playlistName" name='name' variant="standard" sx={{ input: { color: 'white', width: "40vw" } }} autoComplete='off' InputLabelProps={{
            shrink: true,
          }} onChange={handleInput} />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="playlistDiscription" className='font-thin text-xl text-zinc-300'>Playlist Discription</label>
          <TextField id="playlistDiscription" name='description' variant="standard" sx={{ input: { color: 'white', width: "40vw" } }} autoComplete='off' onChange={handleInput} />
        </div>
      </div>
      <div className='ml-10 mt-10 space-y-2 mr-10 border-zinc-800'>

        <h1 className=' text-red-300 text-3xl font-semibold  '>Add Songs</h1>

        <h2 className='font-thin  text-zinc-300'>from your favourites</h2>
      </div>

      <div className='mt-10 grid grid-cols-[30%_30%_30%] gap-x-10 gap-y-1 ml-8'>

      </div>

      <div className='ml-10 mr-10 mt-8 pb-2 border-b-[0.1px] border-zinc-800'>
        <h2 className='font-thin  text-zinc-300'>from library</h2>
      </div>
      <div className='mt-10 grid grid-cols-[32%_32%_32%] gap-x-7 gap-y-2 ml-8'>
        {allSongs.map((song, index) => {
          return <SongCard key={index} {...song} />
        })}

      </div>

    </div>
  )
}

export default CreatePlaylist

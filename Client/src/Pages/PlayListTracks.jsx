import React from 'react'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useDispatch} from 'react-redux'
import SongCardList from '../Components/ArtistPlaylist/SongCardList'
import {setcurrentArtist,setCurrentTrack,setIsplaying} from '../Features/CurrentTrack'
import { setPlayList } from '../Features/SongSlice'


const PlayListTracks = () => {
 const  {id} = useParams()
 const  {userPlaylists} = useSelector(store=>store.playlists)
  const [{name,songs,description,createdAt}]=  userPlaylists.filter((playlist)=>playlist._id===id)
  const dispatch = useDispatch()
  const playAllHanlder =()=>{
    
    dispatch( setCurrentTrack(songs[0]))
     dispatch(setIsplaying(true))
     dispatch(setPlayList(songs))
   }

  return (
    <div className='bg-black flex gap-3  pb-1  pl-3 pr-3'>
    <div className=' bg-zinc-800 w-full  text-white '>
      <div className=' pr-1 grid grid-cols-[160px_1200px]'>
        <div className=' bg-zinc-900 border-gray-700 border-r-[0.5px]'>

        </div>
        <div className=' mt-4 ml-2'>
          <div className='flex space-y-1'>
            <img src="/music13.jpg" alt="artist img" className='w-[210px] h-[210px] rounded-lg pl-1 mt-4 ' />
            <div className='ml-4 pr-10'>
               <h2 className='pt-2 text-red-400 mb-4'>Playlist</h2>
              <h2 className='text-6xl text-red-500 mb-4 '> {name}</h2>

              {description}

            </div>

          </div>
          <div className='mt-10 flex gap-x-12 border-b-gray-700 border-b-[0.3px] pb-5 mr-10' >
             <h1 className='text-3xl ml-4'>{songs.length} Songs</h1>
             <button className='border-white border-2 w-32 h-10 rounded-lg' onClick={playAllHanlder}>play All</button>
         
          </div>
         <SongCardList albums={songs}/>
           
        </div>
      </div>

    </div>
  </div>
  )
}

export default PlayListTracks

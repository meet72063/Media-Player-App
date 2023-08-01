



import React, { useState } from 'react'
import { app } from '../../../config/fireBase.-config'
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { CloudUpload } from '@mui/icons-material'

import IsUploading from './IsUploading'
import TrackUpload from './TrackUpload'
import {addingSongs} from '../../api/admin'
import { useSelector } from 'react-redux/es/hooks/useSelector'



const storage = getStorage(app)



const UploadSongtoArtist = () => {
  const [isUploading, setIsuploading] = useState(false)
  const [songprogressValue, setsongProgressValue] = useState(0)
  

  

  const [state, setState] = useState({song: '' })
  const [songDetails, setSongDetails] = useState({  url: '', name:'',Artist:'' })
  

  const  handleChange = (e)=>{
    setSongDetails({...songDetails,[e.target.name]:e.target.value})
  }
  
  const  { } = useSelector((store)=>store.currentTrack)

  const deleteFile = (fileName) => {
    console.log(fileName)
    setIsuploading(true )
    const url = `${songDetails.url}`
    const deleteRef = ref(storage, url)
    deleteObject(deleteRef).then(() => {

      setIsuploading( false )

     setSongDetails ({...songDetails, url:''})
      

    }).catch((err) => {
      setIsuploading(false)
      console.log(err)
    })
  }







  const uploadHanlder = (e) => {
    if(!songDetails.Artist){
      alert("provide artist name first")
      return
    }

    const storageRef = ref(storage, `Artists_playlist/${songDetails.Artist}/${e.target.files[0].name}-${Date.now()}`)

    const metadata = {
      contentType: 'audio/mpeg',
    };
    setIsuploading(true)

    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0], metadata)
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      
      setsongProgressValue(progress)

    }, (error) => {
      console.log(error)
      setIsuploading( false)

    },
      () => {

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
           setSongDetails({ ...songDetails, url: downloadURL })


          setState({song: downloadURL })
          setIsuploading( false )
        });
      })

  }

  const submitSong = async()=>{
       if(!songDetails.url||!songDetails.name){
        alert('please provide songCover and song both')
        return
       }
       try {
        const res=  await addingSongs({song:songDetails.url,name:songDetails.name})
      console.log(res)
    console.log('uploaded succesfully')
       } catch (error) {
        console.log(error)
       }
      
      
  }



  return (

    <div>
      <div className='pt-8 mb-4 text-3xl  pl-5 font-bold text-red-600'>
      <h1 >Upload New Songs </h1>
      </div>
      <div className='grid pb-2 pt-2 grid-cols-1 w  h-[60vh]  gap-2 bg-slate-200  '>


        {/* songCover Upload */}
       


        {/* song upload */}

        {isUploading? <IsUploading progress={songprogressValue} /> : <div className='bg-white text-center flex flex-col justify-center rounded-lg w-[500px]  '>
          {!state.song ? <label htmlFor="song-upload" className='cursor-pointer'>

            <div className='space-x-3 text-lg '>
              <CloudUpload /><span className='text-red-400 '>Upload Song </span>
            </div>
          </label> : <TrackUpload source={state.song} deleteFile={deleteFile} />}
          <input type="file" name='song' accept='audio/mpeg/mp3' onChange={uploadHanlder} id='song-upload' className='hidden' />
        </div>}

      </div>

      <div className=' flex justify-evenly text-lg '>
        <div className='space-x-2 '>
          <label  htmlFor="SongName" className='font-semibold'>Song Name</label>
          <input id='SongName' name='name' type="text" className='pl-1' value={songDetails.name} onChange={handleChange} />
        </div>
        <div className='space-x-2'>
          <label htmlFor="Artist" className='font-semibold'>Artist Name</label>
          <input id='artistName' value={songDetails.Artist} name='Artist' type="text" className='pl-1' onChange={handleChange} />

        </div>
        <div >
          <button onClick={submitSong} className='bg-red-400 w-48 rounded-lg border-sky-200'>Save</button>
        </div>



      </div>
    </div>


  )
}


export default UploadSongtoArtist







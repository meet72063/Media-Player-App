import React, { useState } from 'react'
import { app } from '../../../config/fireBase.-config'
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { CloudUpload } from '@mui/icons-material'
import SongCoverUpload from './SongCoverUpload'
import IsUploading from './IsUploading'
import TrackUpload from './TrackUpload'
import {saveSong} from '../../api/admin'
import { useSelector } from 'react-redux'


const storage = getStorage(app)



const UploadSong = () => {
  const [isUploading, setIsuploading] = useState({ songCover: false, song: false, })
  const [songprogressValue, setsongProgressValue] = useState(0)
  const [sonCovergprogressValue, setCoversongProgressValue] = useState(0)
  

  

  const [state, setState] = useState({ songCover: '', song: '' })
  const [songDetails, setSongDetails] = useState({ img: '', url: '', name:'', artist: '' })

  const  handleChange = (e)=>{
    setSongDetails({...songDetails,[e.target.name]:e.target.value})
  }
  

  const deleteFile = (fileName) => {
    console.log(fileName)
    setIsuploading({ ...isUploading, [fileName]: true })
    const url = fileName === 'songCover' ? `${songDetails.img}` : `${songDetails.url}`
    const deleteRef = ref(storage, url)
    deleteObject(deleteRef).then(() => {

      setIsuploading({ ...isUploading, [fileName]: false })

      fileName === 'songCover' ? songDetails.img = null : songDetails.url = null
      

    }).catch((err) => {
      setIsuploading({ ...isUploading, [fileName]: false })
      console.log(err)
    })
  }







  const uploadHanlder = (e) => {

    const storageRef = ref(storage, `${e.target.name}/${e.target.files[0].name}-${Date.now()}`)

    const metadata = {
      contentType: `${e.target.name === 'songCover' ? 'img/*' : 'audio/mpeg'}`,
    };
    setIsuploading({ ...isUploading, [e.target.name]: true })

    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0], metadata)
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      
      e.target.name === 'songCover' ? setCoversongProgressValue(progress) : setsongProgressValue(progress)

    }, (error) => {
      console.log(error)
      setIsuploading({ ...isUploading, [e.target.name]: false })

    },
      () => {

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          e.target.name === 'songCover' ? setSongDetails({ ...songDetails, img: downloadURL }) : setSongDetails({ ...songDetails, url: downloadURL })


          setState({ ...state, [e.target.name]: downloadURL })
          setIsuploading({ ...isUploading, [e.target.name]: false })
        });
      })

  }

  const submitSong = async()=>{
       if(!songDetails.img||!songDetails.url){
        alert('please provide songCover and song both')
        return
       }
       try {
        const res=  await saveSong(songDetails)
      console.log(res)
      setSongDetails({ img: '', url: '', name:'', artist: '' })
      setState({ songCover: false, song: false,})
       } catch (error) {
        console.log(error)
       }
      
      
  }



  return (

    <div>
      <div className='pt-8 mb-4 text-3xl  pl-5 font-bold text-red-600'>
      <h1 >Upload New Songs </h1>
      </div>
      <div className='grid pb-2 pt-2 grid-cols-2 w  h-[50vh]  gap-2 bg-slate-200  '>


        {/* songCover Upload */}
        {
          isUploading.songCover ? <IsUploading progress={sonCovergprogressValue} /> : <div className='bg-white text-center flex flex-col justify-center rounded-lg  w-[500px] '>
            {!state.songCover ? <label htmlFor="img-upload" className='cursor-pointer'>


              <div className='space-x-3 text-lg'>
                <CloudUpload /><span className='text-red-400 '>Upload Song Cover</span>
              </div>
            </label> : <SongCoverUpload songCover={state.songCover} deleteFile={deleteFile} />}
            <input type="file" id='img-upload' name='songCover' onChange={uploadHanlder} className='hidden cursor-auto' accept='jpg/png' />

          </div>}


        {/* song upload */}

        {isUploading.song ? <IsUploading progress={songprogressValue} /> : <div className='bg-white text-center flex flex-col justify-center rounded-lg w-[500px]  '>
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
          <label  htmlFor="songName" className='font-semibold'>Song Name</label>
          <input id='songName' name='name' type="text" className='pl-1' value={songDetails.name} onChange={handleChange} />
        </div>
        <div className='space-x-2'>
          <label htmlFor="artistName" className='font-semibold'>Artist/Artists Name</label>
          <input id='artistName' value={songDetails.artist} name='artist' type="text" className='pl-1' onChange={handleChange} />

        </div>
        <div >
          <button onClick={submitSong} className='bg-red-400 w-48 rounded-lg border-sky-200'>Save</button>
        </div>



      </div>
    </div>


  )
}


export default UploadSong







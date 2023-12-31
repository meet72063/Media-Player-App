
// upload song to an existing artist playlist


import React, { useState } from 'react'
import { app } from '../../../config/fireBase.-config'
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { CloudUpload } from '@mui/icons-material'

import IsUploading from './IsUploading'
import TrackUpload from './TrackUpload'
import { addingSongs } from '../../api/admin'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import SongCoverUpload from './SongCoverUpload'



const storage = getStorage(app)



const UploadSongtoArtist = () => {
  const [isUploading, setIsuploading] = useState({ song: false, songCover: false })
  const [songprogressValue, setsongProgressValue] = useState(0)
  const [songCovergprogressValue, setSongCoverPogrssValue] = useState(0)
  const [select, setSelect] = useState('')
  const { allArtist } = useSelector(store => store.currentTrack)
  const { token } = useSelector(store => store.userDetails)




  const [state, setState] = useState({ song: '', songCover: '' })
  const [songDetails, setSongDetails] = useState({ url: '', name: '', Artist: '', img: '' })


  const handleChange = (e) => {
    setSongDetails({ ...songDetails, [e.target.name]: e.target.value })
  }

  const { } = useSelector((store) => store.currentTrack)


  // to delete uploaded cover or song
  const deleteFile = (fileName) => {

    fileName === 'songCover' ? setIsuploading({ ...isUploading, songCover: true }) : setIsuploading({ ...isUploading, song: true })

    const url = `${fileName === 'songCover' ? songDetails.img : songDetails.url}`
    const deleteRef = ref(storage, url)
    deleteObject(deleteRef).then(() => {

      fileName === 'songCover' ? setIsuploading({ ...isUploading, songCover: false }) : setIsuploading({ ...isUploading, song: false })


      fileName === 'songCover' ? setSongDetails({ ...songDetails, img: '' }) : setSongDetails({ ...songDetails, url: '' })
      fileName === 'songCover' ? setState({ ...state, songCover: '' }) : setSongDetails({ ...songDetails, song: '' })


    }).catch((err) => {
      fileName === 'songCover' ? setIsuploading({ ...isUploading, songCover: false }) : setIsuploading({ ...isUploading, song: false })

      console.log(err)
    })
  }






  // upload song 
  const uploadHanlder = (e) => {
    if (!songDetails.Artist) {
      alert("provide artist name first")
      return
    }

    const storageRef = ref(storage, `Artists_playlist/${songDetails.Artist}/${e.target.files[0].name}-${Date.now()}`)

    const metadata = {
      contentType: 'audio/mpeg',
    };
    setIsuploading({ ...isUploading, song: true })


    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0], metadata)
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      setsongProgressValue(progress)

    }, (error) => {
      console.log(error)
      setIsuploading({ ...isUploading, song: false })


    },
      () => {

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setSongDetails({ ...songDetails, url: downloadURL })


          setState({ ...state, song: downloadURL })
          setIsuploading({ ...isUploading, song: false })
        });
      })

  }

  // upload song cover pic
  const CoverUploadHanlder = (e) => {
    if (!songDetails.Artist) {
      alert("provide artist name first")
      return
    }

    const storageRef = ref(storage, `Artists_playlist/${songDetails.Artist}/${e.target.files[0].name}-${Date.now()}`)

    const metadata = {
      contentType: 'img/jpg',
    };

    setIsuploading({ ...isUploading, songCover: true })

    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0], metadata)
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(progress)
      setSongCoverPogrssValue(progress)

    }, (error) => {
      console.log(error)
      setIsuploading({ ...isUploading, songCover: false })

    },
      () => {

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setSongDetails({ ...songDetails, img: downloadURL })


          setState({ ...state, songCover: downloadURL })
          setIsuploading({ ...isUploading, songCover: false })

        });
      })

  }



  // save song to mongodb

  const submitSong = async () => {
    if (!songDetails.url || !songDetails.name || !songDetails.img) {
      alert('please provide songCover and song both')
      return
    }

    if (!select) {
      alert('please choose the artist to whom you want to upload ')
      return
    }
    try {
      const res = await addingSongs({ url: songDetails.url, name: songDetails.name, img: songDetails.img, artist: songDetails.Artist }, select, token)
      console.log(res)
      console.log('uploaded succesfully')
    } catch (error) {
      console.log(error)
    }


  }



  return (

    <div className='pb-40'>
      <div className='pt-8 mb-4 text-3xl  pl-5 font-bold text-red-600 '>
        <h1 >Upload New Songs </h1>
      </div>
      <div className='grid pb-2 pt-2 grid-cols-2 w  h-[60vh]   '>


        {/* songCover Upload */}

        {
          isUploading.songCover ? <IsUploading progress={songCovergprogressValue} /> : <div className='bg-white text-center flex flex-col justify-center rounded-lg  w-[500px] '>
            {!state.songCover ? <label htmlFor="upload" className='cursor-pointer'>


              <div className='space-x-3 text-lg'>
                <CloudUpload /><span className='text-red-400 '>Upload Song Cover</span>
              </div>
            </label> : <SongCoverUpload songCover={state.songCover} deleteFile={deleteFile} />}
            <input type="file" id='upload' name='songCover' onChange={CoverUploadHanlder} className='hidden cursor-auto' accept='jpg/png' />

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
          <label htmlFor="SongName" className='font-semibold'>Song Name</label>
          <input id='SongName' name='name' type="text" className='pl-1' value={songDetails.name} onChange={handleChange} />
        </div>
        <div className='space-x-2'>
          <label htmlFor="Artist" className='font-semibold'>Artist Name</label>
          <input id='artistName' value={songDetails.Artist} name='Artist' type="text" className='pl-1' onChange={handleChange} />

        </div>
        <div >
          <button onClick={submitSong} className='bg-red-400 w-48 rounded-lg border-sky-200'>Save</button>
        </div>

        <label htmlFor="artist">Choose Artist</label>
        <select name="artist" id="artist" onChange={(e) => setSelect(e.target.value)}>
          <option value=''></option>
          {allArtist.map((a, index) => {
            return <option value={`${a._id}`} key={index}>{a.name}</option>
          })}

        </select>


      </div>
    </div>


  )
}


export default UploadSongtoArtist







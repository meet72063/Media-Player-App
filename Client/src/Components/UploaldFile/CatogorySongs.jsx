



import React, { useState } from 'react'
import { app } from '../../../config/fireBase.-config'
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { CloudUpload } from '@mui/icons-material'
import axios from 'axios'
import IsUploading from './IsUploading'
import TrackUpload from './TrackUpload'
import {addingSongs} from '../../api/admin'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import SongCoverUpload from './SongCoverUpload'



const storage = getStorage(app)



const CatogorySongs = () => {
  const [isUploading, setIsuploading] = useState({song:false,songCover:false})
  const [songprogressValue, setsongProgressValue] = useState(0)
  const [songCovergprogressValue,setSongCoverPogrssValue] = useState(0)
  const [select,setSelect] = useState('')

  const {catogories} = useSelector(store=>store.currentTrack)

 
  

  const [state, setState] = useState({song: '' ,songCover:''})
  const [songDetails, setSongDetails] = useState({  url: '', name:'',Artist:'',img:'' })
  

  const  handleChange = (e)=>{
    setSongDetails({...songDetails,[e.target.name]:e.target.value})
  }
  
//   const  { } = useSelector((store)=>store.currentTrack)

  const deleteFile = (fileName) => {
    
  fileName==='songCover'?setIsuploading({...isUploading,songCover:true}):setIsuploading({...isUploading,song:true})
   
    const url = `${fileName==='songCover'?songDetails.img:songDetails.url}`
    const deleteRef = ref(storage, url)
    deleteObject(deleteRef).then(() => {
      
      fileName==='songCover'?setIsuploading({...isUploading,songCover:false}):setIsuploading({...isUploading,song:false})


      fileName==='songCover'?setSongDetails({...songDetails,img:''}) :setSongDetails ({...songDetails, url:''})
      fileName==='songCover'?setState({...state,songCover:''}) :setSongDetails ({...songDetails, song:''})
      

    }).catch((err) => {
      fileName==='songCover'?setIsuploading({...isUploading,songCover:false}):setIsuploading({...isUploading,song:false})

      console.log(err)
    })
  }







  const uploadHanlder = (e) => {
  
console.log('started uploading')
    const storageRef = ref(storage, `CatogoryPlaylist/Hip-Hop/${e.target.files[0].name}-${Date.now()}`)

    const metadata = {
      contentType: 'audio/mpeg',
    };
    setIsuploading( {...isUploading,song:true})


    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0], metadata)
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      
      setsongProgressValue(progress)

    }, (error) => {
      console.log(error)
      setIsuploading( {...isUploading,song:false})


    },
      () => {

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
           setSongDetails({ ...songDetails, url: downloadURL })


          setState({...state,song: downloadURL })
          setIsuploading( {...isUploading,song:false})
        });
      })

  }

  const CoverUploadHanlder = (e) => {
    // if(!songDetails.Artist){
    //   alert("provide artist name first")
    //   return
    // }

    const storageRef = ref(storage, `Catorgory_playlist/${songDetails.Artist}/${e.target.files[0].name}-${Date.now()}`)

    const metadata = {
      contentType: 'img/jpg',
    };
   
    setIsuploading({...isUploading,songCover:true})

    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0], metadata)
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(progress)
      setSongCoverPogrssValue(progress)

    }, (error) => {
      console.log(error)
      setIsuploading({...isUploading,songCover:false})
    
    },
      () => {

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
           setSongDetails({ ...songDetails, img: downloadURL })


          setState({...state,songCover:downloadURL })
          setIsuploading({...isUploading,songCover:false})

        });
      })

  }








  const submitSong = async()=>{
       if(!songDetails.url||!songDetails.name||!songDetails.img){
        alert('please provide songCover and song both')
        return
       }

      if(!select){
        alert("please select the catogory")
      }
       try {
        const res=  await axios.patch(`http://localhost:5000/admin/addToCatogoryPLaylist/${select}`,{url:songDetails.url,name:songDetails.name,img:songDetails.img,artist:songDetails.Artist})
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
       
        {
          isUploading.songCover ? <IsUploading progress={songCovergprogressValue} /> : <div className='bg-white text-center flex flex-col justify-center rounded-lg  w-[500px] '>
            {!state.songCover ? <label htmlFor="cover" className='cursor-pointer'>


              <div className='space-x-3 text-lg'>
                <CloudUpload /><span className='text-red-400 '>Upload Song Cover</span>
              </div>
            </label> : <SongCoverUpload songCover={state.songCover} deleteFile={deleteFile} />}
            <input type="file" id='cover' name='songCover' onChange={CoverUploadHanlder} className='hidden cursor-auto' accept='jpg/png' />

          </div>}


        {/* song upload */}

        {isUploading.song? <IsUploading progress={songprogressValue} /> : <div className='bg-white text-center flex flex-col justify-center rounded-lg w-[500px]  '>
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
          <label  htmlFor="trackName" className='font-semibold'>Song Name</label>
          <input id='trackName' name='name' type="text" className='pl-1' value={songDetails.name} onChange={handleChange} />
        </div>
        <div className='space-x-2'>
          <label htmlFor="Artist" className='font-semibold'>Artist Name</label>
          <input id='artistName' value={songDetails.Artist} name='Artist' type="text" className='pl-1' onChange={handleChange} />

        </div>
        <div >
          <button onClick={submitSong} className='bg-red-400 w-48 rounded-lg border-sky-200'>Save</button>
        </div>
  
    <label htmlFor="catogory">Choose Catogory</label>
   <select name="catogory" id="artist" onChange={(e)=>setSelect(e.target.value)}>
    <option value=''></option>
   { catogories.map((a,index)=>{
    return  <option value={`${a._id}`} key={index}>{a.name}</option>
   })}
      
   </select>
     

      </div>
    </div>


  )
}


export default CatogorySongs 







import React, { useState } from 'react'
import { CloudUpload, ConstructionOutlined } from '@mui/icons-material'
import { app } from '../../../config/fireBase.-config'
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import IsUploading from './IsUploading'
import SongCoverUpload from './SongCoverUpload'
import Error from '../SharedComponents/Error'
import { saveArtistPlaylist } from '../../api/admin'
import {setartistSongs} from '../../Features/CurrentTrack'
import { useDispatch, useSelector } from 'react-redux'



const ArtistUpload = () => {
  const [isUploading, setIsuploading] = useState({ img: '', song:false })
  const [imgProgress,setImgProgress] = useState(0)
  const [uploadValue, setUploadValue] = useState(0)
  const [songprogressValue, setsongProgressValue] = useState(0)
  const [error, setError] = useState(false)
  const [filesCount, setFileCount] = useState(0)
  const [img, setImg] = useState(false)
  const [songs,setSongs] = useState([])
 
const dispatch = useDispatch()
  const [artistDetails, setArtistDetails] = useState({ name: '', description: '' })
  // const {songs} = useSelector((store)=>store.currentTrack)
  //deleting the uploaded picture
  const deleteFile = (file) => {

    setIsuploading({...isUploading,img:true})
    const url = img
    const deleteRef = ref(storage, url)
    deleteObject(deleteRef).then(() => {

      setIsuploading({...isUploading,img:false})

      setImg(null)

    }).catch((err) => {
      setIsuploading({...isUploading,img:false})
      
      console.log(err)
    })
  }

  //handling input 

  const detailsHandler = (e) => {
  
    setArtistDetails({ ...artistDetails, [e.target.name]: e.target.value })
  }


 
  //uploading multiple songs
const storage = getStorage(app)
async function uploadFileAsPromise (file,option) {
  if(!artistDetails.name){
    alert('please provide artist name')
    return
  }
  return new Promise(function (resolve, reject) {
    const storageRef = ref(storage, `Artists_playlist/${artistDetails.name}/${file.name}-${Date.now()}`)
    const metadata = {
      contentType: `${option?'img/jpg':'audio/mpeg'}`,
    };
  option?setIsuploading({...isUploading,img:true}): setIsuploading({...isUploading, song: true })
 const uploadTask =  uploadBytesResumable(storageRef, file, metadata)


      //Update progress bar
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        
    option?setImgProgress(progress) : setsongProgressValue(progress)
    
      },
          function error(err){
              console.log(err);
              reject(err);
          },
          () => {

            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              if(option){
                setImg(downloadURL)
                setIsuploading({isUploading,img:false})
                return
              }
             
           setUploadValue(uploadValue+1)
              resolve(downloadURL)
            });
          }
      );
  });
}




//multiple songs uploading 

const songsUploader =async (e)=>{
  setFileCount(e.target.files.length)
 for (var i = 0; i < e.target.files.length; i++) {
  var imageFile = e.target.files[i];
  await uploadFileAsPromise(imageFile).then((res)=>{
   setSongs([...songs,res])
    console.log(res)
    });
}

setIsuploading({...isUploading,song:false})
setFileCount(0)
alert("all files has been uploaded")
}



//saving to mongoodb
const saveToDataBase =async()=>{
  if(!artistDetails.description||!artistDetails.name){
    alert("please provide all the fields")
    return
  }
  try {
   const res =  await saveArtistPlaylist({...artistDetails,img,albums:songs})
   console.log(res)
   setImg(null)
   setArtistDetails({ name: '', description: '' })
  
  } catch (error) {
    console.log(error)
  }
}


if(error){
  return <Error error="something went wrong "/>
}



  return (
    <div className='mt-10'>
      <div className='pt-8 mb-4 text-3xl  pl-5 font-bold text-red-600'>
        <h1 >Upload Artist Playlist</h1>
      </div>
      <div className=' pb-2 pt-2 w-[1100px]  bg-red-100  '>
        <div className='flex-col'>
          <div className=' flex  space-y-6 pt-2 pb-2'>
            <div className=' space-x-2'>
              <label className='p-5 text-2xl text-red-500'>Artist name</label>
              <input id='name' type="text" name='name' onChange={detailsHandler} className='w-74 h-8 rounded-md p-4' />
            </div>

          </div>
          <div className='grid grid-cols-2 gap-2'>
            <div className='bg-white text-center flex flex-col  w-[1100] justify-center rounded-lg   '>

              {isUploading.img ? <IsUploading progress={imgProgress} /> : <div className='bg-white text-center flex flex-col h-[30vh] justify-center rounded-lg  w-[500px] '>


                {img ? <SongCoverUpload songCover={img} deleteFile={deleteFile} /> : <label htmlFor="upload-Img" className='cursor-pointer'>


                  <div className='space-x-3 text-lg'>
                    <CloudUpload /><span className='text-red-400 '>Upload Artist Image</span>
                  </div>
                  <input type="file" id='upload-Img' onChange={(e)=>uploadFileAsPromise(e.target.files[0],'img')} name='artistImg' className='hidden cursor-auto' accept='jpg/png' multiple />

                </label>}



              </div>}

            </div>


            {isUploading.song ? <div>
              <div className='bg-white text-center flex flex-col h-[50vh] justify-center rounded-lg space-y-2'>
              <IsUploading progress={songprogressValue} />
                <div className=' text-2xl'>
                  <h2>Toatal Number of Files : {filesCount}</h2>
                </div>
                <div className='text-2xl'>
                  <h2>Number of Files Uploads :{uploadValue}</h2>

                </div>
              </div>
            </div> :
              <div className='bg-white text-center flex flex-col justify-center rounded-lg w-[500px]  '>
                <label htmlFor="uploadsongs" className='cursor-pointer'>

                  <div className='space-x-3 text-lg '>
                    <CloudUpload /><span className='text-red-400 '>Upload Song </span>
                  </div>
                </label> 
          <input type="file" name='song' accept='audio/mpeg/mp3' onChange={(e)=>songsUploader(e)} id='uploadsongs' className='hidden' multiple />

              </div>}


          </div>
          <div>
            <h1 className='p-5 text-2xl text-red-500 max-w-[1100px] '>About Artist</h1>
            <div className='w-96 pl-20'>
              <textarea name="description" id="" cols="100" rows="10" className='p-3  text-lg' onChange={detailsHandler}></textarea>

            </div>
          </div>

          <div className='flex justify-end pr-52 mb-52'>
            <button className='text-lg p-2 border-red-400 border-2 w-20  rounded-lg' onClick={saveToDataBase}>Save</button>

          </div>
        </div>

      </div>

    </div>
  )
}

export default ArtistUpload

import { useSelector,useDispatch } from 'react-redux'
import { setCurrentTrack } from '../../Features/CurrentTrack'
import { setPlayList } from '../../Features/SongSlice'





const DispalyTrack = ({audioRef,currentplaying,progressRef,progressValue,duration,setDuration,loop}) => {
  const { allSongs} = useSelector((store) => store.currentTrack)
  const {playlist } = useSelector((store)=>store.songs)
  
  const dispatch = useDispatch()
  let index 
  playlist.some((song,i)=>{
   if(song.name===currentplaying.name){
     index =i
     return true 
   }
  })

//onEnded handler
const handleEnded= ()=>{
  let  maxIndex = playlist.length-1
  if(loop){
    audioRef.current.currentTime=0
    audioRef.current.play()
    return
  }
  if (index===maxIndex) {
    dispatch(setPlayList(allSongs))
    dispatch(setCurrentTrack({ ...playlist[0] }))

  }else if(index===undefined){
    dispatch(setCurrentTrack({ ...playlist[0] }))
    
  }else{
     const newIndex = index+1
     dispatch(setCurrentTrack({...playlist[newIndex]}))
    }

   }



 
// time formatting to minutes and seconds 
  const formatTime = (time)=>{
    if(time&& !isNaN(time)){
       const minutes = Math.floor(time/60)
    const  formatMinutes = minutes<10?`0${minutes}`:minutes;
    const seconds = Math.floor(time%60)
    const formatSeconds = seconds<10?`0${seconds}`:seconds;
    return `${formatMinutes}:${formatSeconds}`
    }
   
  }


//Change progress 
const handleChange = ()=>{
audioRef.current.currentTime = progressRef.current.value }


 //when song loads progressBar song's duration assigned to max value
const onLoadedMetadata =()=>{
  const seconds = audioRef.current.duration
  setDuration(seconds)
  progressRef.current.max = seconds
}
 

 
return (
   
 <div className='flex flex-col gap-y-3 '>

   <div  className='  flex place-content-center gap-x-2 rounded-3xl ' >
        <audio src={currentplaying?.url} ref={audioRef} onLoadedMetadata={onLoadedMetadata} onEnded={handleEnded} ></audio>
        
       <span >{formatTime(progressValue)}</span> <input type="range"className='w-[800px] ' defaultValue={0} onChange={handleChange} ref={progressRef} /><span>{formatTime(duration)}</span>
    </div>
    
 </div>
   
  )
   
}

export default DispalyTrack

const {validation,User} = require('../models/user')
const {StatusCodes} = require('http-status-codes')
const bcrypt = require('bcrypt')
const { Song } = require('../models/song')
const {PlayList,playlistValidaion} = require('../models/playlist')
require('express-async-errors')




//sign Up
const creatUser = async(req,res)=>{
  const {error} = validation(req.body)
 if(error){
  let err = error.details[0].message
  err.replaceAll('\\')
  res.status(StatusCodes.BAD_REQUEST).json({messege:err.toUpperCase()})
  return
}
 
const newUser = await User.create(req.body)
const token = newUser.generateToken()
res.status(StatusCodes.CREATED).json({status:'successful',token})
}

//login
const logIn = async(req,res)=>{
  const {password,email} =  req.body
  if(!email||!password){
    res.status(StatusCodes.BAD_REQUEST).json({error:'please provide creadentials'})
    return
  }

  const user = await User.findOne({email:email})
  
  if(!user){
    res.status(StatusCodes.BAD_REQUEST).json({error:'user not found '})
    return
  }
  
  //compare password
 const isVarified = await user.comparePassword(password)
 if(!isVarified){
     res.status(StatusCodes.BAD_REQUEST).json({error:'incorrect password'})
     return
 }
 
delete user._doc.password
 const token = user.generateToken()
  res.status(StatusCodes.OK).json({status:'successful',token,data:user._doc})

}


//Delete user

const Delete = async (req,res)=>{
  
  const {body:{password,email} ,user:{userId} } = req

  //compare password
 const isVarified = await user.comparePassword(password)
 if(!isVarified){
     res.status(StatusCodes.BAD_REQUEST).json({error:'incorrect password'})
     return
 }

  const user = await User.findByIdAndDelete({_id:userId})
  res.status(StatusCodes.OK).json({status:"success",message:'user has been Deleted successfully'})
  
}

//Update user 
const Update = async (req,res)=>{
   const { body:{password},user:{userId}} = req

   //hashing password to update
   if(password){
    const salt = await bcrypt.genSalt(10)
   
    let hashedpassword = await bcrypt.hash(String(password),salt)
    req.body = {...req.body,password:hashedpassword}
   
   }


 const user= await User.findByIdAndUpdate({_id:userId},req.body,{new:true}).select('-password')
  res.status(StatusCodes.OK).json({status:"success",message:'user has been updated successfully',data:user})
}

//getting user details

const getUser = async (req,res)=>{
  const {userId} = req.user
  const user = await User.findOne({_id:userId})
  res.status(StatusCodes.OK).json({user})
}


//getting all songs 

const getSongs = async (req,res)=>{
  const  songs = await Song.find({})
  res.status(StatusCodes.OK).json({songs})
}



// add/remove to/from liked songs 

const updateLikedSongs = async (req,res)=>{
  const {params:{songId},user:{userId}} = req
  const {likedSongs} = await User.findById({_id:userId})
   let index = likedSongs.indexOf(songId)
   if(index===(-1)){
   likedSongs.push(songId)
 const user= await User.findByIdAndUpdate({_id:userId},{likedSongs}).select('-password')
   res.status(StatusCodes.OK).json({message:' song has been added to your liked songs ',user})
   return
   }
 const updateSong= likedSongs.filter((item)=>item!==likedSongs[index])
 const user= await User.findByIdAndUpdate({_id:userId},{likedSongs:updateSong}).select('-password')

res.status(StatusCodes.OK).json({message:'song has been removed from your liked songs',user})
  
}

//making playlist

const newPlayList = async (req,res)=>{
  const {error} = playlistValidaion(req.body)
  if(error){
    res.status(StatusCodes.BAD_REQUEST).json({error:error.details[0].message})
    return
  }

  const {body,user:{userId}}=req
  const playListExist = await PlayList.findOne({user:userId,name:body.name})
  if(playListExist!==null){
    res.status(StatusCodes.BAD_REQUEST).json({message:'playlist already exit with this name'})
    return
  }
  const newplaylist = await PlayList.create({user:userId,...body})
  res.status(StatusCodes.OK).json({message:'New playlist created',newplaylist})
}


//Deleting playlist

const deltePlaylist = async (req,res)=>{
  const {params:{playlistId},user:{userId}} = req
  const deltedPlaylist  = await PlayList.findOneAndDelete({_id:playlistId,user:userId})
  res.status(StatusCodes.OK).json({message:'playlist has been deleted successfully',deltedPlaylist})
}

//Editing playlist

const editPlaylist = async (req,res)=>{
  const {params:{playlistId},user:{userId}} = req
   await PlayList.findOneAndUpdate({_id:playlistId,user:userId},req.body)
  res.status(StatusCodes.OK).json({message:'playlist has been updated successfully'})
}


//getPlaylist

const getPlaylist = async (req,res)=>{
  const {params:{playlistId},user:{userId}} = req
  const playlist= await PlayList.findOne({_id:playlistId,user:userId})
  if(playlist===null){
    res.status(StatusCodes.NOT_FOUND).json({error:'No playlist with this id'})
    return
  }
  res.status(StatusCodes.OK).json({playlist})
}

//all playlist by the user
const getAllPlaylist = async(req,res)=>{
  const {userId} = req.user
  const playlists = await PlayList.find({user:userId})
  if(playlists===null){
    res.status(StatusCodes.NOT_FOUND).json({error:'No playlist with this id'})
    return
  }
  res.status(StatusCodes.OK).json({playlists})
 
}

//  adding/removing songs to/from playlist

const addingSongs = async(req,res)=>{
  
  const {body:{songId},user:{userId},params:{playlistId}} =req;
  
  const {songs,name} =await PlayList.findOne({_id:playlistId,user:userId})
  
let index  = songs.indexOf(songId)
console.log(index)
 if(index===-1){
 
 songs.push(songId)
 console.log(songs)
  await PlayList.findOneAndUpdate({_id:playlistId,user:userId},{songs})
  res.status(StatusCodes.OK).json({message:`song has been added to ${name}`})
  return
 }
const filteredPlaylist =songs.filter((i)=>i!==songId)


await PlayList.findOneAndUpdate({_id:playlistId,user:userId},{songs:filteredPlaylist})
res.status(StatusCodes.OK).json({message:`song has been removed from ${name}`})

}



module.exports = 
{creatUser,
  logIn,
  Delete,
  Update,
  updateLikedSongs,
  getUser,getSongs,
  newPlayList,
  deltePlaylist,
  editPlaylist,
  getPlaylist,
  getAllPlaylist,
  addingSongs
}
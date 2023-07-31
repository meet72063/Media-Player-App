const { User } = require("../models/user");
const { PlayList, playlistValidaion } = require("../models/playlist");
const {artistValidation,Artist} = require("../models/Artist")
const { Song, songValidate } = require("../models/song");
const { StatusCodes } = require("http-status-codes");

//accessing all users
const getAllusers = async (req, res) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).json({ users, status: "successful" });
};

//getting user by id
const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById({ _id: id });
  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({ message: "no user with this id" });
    return;
  }
  res.status(StatusCodes.OK).json({ user, status: "successful" });
};

//deleting user by id
const deleteUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete({ _id: id });
  if (!user) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "no user exist with this id" });
    return;
  }
  res
    .status(StatusCodes.OK)
    .json({ user, message: "user has been Deleted successfully" });
};

//editing user by id (e.g.making admin)
const editUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate({ _id: id }, req.body).select(
    "-password"
  );
  if (!user) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "no user exist with this id" });
    return;
  }
  res
    .status(StatusCodes.OK)
    .json({ user, message: "user has been updated successfully" });
};

//adding songs

const addSong = async (req, res) => {
  
  console.log(req.body)
  const { name, img,url,artist } = req.body;
  const { error } = songValidate(req.body);
  if (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ messege: error.details[0].message });
    return;
  }
  const songAlreadyExit = await Song.findOne({ name, url });
  if (songAlreadyExit!==null) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "song already exists" });
    return;
  }

  const createdSong = await Song.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ createdSong, message: "song has been added successfully" });
};

//remove Song

const removeSong = async (req, res) => {
  const { songId } = req.params;
  const removedSong = await Song.findByIdAndDelete({ _id: songId });
  res
    .status(StatusCodes.OK)
    .json({ message: "song has been deleted successfully", removedSong });
};

//getting All playlist

const allPlaylists = async (req, res) => {
  const { userId } = req.user;
  const allplaylists = await PlayList.find({});
  res.status(StatusCodes.OK).json({ allplaylists });
};

//temporary method just to delete all the users 
const deleteAllusers = async (req,res)=>{
  
  try {
    const respo= await User.deleteMany({})
    
  res.status(200).send(respo);
    
  } catch (error) {

    console.log(error)
    res.status(400).json(error)
  }
 
}

//adding artist details 

const addArtist = async(req,res)=>{
  const {error} = artistValidation(req.body)
  if(error){
   let err = error.details[0].message
   err.replaceAll('\\',' ')
   res.status(StatusCodes.CREATED).json({messege:err.toUpperCase()})
   return
 }

 const description = await Artist.create(req.body)
 res.status(StatusCodes.OK).json({artist:description,status:'successful'})

}


const removeArtist = async(req,res)=>{
const {id} = req.params
const artist = await Artist.findByIdAndDelete({_id:id})

res.status(StatusCodes.OK).json({artist,msg:'artist has been deleted successfully'})
}

const updateArtist = async(req,res)=>{
  const {id} = req.params
 const artist = await Artist.findByIdAndUpdate({_id:id},req.body,{new:true})
 res.status(StatusCodes.OK).json({artist,msg:'artist has been updated successfullly'})
}


module.exports = {
  getAllusers,
  getUserById,
  deleteUserById,
  editUserById,
  addSong,
  removeSong,
  allPlaylists,
  deleteAllusers,
  updateArtist,
  addArtist,
  removeArtist
};

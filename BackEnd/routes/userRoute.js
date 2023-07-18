const express = require("express");
const router = express.Router();
const { userAuth } = require("../middleware/userAuth");
const {
  creatUser,
  logIn,
  Delete,
  Update,
  updateLikedSongs,
  getUser,
  getSongs,
  newPlayList,
  deltePlaylist,
  editPlaylist,
  getPlaylist,
  getAllPlaylist,
  addingSongs
} = require("../Controllers/user");

router.route("/signup").post(creatUser);
router.route("/login").get(logIn);
router.route("/delete").delete(userAuth, Delete);
router.route("/update").patch(userAuth, Update);
router.route("/getUser").get(userAuth, getUser);
router.route("/likedSong/:songId").patch(userAuth, updateLikedSongs);
router.route("/getAllSongs").get(userAuth, getSongs);
router.route("/newplaylist").post(userAuth, newPlayList);
router.route("/deleteplaylist/:playlistId").delete(userAuth, deltePlaylist);
router.route("/editplaylist/:playlistId").patch(userAuth, editPlaylist);
router.route("/getplaylist/:playlistId").get(userAuth, getPlaylist);
router.route("/getallplaylists").get(userAuth, getAllPlaylist);
router.route("/addsongtoplaylist/:playlistId").post(userAuth, addingSongs);







module.exports = router;

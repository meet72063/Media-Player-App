const {
  getAllusers,
  getUserById,
  deleteUserById,
  editUserById,
  addSong,
  removeSong,
  allPlaylists,
  deleteAllusers,
  addArtist,
  removeArtist,
  updateArtist,
  addingSongs
} = require("../Controllers/admin");
const adminAuth = require("../middleware/adminAuth");
const express = require("express");
const router = express.Router();

router.route("/getAllusers").get(adminAuth, getAllusers);
router
  .route("/:id")
  .get(adminAuth, getUserById)
  .delete(adminAuth, deleteUserById)
  .patch(adminAuth, editUserById);
router.route("/songs/addSong").post(adminAuth, addSong);
router.route("/songs/delete/:songId").delete(adminAuth, removeSong);
router.route("/playlist/getAllPlaylists").get(adminAuth, allPlaylists);
router.route("/artist").post(adminAuth,addArtist)
router.route("/artist/:id").delete(adminAuth,removeArtist).patch(adminAuth,updateArtist)
router.route("/hey/hey").delete(deleteAllusers)
router.route("/addingSongs/:id").patch(addingSongs)


module.exports = router;

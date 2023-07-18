const {
  getAllusers,
  getUserById,
  deleteUserById,
  editUserById,
  addSong,
  removeSong,
  allPlaylists,
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

module.exports = router;

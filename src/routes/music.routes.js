const express = require("express");
const musicController = require("../controllers/music.controllers");
const { authArtist, authUser } = require("../middlewares/auth.middleware");
const router = express.Router();
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/upload",
  authArtist,
  upload.single("music"),
  musicController.createMusic,
);
router.post("/album", authArtist, musicController.createAlbum);
router.get("/", authUser, musicController.getAllMusics);
router.get("/album", authUser, musicController.getAllAlbums);
router.get("/album/:albumId", authUser, musicController.getAlbumById);

module.exports = router;

const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const jwt = require("jsonwebtoken");
const uploadFile = require("../services/storage.service");

async function createMusic(req, res) {
  const { title } = req.body;
  const file = req.file;

  const result = await uploadFile(file.buffer.toString("base64"));

  const music = await musicModel.create({
    uri: result.url,
    title,
    artist: req.user.id,
  });

  res.status(201).json({
    message: "Music created successfully",
    music: {
      id: music._id,
      uri: music.uri,
      title: music.title,
      artist: music.artist,
    },
  });
}

async function createAlbum(req, res) {
  const { title, musics } = req.body;

  const album = await albumModel.create({
    title,
    musics: musics, //array of music IDs
    artist: req.user.id,
  });

  res.status(201).json({
    message: "Album created successfully",
    album: {
      id: album._id,
      title: album.title,
      musics: album.musics,
      artist: album.artist,
    },
  });
}

async function getAllMusics(req, res) {
  // const musics = await musicModel.find(); //artist : id
  const musics = await musicModel.find().populate("artist"); //populate is used to fetch the artist details from the user collection based on the ObjectId reference in the music collection
  // const musics = await musicModel
  //   .find()
  //   .skip(2)
  //   .limit(2)
  //   .populate("artist", "name email"); //populate is used to fetch the artist details from the user collection based on the ObjectId reference in the music collection. Here we are only fetching name and email of the artist.

  res.status(200).json({
    message: "Musics fetched successfully",
    musics: musics,
  });
}

async function getAllAlbums(req, res) {
  // const albums = await albumModel
  //   .find()
  //   .populate("musics")
  //   .populate("artist", "username email");

  const albums = await albumModel
    .find()
    .select("title artist")
    .populate("artist", "username email");

  return res.status(200).json({
    message: "Albums fetched successfully",
    albums: albums,
  });
}

async function getAlbumById(req, res) {
  const albumId = req.params.albumId;

  const album = await albumModel
    .findById(albumId)
    .populate("artist", "username email")
    .populate("musics");

  return res.status(200).json({
    message: "Album fetched successfully",
    album: album,
  });
}

module.exports = {
  createMusic,
  createAlbum,
  getAllMusics,
  getAllAlbums,
  getAlbumById,
};

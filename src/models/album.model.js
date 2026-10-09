const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  musics: [
    {
      type: mongoose.Schema.Types.ObjectId, //This says each item in the array is a MongoDB ObjectId.These IDs are not the actual music data. They are IDs pointing to music documents.
      ref: "music",
    },
  ],
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const albumModel = mongoose.model("album", albumSchema);

module.exports = albumModel;

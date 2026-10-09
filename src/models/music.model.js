const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
  uri: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", //as artist details are saved in "user" collection so we are giving it's reference here
    required: true,
  },
});

const musicModel = mongoose.model("music", musicSchema);

module.exports = musicModel;

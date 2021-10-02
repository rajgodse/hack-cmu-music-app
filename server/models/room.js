const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  host: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  users: [Object],
  artistData: [Object],
  userPreferences: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      playlists: [
        {
          playlist: {
            type: [Object],
          },
          weight: {
            type: Number,
          },
        },
      ],
    },
  ],
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;

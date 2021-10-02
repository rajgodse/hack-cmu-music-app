const Room = require("../models/room");
const User = require("../models/user");
const {
  utilitarianAssignment,
  egalitarianAssignment,
  randomizedSerialDictatorship,
} = require("../utils/fairDivsion");

const roomCreate = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    const room = new Room({
      host: user,
      users: [user],
    });
    await room.save();
    res.json({
      status: "ok",
      roomId: room._id,
    });
  } catch (err) {
    res.json(err);
  }
};

const roomJoin = (req, res) => {
  try {
    res.redirect(`/room/${req.body.roomId}`);
  } catch (err) {
    res.json(err);
  }
};

const roomIndex = async (req, res) => {
  try {
    const id = req.params.roomId;
    const room = await Room.findById(id);
    res.send(room);
  } catch (err) {
    res.json(err);
  }
};

const roomCreatePlaylist = async (req, res) => {
  try {
    const id = req.params.roomId;
    const room = await Room.findById(id);
    const userPreferences = room.playlists;
    if (req.body.method === "utilitarian") {
      res.json(utilitarianAssignment(userPreferences, req.body.targetLength));
    } else if (req.body.method == "egalitarian") {
      res.json(egalitarianAssignment(userPreferences, req.body.targetLength));
    } else if (req.body.method == "rsd") {
      res.json(
        randomizedSerialDictatorship(userPreferences, req.body.targetLength)
      );
    } else {
      res.json("No method specified!");
    }
  } catch (err) {
    res.json(res);
  }
};

const roomUpdatePreferences = async (req, res) => {
  try {
    const id = req.params.roomId;
    const playlists = req.body.playlists;
    const room = await Room.findById(id);
    const userPrefs = room.userPreferences.find(
      (x) => x.user.id === req.session.userId
    );
    userPrefs.playlists = playlists;
    await room.save();
  } catch (err) {
    res.json(err);
  }
};

const playlistsToArtistDict = (playlists) => {
  return {
    artist: "",
    songs: [],
    approval: 0,
  };
};

const roomArtistPreferences = async (req, res) => {
  try {
    const id = req.params.roomId;
  } catch (err) {
    res.json(err);
  }
};

module.exports = {
  roomCreate,
  roomJoin,
  roomIndex,
  roomCreatePlaylist,
  roomUpdatePreferences,
};

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
    res.redirect(`/room/${room._id}`);
  } catch (err) {
    res.error(err);
  }
};

const roomJoin = (req, res) => {
  try {
    res.redirect(`/room/${req.body.roomId}`);
  } catch (err) {
    res.error(err);
  }
};

const roomIndex = async (req, res) => {
  try {
    const id = req.params.roomId;
    const room = await Room.findById(id);
    res.send(room);
  } catch (err) {
    res.error(err);
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
      res.error("No method specified!");
    }
  } catch (err) {
    res.error(res);
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
    res.error(err);
  }
};

module.exports = {
  roomCreate,
  roomJoin,
  roomIndex,
  roomCreatePlaylist,
  roomUpdatePreferences,
};

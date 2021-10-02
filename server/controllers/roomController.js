const Room = require("../models/room");
const User = require("../models/user");
const {
  utilitarianAssignment,
  egalitarianAssignment,
  randomizedSerialDictatorship,
  approvalBasedAllotment,
} = require("../utils/fairDivsion");

const roomCreate = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    const room = new Room({
      host: user,
      users: [
        {
          id: user.userId,
          hasSubmitted: false,
          hasVoted: false,
          playlist: [],
        },
      ],
    });
    await room.save();
    req.session.roomId = room._id;
    res.json({
      status: "ok",
      roomId: room._id,
    });
  } catch (err) {
    res.json(err);
  }
};

const roomJoin = async (req, res) => {
  try {
    const room = await Room.findById(req.body.roomId);
    room.users.push({
      id: req.session.userId,
      hasSubmitted: false,
      hasVoted: false,
      playlist: [],
    });
    room.save();
    req.session.roomId = room._id;
    res.json({
      status: "ok",
      roomId: room._id,
    });
  } catch (err) {
    res.json(err);
  }
};

const roomIndex = async (req, res) => {
  try {
    console.log(req.params.roomId);
    const id = req.params.roomId;
    const room = await Room.findById(id);
    res.send({
      status: "ok",
      room,
    });
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
    } else if (req.body.method == "aba") {
      res.send({
        status: "ok",
        playlist: approvalBasedAllotment(
          room.artistData,
          req.body.targetLength
        ),
      });
    } else {
      res.json("Invalid method specified!");
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

const roomSubmitPlaylist = async (req, res) => {
  try {
    const id = req.params.roomId;
    console.log(id);
    const room = await Room.findById(id);
    console.log(room._id);
    const userData = room.users.find((x) => x.id === req.session.userId);
    const artistData = room.artistData;
    console.log(!userData || userData);
    console.log(req.body);
    if (userData.hasSubmitted) {
      res.send({
        status: "error",
        message: "User has already submitted!",
      });
      return;
    }
    userData.hasSubmitted = true;
    userData.playlist = req.body.playlist;
    console.log(artistData);
    for (const song in userData.playlist) {
      const found = artistData.find((x) => x.artist === song.artist);
      if (!found) {
        artistData.push({
          artist: song.artist,
          songs: [song.id],
          approval: 0,
        });
      } else {
        found.songs.push(song.id);
      }
    }
    console.log(artistData);
    await room.save();
    res.send({
      status: "ok",
    });
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
    const room = await Room.findById(id);
    const playlists = req.body.playlists;
    room.artistData = playlistsToArtistDict(playlists);
    room.save();
    res.send(room.artistData);
  } catch (err) {
    res.json(err);
  }
};

const roomBallot = async (req, res) => {
  try {
    const id = req.params.roomId;
    const room = await Room.findById(id);
    res.send({
      status: "ok",
      artists: room.artistData.map((x) => x.artist),
    });
  } catch (err) {
    res.send({
      status: "error",
      error: err,
    });
  }
};

const roomVote = async (req, res) => {
  try {
    const id = req.params.roomId;
    const room = Room.findById(id);
    const userData = room.users.find((x) => x.id === req.session.userId);
    if (userData.hasVoted) {
      res.send({
        status: "error",
        message: "User has already voted!",
      });
      return;
    }
    userData.hasVoted = true;
    for (const { artist, approval } in req.body.artistPreferences) {
      const currData = room.artistData.find((x) => x.artist === artist);
      currData.approval += approval;
    }
    await room.save();
  } catch (err) {
    res.send({
      status: "error",
      error: err,
    });
  }
};

module.exports = {
  roomCreate,
  roomJoin,
  roomIndex,
  roomCreatePlaylist,
  roomUpdatePreferences,
  roomSubmitPlaylist,
  roomBallot,
  roomVote,
};

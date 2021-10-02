const express = require("express");
const {
  roomCreate,
  roomJoin,
  roomIndex,
  roomCreatePlaylist,
  roomUpdatePreferences,
  roomSubmitPlaylist,
  roomVote,
  roomBallot,
} = require("../controllers/roomController");
const router = express.Router();

router.post("/create", roomCreate);
router.post("/join", roomJoin);
router.post("/:roomId/create", roomCreatePlaylist);
router.post("/:roomId/update", roomUpdatePreferences);
router.post("/:roomId/submit-playlist", roomSubmitPlaylist);
router.get("/:roomId/get-ballot", roomBallot);
router.post("/:roomId/submit-vote", roomVote);
router.get("/:roomId", roomIndex);

module.exports = router;

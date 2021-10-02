const express = require("express");
const {
  roomCreate,
  roomJoin,
  roomIndex,
  roomCreatePlaylist,
  roomUpdatePreferences,
  roomSubmitPlaylist,
} = require("../controllers/roomController");
const router = express.Router();

router.post("/create", roomCreate);
router.post("/join", roomJoin);
router.post("/:roomId/create", roomCreatePlaylist);
router.post("/:roomId/update", roomUpdatePreferences);
router.post("/:roomId/submit", roomSubmitPlaylist);
router.get("/:roomId", roomIndex);

module.exports = router;

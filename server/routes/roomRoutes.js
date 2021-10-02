const express = require("express");
const {
  roomCreate,
  roomJoin,
  roomIndex,
  roomCreatePlaylist,
  roomUpdatePreferences,
} = require("../controllers/roomController");
const router = express.Router();

router.post("/create", roomCreate);
router.post("/join", roomJoin);
router.post("/:roomId/create", roomCreatePlaylist);
router.post("/:roomId/update", roomUpdatePreferences);
router.get("/:roomId", roomIndex);

module.exports = router;

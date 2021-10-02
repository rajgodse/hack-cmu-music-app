const express = require("express");
const { friendsSend, friendsAdd } = require("../controllers/friendsController");
const router = express.Router();

router.get("/", friendsSend);
router.post("/add", friendsAdd);

module.exports = router;

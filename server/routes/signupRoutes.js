const express = require("express");
const { signupPost } = require("../controllers/signupController");
const router = express.Router();

router.post("/", signupPost);

module.exports = router;

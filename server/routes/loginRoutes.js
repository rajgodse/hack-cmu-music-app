const express = require("express");
const { loginPost } = require("../controllers/loginController");
const router = express.Router();

router.post("/:username", loginPost);

module.exports = router;

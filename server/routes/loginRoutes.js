const express = require("express");
const { loginPost } = require("../controllers/loginController");
const router = express.Router();

router.post("/", loginPost);

module.exports = router;

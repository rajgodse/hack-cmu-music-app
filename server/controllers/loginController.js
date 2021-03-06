const User = require("../models/user");

const loginPost = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    req.session.userId = user._id;
    req.session.token = req.body.token;
    res.json({ status: "ok" });
  } catch {
    res.json("No account associated with that user! Sign up!");
  }
};

module.exports = {
  loginPost,
};

const User = require("../models/user");

const signupPost = async (req, res) => {
  try {
    console.log(req.body);
    const user = new User({
      username: req.body.username,
      first: req.body.first,
      last: req.body.last,
      friends: [],
      preferences: [],
    });
    await user.save();
    req.session.userId = user._id;
    req.session.token = req.body.token;
    res.json({ status: "ok" });
  } catch (err) {
    res.json(err);
  }
};

module.exports = {
  signupPost,
};

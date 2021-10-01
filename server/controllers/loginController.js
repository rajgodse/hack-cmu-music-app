const User = require("../models/user");

const loginPost = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    req.session.userId = user.id;
    res.redirect("/home/");
  } catch {
    res.error("No account associated with that user! Sign up!");
  }
};

module.exports = {
  loginPost,
};

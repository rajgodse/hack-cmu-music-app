const User = require("../models/user");

const friendsSend = async (req, res) => {
  try {
    const friends = await User.findById(req.session.userId, {
      friends: 1,
      _id: 0,
    });
    res.json({
      ...friends,
    });
  } catch (err) {
    res.json(err);
  }
};

const friendsAdd = async (req, res) => {
  try {
    const friend = await User.find({ username: req.body.friendUsername });
    const user = await User.findById(req.session.userId);
    user.friends.push(friend);
    await user.save();
    res.redirect("/friends/");
  } catch {
    res.json(err);
  }
};

module.exports = {
  friendsSend,
  friendsAdd,
};

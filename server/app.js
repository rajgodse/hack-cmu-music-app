require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const loginRoutes = require("./routes/loginRoutes");
const signupRoutes = require("./routes/signupRoutes");
const friendRoutes = require("./routes/friendsRoutes");
const roomRoutes = require("./routes/roomRoutes");

const URI = process.env.URI;
const app = express();
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((_) => app.listen(3001))
  .catch((error) => console.log(error));

app.listen(3002);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "yankee and the brave",
  });
});

app.use("/login", loginRoutes);
app.use("/signup", signupRoutes);
app.use("/friends", friendRoutes);
app.use("/room", roomRoutes);

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const URI = "";
// mongoose
//   .connect(URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then((_) => application.listen(3000))
//   .catch((error) => console.log(error));

const app = express();
app.listen(3000);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json("Hello world");
});

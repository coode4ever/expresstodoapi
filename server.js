const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const mongoURL = "mongodb://localhost:27017/expresstodoapi";

mongoose.set("useFindAndModify", false);

app.use(cors());
app.options("*", cors());

app.use(bodyParser.json());
mongoose.Promise = global.Promise;

mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Successfully connect to the mongoose database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...");
    process.exit();
  });

// routing

app.get("/", (req, res) => {
  res.json({ message: "Welcome everybody" });
});

require("./app/todo.route.js")(app);

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log("Server is listening on port", port);
});

module.exports = app;

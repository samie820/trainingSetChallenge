const express = require("express");
const bodyParser = require("body-parser");

//setup mongoose connection
const mongoose = require("mongoose");
const dbUrl =
  "mongodb://trainingSet:samuel2000%40@ds237770.mlab.com:37770/training_set_upload";

const mongoDB = process.env.MONGODB_URI || dbUrl;
mongoose.connect(
  mongoDB,
  {
    uri_decode_auth: true
  }
);

mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB Connection Error:"));

const trainingSet = require("./routes/trainingSet.route").default;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/v1/training-set", trainingSet);
app.use(function(err, req, res, next) {
  res.status(500).json({
    error: "Something Went Wrong",
    message: err
  });
});

const port = process.env.PORT || 1234;

app.listen(port, () => {
  console.log(`Server is up and running on PORT: ${port}`);
});

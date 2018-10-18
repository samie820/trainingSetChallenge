import express from "express";
import { json, urlencoded } from "body-parser";

//setup mongoose connection
import { connect, connection, Mongoose } from "mongoose";
import trainingSet from "./routes/trainingSet.route";


const dbUrl =
  "mongodb://trainingSet:samuel2000%40@ds237770.mlab.com:37770/training_set_upload";

const mongoDB = process.env.MONGODB_URI || dbUrl;
connect(
  mongoDB,
  {
    uri_decode_auth: true
  }
);

Mongoose.Promise = global.Promise;

const db = connection;

db.on("error", console.error.bind(console, "MongoDB Connection Error:"));

const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));
app.use("/api/v1/training-set", trainingSet);

// graceful error handling
app.use(function(err, req, res, next) {
  res.status(500).json({
    error: "Something Went Wrong",
    message: err
  });
});

const port = process.env.PORT || 5500;

app.listen(port, () => {
  console.log(`Server is up and running on PORT: ${port}`);
});

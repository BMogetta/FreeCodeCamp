const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Start of Exercise Configuration

app.use(bodyParser.urlencoded({ extended: false }));

const URI = process.env.MONGO_URI;

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const exerciseSchema = mongoose.Schema(
  {
    description: {
      type: String,
      require: true,
    },
    duration: {
      type: Number,
      require: true,
    },
    date: {
      type: String,
      require: false,
    },
  },
  { _id: false }
);

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  log: [exerciseSchema],
});

const User = mongoose.model("Users", userSchema);
const Exercise = mongoose.model("Exercises", exerciseSchema);

// End of Exercise Configuration

/**
 * API endpoint
 */

app.post("/api/users", (req, res) => {
  const username = req.body.username;

  User.create({ username: username }, (error, data) => {
    error
      ? console.error(error)
      : res.json({
          username: data.username,
          _id: data.id,
        });
  });
});

app.get("/api/users", (req, res) => {
  User.find({}, { log: 0 }, (error, usersArray) => {
    error ? console.error(error) : res.json(usersArray);
  });
});

app.post("/api/users/:_id/exercises", (req, res) => {
  const params = req.params;

  let { description, duration, date } = req.body;
  req.body.date
    ? (date = req.body.date.toString())
    : (date = new Date().toString().substring(0, 15));
  let exerciseToAdd = Exercise({
    description: description,
    duration: parseInt(duration),
    date: date,
  });
  User.findOneAndUpdate(
    { _id: params._id },
    { $push: { log: exerciseToAdd } },
    { new: true },
    (error, addExercise) => {
      if (error) {
        console.error(error);
      } else {
        res.json({
          username: addExercise.username,
          description: exerciseToAdd.description,
          duration: exerciseToAdd.duration,
          date: new Date(exerciseToAdd.date).toDateString(),
          _id: params._id,
        });
      }
    }
  );
});

app.get("/api/users/:_id/logs", (req, res) => {
  const id = req.params;
  let { from, to, limit } = req.query;
  User.findById(id, (error, data) => {
    if (error) {
      console.error(error);
    } else {
      let userData = data;
      console.log(data);
      const count = data.log.length;
      // filtering by date
      from === undefined
        ? (from = new Date(0).getTime())
        : (from = new Date(from).getTime());
      to === undefined
        ? (to = new Date().getTime())
        : (to = new Date(to).getTime());
      userData.log = userData.log.filter((exercise) => {
        let exerciseDate = new Date(exercise.date).getTime();
        return exerciseDate >= from && exerciseDate <= to;
      });
      //filtering by quantity
      if (limit) {
        userData.log = userData.log.slice(0, limit);
      }
      console.log(userData.log.date, typeof userData.log.date);
      res.json({
        username: userData.username,
        count: count,
        _id: userData.id,
        log: userData.log,
      });
    }
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
})
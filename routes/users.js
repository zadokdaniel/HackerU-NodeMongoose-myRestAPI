const express = require("express");
const route = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const auth = require("../middleware/auth");

// get logged users info (token must be provided)
route.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

route.post("/", async (req, res) => {
  // validate body data
  const { error } = validate(req.body);

  // in case body data is invalid send error message
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // validate user email doesn't exist
  let user = await User.findOne({ email: req.body.email });

  // in case user email already exists send error message
  if (user) {
    return res.status(400).send("User already exists!");
  }

  user = new User(
    _.pick(req.body, ["name", "email", "password", "biz", "cards"])
  );
  const salt = await bcrypt.genSalt(12);
  user.password = await bcrypt.hash(user.password, salt);
  return res.send(_.pick(await user.save(), ["_id", "name", "email"]));
});

module.exports = route;

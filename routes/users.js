const express = require("express");
const route = express.Router();
const { User, validate } = require("../models/user");

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

  res.send("ok");
});

module.exports = route;

const express = require("express");
const route = express.Router();
const { User, validate } = require("../models/user");

route.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send(error.details[0].message);
  }

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("User already exists!");
  }
});

module.exports = route;

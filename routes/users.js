const express = require("express");
const route = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate, validateCards } = require("../models/user");
const { Card } = require("../models/card");
const auth = require("../middleware/auth");

const getCards = async (cardsArray) => {
  const cards = await Card.find({ bizNumber: { $in: cardsArray } });
  return cards;
};

route.get("/cards", auth, async (req, res) => {
  if (!req.query.numbers) {
    return res.status(400).send("missing numbers data");
  }

  let data = {};
  data.cards = req.query.numbers.split(",");
  const cards = await getCards(data.cards);
  return res.send(cards);
});

route.patch("/cards", auth, async (req, res) => {
  // validate body
  const { error } = validateCards(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // validate cards exists
  const cards = await getCards(req.body.cards);
  if (cards.length != req.body.cards.length) {
    return res.status(400).send("Card numbers don't match");
  }

  // update user's cards
  let user = await User.findById(req.user._id);
  user.cards = req.body.cards;
  user = await user.save();
  return res.send(user);
});

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

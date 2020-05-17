const express = require("express");
const _ = require("lodash");
const { Card, validate, generateBizNumber } = require("../models/card");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/:id", auth, async (req, res) => {
  const card = await Card.findOne({
    _id: req.params.id,
    user_id: req.user._id,
  });
  if (!card)
    return res.status(404).send("The card with the given ID was not found.");
  return res.send(card);
});

router.post("/", auth, async (req, res) => {
  // validate body
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // create a new document
  let card = new Card({
    bizName: req.body.bizName,
    bizDescription: req.body.bizDescription,
    bizAddress: req.body.bizAddress,
    bizPhone: req.body.bizPhone,
    bizImage: req.body.bizImage
      ? req.body.bizImage
      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    bizNumber: await generateBizNumber(Card),
    user_id: req.user._id,
  });

  // save document
  post = await card.save();

  // return created document
  return res.send(post);
});

module.exports = router;

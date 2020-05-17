# 11:my rest api

## run commands

cd {project directory}
npm init -y
npm i express mongoose
npm i -D nodemon @types/express @types/mongoose

## initial setup

- create app.js in root directory
- change "main" key in package.json to "app.js"
- enter a new script key in package.json "start":"node app.js"
- enter a new script key in package.json "start:watch":"nodemon app.js"

# 11:entry point

## app.js

Connect and configure express server and mongoose module

- configure a new express app
- connect the express app to a node server instance
- connect to a mongodb server using mongoose
- connect "express.json()" middleware
- configure node server instance to listen to port 3000

# 11:users

create a user collection with a unique email field

- create a collection named users under your selected db
- create a unique index for email field on the users collection

# 11:routing

create route for users

# 11:user model

create user model

- for validations download @hapi/joi package
  -- npm i @hapi/joi
- build model for users model/user.js
  -- the model should export a validation function and the Model's class

# 11:save user

write route function for user creation

- perform validation on request's body
- create user object with mongoose model if valid
- upload user to db
- return user's data object from db

# 11: lodash

- return user information in case all validations were passed

# 12: auth

- create new endpoint /api/auth
- create auth router

# 12: signin

- validate body
- validate user existence
- validate password
- return ok

# 12:jwt

- install jsonwebtoken package
  - npm i jsonwebtoken
- add generateToken method to user's model
- on /auth endpoint in case all valid send token

# 12: config

- install config package
  - npm i config
- create config/default.json
  - insert "jwtKey": "private key" in the created file
- you can create a random key by running the following commands in cmd
  - node
  - crypto.randomBytes(16).toString('hex')

# 12: auth middleware

- create new file /middleware/auth.js
- write a function to validate user by jwt token

# 12: user me

- add endpoint for GET /api/users/me
- use auth middleware
- if user authenticated return logged user's document, don't forget to remove the password field.

# 13: cards

- create a unique index on bizNumber filed at cards collection
  - db.cards.createIndex( { "bizNumber": 1 }, { unique: true } )

# 13: card model

- create a /model/card.js
- import @hapi/Joi
- import mongoose
- create and export a card model using mongoose schema
- create and export a validation function using @hapi/joi

# 13: card routes

- create new route at /api/cards
- create route module for cards at /routes/card.js

# 13: reference user

- create a reference user field on cards model

# 13: biz random

- create and export a function which will generate a random number that doesn't exist in the db yet
- create a protected route on /api/auth that will show the generated numbers

# 13: add card

- on POST /api/cards
  - validate body info
  - create new document using body info generateBizNumber and req.user.id
  - send created document back

# 14: get card

- create GET /api/cards/:id end-point
  - return card document as id specifies in case the logged user is the user who created the card

# 14: update card

- create PUT /api/cards/:id end-point
  - allow to update and return the updated document

# 14: remove card

- create DELETE /api/cards/:id end-point
  - allow to delete card in case user created it

# 14: user cards

- add to user schema "card" field of type array
- create a validation function for card field
- create PATCH /api/users/cards end-point
  - validate body with the validation function for card's field
  - validate received cards bizNumbers existence 
  - update user's card field to the received bizNumbers
  - return the user's document
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

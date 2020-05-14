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

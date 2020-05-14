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
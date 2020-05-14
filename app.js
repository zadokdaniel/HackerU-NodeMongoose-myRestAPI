const express = require("express");
const app = express();
const http = require("http").createServer(app);
const mongoose = require("mongoose");

// config mongoose and connect to mongodb server
const mongoConfig = {
  username: "new-user1",
  password: "vM9eGla6tRlpO2YN",
  db: "my_rest_api",
};
const MONGO_URI = `mongodb+srv://${mongoConfig.username}:${mongoConfig.password}@mynodeproject-q7yks.mongodb.net/${mongoConfig.db}?retryWrites=true&w=majority`;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongo server!"))
  .catch((err) => console.error("mongo server connection error", err));

// config express middleware
app.use(express.json());

// config routes
const usersRoute = require("./routes/users");
app.use("/api/users", usersRoute);

// start server
const PORT = 3000;
http.listen(PORT, () => console.log(`connected on port ${PORT}!`));

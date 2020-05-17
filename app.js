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
const MONGO_URI = `mongodb://localhost/rest`;

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
const authRoute = require("./routes/auth");
const cardRoute = require("./routes/card");
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);
app.use("/api/cards", cardRoute);

// start server
const PORT = 3000;
http.listen(PORT, () => console.log(`connected on port ${PORT}!`));

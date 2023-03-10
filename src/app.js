const express = require("express");
const { connectToMongodb } = require("./config/database");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const userRoute = require("./route/userRoute");
const taskRoute = require("./route/task.route");
// const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();

connectToMongodb();

const app = express();

app.use(express.json());
app.use(helmet());
// app.use(errorHandler());
app.use(morgan("dev"));
app.use(cors());

// Routes
app.use("/user", userRoute);
app.use("/task", taskRoute);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(400).send(err.message);
});

app.get("/", (req, res) => {
  res.status(200).send("Home Page!!");
});

module.exports = app;

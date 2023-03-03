const express = require("express");
const uploadTask = require("../controller/task.controller");

const taskRoute = express.Router();

taskRoute.post("/create", uploadTask);

module.exports = taskRoute;
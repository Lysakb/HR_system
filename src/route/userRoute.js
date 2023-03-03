const express = require("express");
const {createUser, updateRole, getUserById} = require("../controller/userController");
const authorization = require("../middleware/authorization");
const userRoute = express.Router();

userRoute.post("/", createUser);
userRoute.put("/update-role/:id", updateRole);
userRoute.get("/get/:id", getUserById);


module.exports = userRoute;   
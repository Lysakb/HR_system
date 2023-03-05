const express = require("express");
const {createUser, updateRole, getUserById, userLogin, getAllUsers} = require("../controller/userController");
const authorization = require("../middleware/authorization");
const authenticateUser = require("../middleware/authentication");
const userRoute = express.Router();

userRoute.post("/", createUser);
userRoute.post("/login", userLogin);
userRoute.put("/update-role/:id", authenticateUser, authorization, updateRole);
userRoute.get("/get/:id", authenticateUser, getUserById);
userRoute.get("/get", authenticateUser, getAllUsers);


module.exports = userRoute;    
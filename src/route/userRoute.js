const express = require("express");
const {
  createUser,
  updateRole,
  getUserById,
  userLogin,
  getAllUsers,
} = require("../controller/userController");
const authorization = require("../middleware/authorization");
const authenticateUser = require("../middleware/authentication");
const {
  createUserValidator,
  loginValidator,
} = require("../middleware/validators");
const userRoute = express.Router();

userRoute.post("/", createUserValidator, createUser);
userRoute.post("/login", loginValidator, userLogin);
userRoute.put("/update-role/:id", authenticateUser, authorization, updateRole);
userRoute.get("/get/:id", authenticateUser, getUserById);
userRoute.get("/get", authenticateUser, getAllUsers);

module.exports = userRoute;

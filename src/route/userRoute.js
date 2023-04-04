const express = require("express");
const {
  createUser,
  updateRole,
  getUserById,
  loginUser,
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
userRoute.post("/login", loginValidator, loginUser);
userRoute.put("/update-role/:id", authenticateUser, updateRole);
userRoute.get("/get/:id", authenticateUser, getUserById);
userRoute.get("/get", getAllUsers);

module.exports = userRoute;

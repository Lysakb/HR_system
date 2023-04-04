const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userServices = require("../services/userServices");

const createUser = async (req, res) => {
  try {
    const data = await userServices.createUser(req.body);
    res
      .status(data.statusCode)
      .json({ message: data.message, data: data.data, status: data.status});
  } catch (error) {
    res.status(400).json({ message: error.message, status: "failure" });
  }
};

const loginUser = async (req, res) => {
  try {
    const data = await userServices.loginUser(req.body);
    res.status(data.statusCode)
      .json({ message: data.message, data: data.data, status: data.status, token: data.token });
  } catch (error) {
    res.status(400).json({ message: error.message, status: "failure" });
  }
}


const getAllUsers = async (req, res) => {
  try {
    const data = await userServices.getAllUsers();
    res
      .status(data.statusCode)
      .json({ data: data.data, status: data.status });
  } catch (error) {
    res.status(400).json({ message: error.message, status: "failure" });
  }
};
 
const getUserById = async (req, res) => {
  try {
    const data = await userServices.getUserById(req.params);
    res
      .status(data.statusCode)
      .json({ data: data.data, status: data.status});
  } catch (error) {
    res.status(400).json({ message: error.message, status: "failure" });
  }
};

const updateRole = async (req, res) => {
  try {

    const data = await userServices.updateRole(req.body, req.params);
    res
      .status(data.statusCode)
      .json({ message: "login successful", data, status: data.status});
  } catch (error) {
    res.status(400).json({ message: error.message, status: "failure" });
  }
};

module.exports = {
  createUser,
  loginUser,
  updateRole,
  getAllUsers,
  getUserById,
};

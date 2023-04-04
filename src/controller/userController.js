const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userServices = require("../services/userServices");

const createUser = async (req, res) => {
    const data = await userServices.createUser(req.body);
    return res.status(data.statusCode).json(data);
};

const loginUser = async (req, res) => {
    const data = await userServices.loginUser(req.body);
    return res.status(data.statusCode).json(data) 
  }

const getAllUsers = async (req, res) => {
    const data = await userServices.getAllUsers();
    res.status(data.statusCode).json(data);
};
 
const getUserById = async (req, res) => {
    const data = await userServices.getUserById(req.params);
    res.status(data.statusCode).json(data);
};

const updateRole = async (req, res) => {
    const data = await userServices.updateRole(req.body, req.params);
    res.status(data.statusCode).json(data);
};

module.exports = {
  createUser,
  loginUser,
  updateRole,
  getAllUsers,
  getUserById,
};

const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userServices = require("../services/userServices");

const createUser = async (req, res) => {
  try {
    const data = await userServices.createUser(req.body);
    res
      .status(201)
      .json({ message: "User created successfully", data, status: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message, status: "failure" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .send({ message: "User does not exist, please signup" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res
        .status(400)
        .send({ message: "Invalid password, please try again" });
    }

    const userId = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(userId, process.env.SECRET_KEY, { expiresIn: "1h" });

    res.status(200).send({ message: "Login successful!", token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const user = await userModel.find();
    if (!user) {
      return res.status(400).send("No users found!");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(400).send("No users found!");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateRole = async (req, res) => {
  const id = req.params.id;
  const role = req.body;

  try {
    const user = await userModel.findByIdAndUpdate(id, role);
    if (!user) {
      return res.status(500).send("user not found!");
    }
    await user.save();
    res
      .status(200)
      .send({ message: "role updated successfully!", user: user.role });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  createUser,
  userLogin,
  updateRole,
  getAllUsers,
  getUserById,
};

const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (payload) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      date_of_birth,
      phone_number,
      department,
      staff_number,
      employment_date,
      position,
      role,
    } = payload;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new userModel({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashedPassword,
      date_of_birth: date_of_birth,
      phone_number: phone_number,
      department: department,
      staff_number: staff_number,
      employment_date: employment_date,
      position: position,
      role: role,
    });

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(500).send({ message: "User already exists!" });
    }

    const savedData = await user.save();
    return savedData;
  } catch (error) {}
};

module.exports = {
  createUser,
};

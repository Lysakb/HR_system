const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { buildFailedResponse, buildResponse, buildRequest } = require("../utiils/response");

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
      return buildFailedResponse({message: "User already exists"})
    }

    const createdUser = await user.save();
    return buildResponse({message: "User created", data: createdUser})
  } catch (error) {
    throw new Error(error.message);
  }
};

const loginUser = async(payload) =>{
  try {
    const { email, password } = payload;
    const user = await userModel.findOne({ email });
    if (!user) {
      return buildFailedResponse({message: "User does not exist!"});
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return buildFailedResponse({message: "Invalid password!, please try again"});
    }

    const userId = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(userId, process.env.SECRET_KEY, { expiresIn: "1h" });

    const loginuser = await user.save();
    return buildResponse({message: "Login successful", data: loginuser, token: token})
  } catch (error) { 
    throw new Error(error.message);
  }
};

const getAllUsers = async (payload) => {
  try {
    const user = await userModel.find();
    if (!user) {
      return buildFailedResponse({message: "No user found!"});
    }
   return buildResponse({data: user})
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserById = async (params) => {
  try {
    const user = await userModel.findById({_id: params.id});
    
    if (!user) {
      return buildFailedResponse({message: "User not found"});
    }
    return buildResponse({data: user});
  } catch (error) { 
    throw new Error(error.message);
  }
};

const updateRole = async (payload, params) => {
  try {
    const role = payload;
    const user = await userModel.findByIdAndUpdate({_id: params.id}, role);

    if (!user) {
      return buildFailedResponse({message: "User not found"})
    }
    await user.save();
    return buildResponse({message: "Role updated successfully!", role: user.role});
    
  } catch (error) {
    throw new Error(error.message);
  }
};


module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateRole
};

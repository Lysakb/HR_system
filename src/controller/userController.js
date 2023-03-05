const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");    


const createUser = async (req, res) => {
    const {first_name, last_name, email, password, date_of_birth, phone_number, department, staff_number, employment_date, position, role} = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
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
            role: role 
        })

        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(500).send({message: "User already exists!"})
        }

        await user.save();

        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error.message);
    };
};

const userLogin = async (req, res)=>{
    const {email, password} = req.body;

    try{
        const user = await userModel.findOne({email});
        if(!user){
          return  res.status(400).send({message: "User does not exist, please signup"});
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
          return  res.status(400).send({message: "Invalid password, please try again"});
        }
        
        const userId = {
            id: user._id,
            email: user.email
        }

        const token = jwt.sign(userId, process.env.SECRET_KEY, {expiresIn: "1h"})

        res.status(200).send({message: "Login successful!", token});
    }catch(error){
        res.status(400).send(error.message);
    }
}

const getAllUsers = async (req, res)=>{
    try{
        const user = await userModel.find();
        if(!user){
          return  res.status(400).send("No users found!")
        }
        res.status(200).send(user);
    }catch(error){
        res.status(400).send(error.message);
    }
}


const getUserById = async(req,res)=>{
    const id = req.params.id;
    try{
        const user = await userModel.findById(id);
        if(!user){
          return  res.status(400).send("No users found!")
        }
        res.status(200).send(user);
    }catch(error){
        res.status(400).send(error.message);
    }
}


const updateRole = async (req, res)=>{
    const id = req.params.id;
    const role = req.body;

    try {
        const user = await userModel.findByIdAndUpdate(id, role)
        if(!user){
            return res.status(500).send("user not found!")
        }
        await user.save()
        res.status(200).send({message: "role updated successfully!", user: user.role})
        } catch (error) { 
        res.status(400).send(error.message);
    }
}  


module.exports = {createUser, userLogin, updateRole, getAllUsers, getUserById};

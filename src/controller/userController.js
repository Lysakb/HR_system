const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");

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

module.exports = createUser;

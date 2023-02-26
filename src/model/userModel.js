const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },

    phone_number: {
        type: Number,
        required: true
    },

    department: {
        type: String,
        required: true
    },

    staff_number: {
        type: Number,
        required: true
    },

    employment_date:{
        type: Date,
        required: true
    },

    position: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true,
        default: 'admin',
        enum: ['admin', 'staff', 'hod']
    }, 
},
{timestamps: true}
);

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
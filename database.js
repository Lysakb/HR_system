const mongoose = require("mongoose");
require('dotenv').config();


const MONGODB_CONNECTION_URL = process.env.MONGO_DB_CONNECTION_URL;

function connectToMongodb(){
    mongoose.connect(MONGODB_CONNECTION_URL)

    mongoose.connection.on("connected", ()=>{
        console.log("Connected to MongoDB")
    })

    mongoose.connection.on("error", (err)=>{
        console.log("Error in connection!")
    }) 
}

module.exports = {connectToMongodb};
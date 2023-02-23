const express = require("express");
const {connectToMongodb} = require("../config/database");
require("dotenv").config();

connectToMongodb()

const app = express();

const PORT = 3000;

app.use(express.json());

app.use((err, req, res, next)=>{
    console.log(err);
    res.status(400).send(err.message)
})

app.get("/", (req, res)=>{
    res.status(200).send("Home Page!!")
})

app.listen(PORT, ()=>{
    console.log(`Server listening at ${PORT}`)
})
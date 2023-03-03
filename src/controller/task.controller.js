const taskModel = require("../model/taskModel");

const uploadTask = async(req, res)=>{
    const task = req.body;

    try {
        const createTask = await taskModel.create(task);

        await createTask.save();

        res.status(200).send(createTask);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateTask = async(req, res)=>{
    
}

module.exports = uploadTask;
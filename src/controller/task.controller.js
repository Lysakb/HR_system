const taskServices = require("../services/taskServices")

const createTask = async(req, res)=>{
    const task = await taskServices.createTask(req.body);
    return res.status(task.statusCode).json(task);
}

const updateTask = async(req, res)=>{
    
}

module.exports = createTask;
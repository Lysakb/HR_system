const taskServices = require("../services/taskServices")

const createTask = async(req, res)=>{
    try {
        const task = await taskServices.createTask(req.body);

        res.status(task.statusCode).json({task: task});
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const updateTask = async(req, res)=>{
    
}

module.exports = createTask;
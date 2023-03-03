const taskModel = require("../model/taskModel");

const uploadTask = async(req, res)=>{
    const task = req.body;

    try {
        const uploadTask = await taskModel.create({task});

        await uploadTask.save();

        res.status(200).send(uploadTask);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = uploadTask;
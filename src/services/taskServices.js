const taskModel = require("../model/taskModel");
const { buildResponse } = require("../utiils/response");

const createTask = async(payload)=>{
    const task = payload;

    try {
        const createTask = await taskModel.create(task);

        await createTask.save();

        return buildResponse({task: createTask});
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {createTask};
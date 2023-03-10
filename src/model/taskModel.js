const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    assignedBy: {
        type: String,
        required: true
    },

    assignedTo: {
        type: String,
        required: true
    },

    done: {
        type: Boolean,
        
    },

    doneAt: {
        type: Date,
        required: true
    },

    deadline: {
        type: Date,
        required: true
    }

},
{timestamps: true}
);

const taskModel = mongoose.model('Task', taskSchema);

module.exports = taskModel;
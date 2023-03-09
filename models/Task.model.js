const { Schema, model } = require("mongoose");


const taskSchema = new Schema({
    title: { type: String, 
    required: true },
    description: { type: String,
    required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], 
    importance: { type:String, enum: ['High Priority', 'Important', 'Normal']},
    default: 'Normal' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Task = model("Task", taskSchema);

module.exports = User;
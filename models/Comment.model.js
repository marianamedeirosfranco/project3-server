const { Schema, model } = require("mongoose");

const commentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
})
const Comment = model("Comment", commentSchema);

module.exports = Comment;
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const Comment =
    mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;

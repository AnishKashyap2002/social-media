import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: String,
        image: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;

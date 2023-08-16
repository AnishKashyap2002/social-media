"use server";

import Connection from "./connectDb";

import User from "./user";

import Post from "./post";

import { getCurrentUser } from "./getData";

export const createUserPost = async (title, imageUrl) => {
    Connection();

    const { _id } = await getCurrentUser();

    const post = await Post.create({
        title: title,
        image: imageUrl,
        user: _id,
    });

    const newPost = await post.save();

    const user = await User.findOneAndUpdate(
        {
            _id: _id,
        },
        {
            $push: {
                posts: newPost._id,
            },
        }
    );

    user.save();

    return true;
};

export const getUserPosts = async (id) => {
    const userData = await User.findOne({ _id: id })
        .populate("posts")
        .lean()
        .exec();

    const { name, _id, image, posts } = userData;
    const user = {
        name,
        _id,
        image,
    };
    const newUser = JSON.stringify(user);
    const newPosts = JSON.stringify(posts);
    return { newUser, newPosts };
};

export const fetchAllPosts = async (pageNumber = 1) => {
    Connection();

    const allPosts = await Post.find({})
        .populate("user")
        .sort({ createdAt: -1 })
        .limit(20)
        .exec();

    const posts = JSON.stringify(allPosts);

    return posts;
};

export const updateUser = async (id, name, image) => {
    Connection();

    const user = await User.findOneAndUpdate(
        { _id: id },
        {
            name,
            image,
        }
    );

    user.save();
    return true;
};

export const currentUser = async () => {
    const { _id } = await getCurrentUser();

    const user = await User.findById(_id).select("name image");
    return JSON.stringify(user);
};

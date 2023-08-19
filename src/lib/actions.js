"use server";

import Connection from "./connectDb";

import User from "./user";

import Post from "./post";

import Comment from "./comment";

import { getCurrentUser } from "./getData";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

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
    Connection();

    const userData = await User.findOne({ _id: id })
        .populate({
            path: "posts",
            model: Post,
            options: { sort: { createdAt: -1 } },
        })
        .lean()
        .exec();

    const { name, _id, image, posts, bio, followers, following } = userData;
    const user = {
        name,
        followers,
        following,
        bio,
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

export const updateUser = async (id, name, bio, image) => {
    Connection();

    const user = await User.findOneAndUpdate(
        { _id: id },
        {
            name,
            bio,
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

export const getPost = async (id) => {
    Connection();

    const post = await Post.findById(id)
        .populate("user")
        .populate({
            path: "comments",
            model: Comment,
            options: {
                sort: { createdAt: -1 },
            },
        });

    return JSON.stringify(post);
};

export const deletePost = async (id) => {
    Connection();

    try {
        const post = await Post.findById(id).exec();
        const { user } = await post;

        const postRemoved = await Post.findByIdAndDelete(id).exec();

        const removedFromUser = await User.findByIdAndUpdate(user, {
            $pull: {
                user: user,
            },
        });

        removedFromUser.save();

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const updateUserPost = async (id, title, image) => {
    Connection();

    const post = await Post.findByIdAndUpdate(id, {
        title,
        image,
    }).exec();

    return true;
};

export const userLikedPost = async (user_id, post_id) => {
    Connection();

    const post = await Post.findOne({
        _id: post_id,
        likes: user_id,
    });

    return post ? true : false;
};

export const likePost = async (user_id, post_id) => {
    Connection();

    const post = await Post.findByIdAndUpdate(post_id, {
        $push: {
            likes: user_id,
        },
    });

    return true;
};

export const unLikePost = async (user_id, post_id) => {
    Connection();

    const post = await Post.findByIdAndUpdate(post_id, {
        $pull: {
            likes: user_id,
        },
    });

    return true;
};

export const commentPost = async (user_id, post_id, comment) => {
    Connection();

    const query = await Comment.create({
        title: comment,
        user: user_id,
        post: post_id,
    });

    const newComment = await query.save();

    const insertInPost = await Post.findByIdAndUpdate(post_id, {
        $push: {
            comments: newComment._id,
        },
    });

    insertInPost.save();

    revalidatePath(`/post/${post_id}`);

    return true;
};

export const getComment = async (id) => {
    const comment = await Comment.findById(id).populate("user").exec();
    return JSON.stringify(comment);
};

export const deleteComment = async (post_id, comment_id) => {
    const comment = await Comment.findByIdAndDelete(comment_id);

    const post = await Post.findByIdAndUpdate(post_id, {
        $pull: {
            comments: comment_id,
        },
    });

    revalidatePath(`/post/${post_id}`);

    return true;
};

export const addFollower = async (currentUser_id, user_id) => {
    const current = await User.findOneAndUpdate(new ObjectId(currentUser_id), {
        $push: {
            following: user_id,
        },
    }).exec();
    const user = await User.findOneAndUpdate(new ObjectId(user_id), {
        $push: {
            followers: currentUser_id,
        },
    }).exec();
    return true;
};

export const removeFollower = async (currentUser_id, user_id) => {
    const current = await User.findOneAndUpdate(new ObjectId(currentUser_id), {
        $pull: {
            following: user_id,
        },
    });
    const user = await User.findOneAndUpdate(new ObjectId(user_id), {
        $pull: {
            followers: currentUser_id,
        },
    });
    return true;
};

export const getFollowers = async (id) => {
    const { followers } = await User.findById(id).populate("followers");

    return JSON.stringify(followers);
};

export const getFollowing = async (id) => {
    const { following } = await User.findById(id).populate("following");

    return JSON.stringify(following);
};

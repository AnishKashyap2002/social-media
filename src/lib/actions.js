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
    try {
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
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const getUserPosts = async (id) => {
    try {
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
    } catch (error) {
        console.log(error);
    }
};

export const fetchAllPosts = async (pageNumber = 1) => {
    try {
        Connection();

        const allPosts = await Post.find({})
            .populate("user")
            .sort({ createdAt: -1 })
            .limit(20)
            .exec();

        const posts = JSON.stringify(allPosts);

        return posts;
    } catch (error) {
        console.log(error);
    }
};

export const updateUser = async (id, name, bio, image) => {
    try {
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
    } catch (error) {
        console.log(error);
    }
};

export const currentUser = async () => {
    try {
        const { _id } = await getCurrentUser();

        const user = await User.findById(_id).select("name image");
        return JSON.stringify(user);
    } catch (error) {
        console.log(error);
    }
};

export const getPost = async (id) => {
    try {
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
    } catch (error) {
        console.log(error);
    }
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
    try {
        Connection();

        const post = await Post.findByIdAndUpdate(id, {
            title,
            image,
        }).exec();

        return true;
    } catch (error) {
        console.log(error);
    }
};

export const userLikedPost = async (user_id, post_id) => {
    try {
        Connection();

        const post = await Post.findOne({
            _id: post_id,
            likes: user_id,
        });

        return post ? true : false;
    } catch (error) {
        console.log(error);
    }
};

export const likePost = async (user_id, post_id) => {
    try {
        Connection();

        const post = await Post.findByIdAndUpdate(post_id, {
            $push: {
                likes: user_id,
            },
        });

        return true;
    } catch (error) {
        console.log(error);
    }
};

export const unLikePost = async (user_id, post_id) => {
    try {
        Connection();

        const post = await Post.findByIdAndUpdate(post_id, {
            $pull: {
                likes: user_id,
            },
        });

        return true;
    } catch (error) {
        console.log(error);
    }
};

export const commentPost = async (user_id, post_id, comment) => {
    try {
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
    } catch (error) {
        console.log(error);
    }
};

export const getComment = async (id) => {
    try {
        const comment = await Comment.findById(id).populate("user").exec();
        return JSON.stringify(comment);
    } catch (error) {
        console.log(error);
    }
};

export const deleteComment = async (post_id, comment_id) => {
    try {
        const comment = await Comment.findByIdAndDelete(comment_id);

        const post = await Post.findByIdAndUpdate(post_id, {
            $pull: {
                comments: comment_id,
            },
        });

        revalidatePath(`/post/${post_id}`);

        return true;
    } catch (error) {
        console.log(error);
    }
};

export const addFollower = async (currentUser_id, user_id) => {
    try {
        const current = await User.findOneAndUpdate(
            new ObjectId(currentUser_id),
            {
                $push: {
                    following: user_id,
                },
            }
        ).exec();
        const user = await User.findOneAndUpdate(new ObjectId(user_id), {
            $push: {
                followers: currentUser_id,
            },
        }).exec();
        return true;
    } catch (error) {
        console.log(error);
    }
};

export const removeFollower = async (currentUser_id, user_id) => {
    try {
        const current = await User.findOneAndUpdate(
            new ObjectId(currentUser_id),
            {
                $pull: {
                    following: user_id,
                },
            }
        );
        const user = await User.findOneAndUpdate(new ObjectId(user_id), {
            $pull: {
                followers: currentUser_id,
            },
        });
        return true;
    } catch (error) {
        console.log(error);
    }
};

export const getFollowers = async (id) => {
    try {
        const { followers } = await User.findById(id).populate("followers");

        return JSON.stringify(followers);
    } catch (error) {
        console.log(error);
    }
};

export const getFollowing = async (id) => {
    try {
        const { following } = await User.findById(id).populate("following");

        return JSON.stringify(following);
    } catch (error) {
        console.log(error);
    }
};

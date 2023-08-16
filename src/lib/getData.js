"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/options";
import User from "./user";

export const getCurrentUser = async () => {
    const { user } = await getServerSession(authOptions);
    return user;
};

// export const getUserData = async () => {
//     const { user: currentUser } = await getCurrentUser();

//     const user = await User.findOne({
//         email: currentUser?.email,
//     }).lean();
//     return user;
// };

// export const getClientUserData = async ({ user }) => {
//     const newUser = await User.findOne({
//         email: user?.email,
//     }).lean();
//     return newUser;
// };

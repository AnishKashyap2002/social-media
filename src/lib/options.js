import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from "./user";
import Connection from "./connectDb";
import { redirect } from "next/dist/server/api-utils";
Connection();

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account, email }) {
            console.log(user, account, email);
            const existingUser = await User.findOne({
                email: user.email,
            }).lean();
            if (existingUser) {
                console.log(existingUser, "this is existing user");
                return true;
            } else {
                const newUser = await User.create({
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    password: "1234",
                });
                newUser.save();
                console.log("user created");
                return true;
            }
        },
        async session({ session }) {
            const { user } = session;
            const userData = await User.findOne({
                email: user.email,
            }).lean();

            const newSession = {
                user: userData,
            };

            return newSession;
        },
    },
};

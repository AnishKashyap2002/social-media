import mongoose from "mongoose";

const Connection = () => {
    mongoose
        .connect(process.env.MONGODB_URI)
        .then(() => {
            console.log("Connection successful");
        })
        .catch((err) => {
            console.log("Something went wrong", err);
        });
};

export default Connection;

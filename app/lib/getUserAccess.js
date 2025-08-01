import dbConnect from "./models/db";
import User from "./models/User";

export default async function userAccess(email) {
    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected");

        console.log("Finding User...");
        const user = await User.find({ email: email });
        // console.log(user[0]);

        if (user.length > 0) {
            return user[0].access;
        } else {
            return "User"
        }

    } catch (error) {
        console.error(error);
    }
}
import dbConnect from "@/app/lib/models/db";
import User from "@/app/lib/models/User";
import { comparePass } from "@/app/lib/bcrypt";

export async function POST(request) {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    try {
        const req = await request.json();
        const { email, password } = req;

        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        console.log("Finding user...");
        const founduser = await User.find({ email: email });

        console.log(founduser[0]);

        if (founduser[0] === undefined) {
            return Response.json({ Unauthorized: "That email does not exist. Try again." }, { status: 401 });
        } else {
            const comparedresult = await comparePass(password, founduser[0].password);
            console.log(comparedresult);

            if (comparedresult === true) {
                const user = {
                    id: founduser[0]._id,
                    name: `${founduser[0].fname} ${founduser[0].lname}`,
                    email: founduser[0].email,
                }
                console.log(user);
                return Response.json(user, { status: 200 });
            } else {
                return Response.json({ Unauthorized: "Try again..." }, { status: 401 });
            }

        }
    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }

}
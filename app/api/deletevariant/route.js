import dbConnect from "@/app/lib/models/db";
import Variant from "@/app/lib/models/Variant";

export async function POST(request) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { id, vari } = await request.json();

    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        console.log("Checking if Varianat document exists for given Company...");
        const existing = await Variant.findOne({ _id: id });

        
        if (existing.variants.includes(vari)) {
            console.log("Deleting variant...");
            existing.variants.pop(vari);
            await existing.save();
        }
        return Response.json({ okay: existing }, { status: 200 });

    } catch (error) {

    }


}
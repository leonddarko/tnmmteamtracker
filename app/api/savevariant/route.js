import dbConnect from "@/app/lib/models/db";
import Variant from "@/app/lib/models/Variant";


export async function POST(request) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { companyId, variant } = await request.json();

    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        console.log("Checking if Variant document exists for given Company...");
        const existing = await Variant.findOne({ company: companyId });

        if (existing) {
            console.log("Variant document exists for given company.");
            if (!existing.variants.includes(variant)) {
                console.log("Adding Variant to array...");
                existing.variants.push(variant);
                await existing.save();
                console.log("Variant added...");
            }
            console.log("Variant ready.");
            return Response.json({ okay: existing }, { status: 200 });
        }

        console.log("Creating new Variant document and for given Company and adding variant...");
        const newVariant = new Variant({ company: companyId, variants: [variant] });
        await newVariant.save();
        console.log("Document created, Variant added...");
        return Response.json({ okay: "Variant saved" }, { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }
}
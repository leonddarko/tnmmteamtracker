import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/models/db";
import Brand from "@/app/lib/models/Brand";
import Variant from "@/app/lib/models/Variant";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const company = searchParams.get('company');

    try {

        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        if (!company) {
            console.log("No company ID passed.");
            return NextResponse.json({ error: 'Missing company ID' }, { status: 400 });
        }

        console.log("Finding Brand...");
        const BrandDoc = await Brand.findOne({ company });
        if (!BrandDoc) {
            return NextResponse.json({ brands: [] });
        }

        console.log("Finding Variant...");
        const VariantDoc = await Variant.findOne({ company });
        if (!VariantDoc) {
            return NextResponse.json({ variants: [] });
        }

        return NextResponse.json({ brands: BrandDoc.brands, variants: VariantDoc.variants });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }

}
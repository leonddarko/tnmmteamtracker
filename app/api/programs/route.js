import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/models/db";
import Program from "@/app/lib/models/Program";


export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const station = searchParams.get('station');


    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        if (!station) {
            console.log("No Station ID passed.");
            return NextResponse.json({ error: 'Missing Station ID' }, { status: 400 });
        }

        console.log("Finding Programs...");
        const progamDoc = await Program.findOne({ station });
        if (!progamDoc) {
            return NextResponse.json({ programs: [] });
        }
        
        console.log(progamDoc);
        return NextResponse.json({ programs: progamDoc.programs });


    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }

}
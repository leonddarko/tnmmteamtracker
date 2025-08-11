import dbConnect from "@/app/lib/models/db";

export async function POST(request) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
        const req = await request.json();
        
    } catch (error) {
         console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }
}
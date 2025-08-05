import UserDashboard from "@/app/ui/userdashboard";
import { House } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { getUserID } from "@/app/lib/getUsers";
import { Suspense } from "react";
import TableSkeleton from "@/app/ui/skeletons";
import DataEntryModal from "@/app/ui/dataentrymodal";

export default async function Dashboard() {
    const session = await getServerSession()
    const userID = await getUserID(session.user.email);

    return (
        <div className="py-6 md:pt-24 px-4 md:px-10 h-screen rounded-lg bg-white/70 shadow-sm overflow-scroll">
            <div className="flex flex-wrap justify-between items-center gap-2 mb-10">
                <div className="">
                    <Link href="/">
                        <button
                            className="btn-ghost btn-xs rounded-full flex justify-start items-center gap-1 shadow-sm transition-all bg-zinc-100 text-black mb-5 p-1">
                            <House size={15} />
                            <span className="text-xs">Homepage</span>
                        </button>
                    </Link>
                    <h1 className=" text-3xl text-cyan-950 font-notosans font-bold leading-none">{session.user.name}</h1>
                    <p className="label-text text-cyan-950">Detailed instructions for this page to be provided later.</p>
                </div>
                <DataEntryModal User={session.user.name} />
            </div>

            <Suspense fallback={<TableSkeleton />}>
                <UserDashboard UserID={userID} />
            </Suspense>
        </div>
    )
}
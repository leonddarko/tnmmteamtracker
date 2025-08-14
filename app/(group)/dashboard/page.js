import UserDashboard from "@/app/ui/userdashboard";
import { House } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { getUserID } from "@/app/lib/getUsers";
import { Suspense } from "react";
import TableSkeleton from "@/app/ui/skeletons";
import DataEntryModal from "@/app/ui/dataentrymodal";
import getAllCategories from "@/app/lib/getCategories";
import getAllIndustries from "@/app/lib/getIndustries";
import getCompanies from "@/app/lib/getCompanies";
import getUserEntries from "@/app/lib/getUserEntries";
import UserEntriesTable from "@/app/ui/userentriestable";

export default async function Dashboard() {
    const session = await getServerSession()
    console.log(session);

    const userID = await getUserID(session?.user.email);

    const industries = await getAllIndustries();
    const categories = await getAllCategories();
    const companies = await getCompanies();
    const userentries = await getUserEntries();

    // Convert data to a plain object
    const Industries = JSON.parse(JSON.stringify(industries));
    const Categories = JSON.parse(JSON.stringify(categories));
    const Companies = JSON.parse(JSON.stringify(companies));
    const UserEntries = JSON.parse(JSON.stringify(userentries));

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
                    <h1 className=" text-3xl text-cyan-950 font-notosans font-bold leading-none">{session?.user.name}</h1>
                    {/* <p className="label-text text-cyan-950">Detailed instructions for this page to be provided later.</p> */}
                </div>
                <DataEntryModal User={session?.user.name} UserID={userID} Industries={Industries} Companies={Companies} />
            </div>

            <Suspense fallback={<TableSkeleton />}>
                <UserEntriesTable UserEntries={UserEntries} />
                <UserDashboard UserID={userID} />
            </Suspense>
        </div>
    )
}
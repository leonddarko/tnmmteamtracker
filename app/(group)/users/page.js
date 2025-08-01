import AddUserModal from "@/app/ui/addusermodal";
import UsersTable from "@/app/ui/userstable";
import TableSkeleton from "@/app/ui/skeletons";
import { getStations } from "@/app/lib/getStations";

import UnauthorizedAccess from "@/app/ui/unauthorizedaccess";
import { getServerSession } from "next-auth";

import userAccess from "@/app/lib/getUserAccess";

import { Suspense } from "react";

export default async function Users() {
    const session = await getServerSession()
    const useraccess = await userAccess(session.user.email);
    console.log(useraccess);

    const stations = await getStations()
    const Stations = JSON.parse(JSON.stringify(stations));
    return (
        <>
            <div className="py-6 md:pt-24 px-4 md:px-10 h-screen rounded-lg bg-white/70 shadow-sm overflow-scroll">
                {useraccess !== "Admin" && (
                    <UnauthorizedAccess />
                )}
                {useraccess === "Admin" && (
                    <>
                        <div className="mb-10">
                            <div className="flex flex-col md:flex-row gap-2 justify-between items-start">
                                <div>
                                    <h1 className=" text-3xl text-cyan-950 font-notosans font-bold ">Users</h1>
                                    <span className="label-text text-cyan-950">Add a <span className=" font-medium text-cyan-950">User, View all Users</span> or <span className="font-medium text-red-900">Delete a User </span>here.</span>
                                </div>
                                <AddUserModal Stations={Stations.reverse()} />
                            </div>
                        </div>
                        <Suspense fallback={<TableSkeleton />}>
                            <UsersTable />
                        </Suspense>
                    </>
                )}
            </div>
        </>
    )
}
"use client"

import { Radio, RadioTower, Tv } from "lucide-react";
import DelStationForm from "./delstationform";
import { useSession } from "next-auth/react";
import { useEffect } from "react";


export default function StationsTable({ Stations }) {
    const { data: session, update } = useSession({ required: "true" });

    useEffect(() => {
        update(); // force refetch from /api/auth/session
    }, []);

    const filteredStations = Stations.filter(data => data.country === session.user.country)

    return (<>
        <div className="overflow-scroll max-w-lg md:overflow-auto max-h-80 shadow-sm shadow-gray-300 rounded-xl md:flex-grow">
            {filteredStations.length > 0 && (
                <table className="table table-xs table-pin-rows bg-zinc-100">
                    <tbody>
                        <tr className="text-cyan-950/50">
                            <th>Country</th>
                            <th>Station</th>
                            <th>Type</th>
                            <th className=" text-end">Actions</th>
                        </tr>
                    </tbody>
                    <tbody>
                        {filteredStations.map((item) => (
                            <tr key={item._id} className="text-black hover:bg-zinc-100">
                                <td className="font-normal">
                                    {item.country}
                                </td>
                                <td className="font-semibold text-sm">
                                    {item.name}
                                </td>
                                <td>
                                    <div className="flex justify-start items-center gap-2">
                                        {item.type === "TV" && (
                                            <Tv size={13} className="text-cyan-700" />
                                        )}
                                        {item.type === "Radio" && (
                                            <Radio size={13} className="text-cyan-700" />
                                        )}
                                        {item.type}
                                    </div>
                                </td>
                                <td className="flex justify-end">
                                    {/* <DelUserForm id={item._id} /> */}
                                    <DelStationForm id={item._id} />
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            )}
        </div>
    </>)
}
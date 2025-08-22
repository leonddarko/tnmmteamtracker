"use client"

import { ChevronRight, FileText } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import DownloadAsXlsxFile from "./downloadasxlxsfile";


export default function AllUserEntriesTable({ Entries }) {
    const { data: session, status, update } = useSession({ required: "true" });

    useEffect(() => {
        update(); // force refetch from /api/auth/session
    }, []);

    const filteredEntries = Entries.filter(data => data.country === session.user.country)

    return (
        <>
            {/* {status === "loading" && (<span className="loading loading-spinner loading-xs text-cyan-950"></span>)} */}

            {filteredEntries.length > 0 && (
                <div className="text-cyan-950 text-xs mb-2 ms-1.5 flex items-center gap-1">
                    {status === "loading" && (<span className="loading loading-spinner loading-xs text-cyan-950"></span>)}
                    {session.user.country && (
                        <>
                        <FileText size={15} />
                            All Entries <span className=" font-bold">({session.user.country})</span>
                            <ChevronRight size={15} />
                        </>)}
                </div>
            )}

            {filteredEntries.length > 0 && (
                <>
                    <div className="overflow-scroll max-w-full md:overflow-auto max-h-94 shadow-sm shadow-gray-300 rounded-xl md:flex-grow mb-4">
                        <table className="table table-xs table-pin-rows bg-zinc-50">
                            <tbody>
                                <tr className="text-cyan-950/50">
                                    <th>Station</th>
                                    <th>Date</th>
                                    <th>Timestamp</th>
                                    <th>Title</th>
                                    <th>Product</th>
                                    <th>Duration</th>
                                    <th>Language</th>
                                    <th>Program</th>
                                    <th>Rate</th>
                                    <th>Industry</th>
                                    <th>Category</th>
                                    <th>Company</th>
                                    <th>Brand</th>
                                    <th>Variant</th>
                                    <th>Country</th>
                                    <th>Time Submitted</th>
                                    <th>Date Submitted</th>
                                    <th>User</th>
                                    {/* <th className=" text-end">Actions</th> */}
                                </tr>
                            </tbody>
                            <tbody>
                                {filteredEntries.reverse().map((item) => (
                                    <tr key={item._id} className="text-cyan-950 hover:bg-zinc-100">
                                        <td className="font-black text-sm">{item.station}</td>
                                        <td className="font-normal">{item.date}</td>
                                        <td className="font-medium">{item.timestamp}</td>
                                        <td className="font-bold">{item.title}</td>
                                        <td className="font-normal">{item.product}</td>
                                        <td className="font-normal">{item.duration}</td>
                                        <td className="font-normal">{item.language}</td>
                                        <td className="font-normal">{item.program}</td>
                                        <td className="font-normal">{item.rate}</td>
                                        <td className="font-normal">{item.industry}</td>
                                        <td className="font-normal">{item.category}</td>
                                        <td className="font-normal">{item.company}</td>
                                        <td className="font-normal">{item.brand}</td>
                                        <td className="font-normal">{item.variant}</td>
                                        <td className="font-normal">{item.country}</td>
                                        <td className="font-normal">{item.timesubmitted}</td>
                                        <td className="font-normal">{item.datesubmitted.slice(0, 10)}</td>
                                        <td className="font-black">{item.user}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-wrap justify-between items-center gap-2 mb-15">
                        <div className="badge badge-sm bg-cyan-950 text-white border-0 rounded-full flex items-center gap-1.5">
                            <span>Count:</span>
                            <span className="font-bold">{filteredEntries.length}</span>
                        </div>
                        <DownloadAsXlsxFile />
                    </div>
                </>
            )}
        </>
    )

}
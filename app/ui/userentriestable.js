"use client"

import { useSession } from "next-auth/react"
import DelEntryForm from "./delentryform";
import { useState } from "react";
import { ChevronRight, Trash2, X } from "lucide-react";

export default function UserEntriesTable({ UserEntries }) {
    const { data: session } = useSession({ required: "true" });

    const filteredUserEntries = UserEntries.filter(data => data.user === session.user.name).reverse();

    const [titleTimestamp, setTitleTimestamp] = useState({
        title: "",
        timestamp: "",
        id: ""
    });

    return (
        <>
            {filteredUserEntries.length > 0 && (
                <div className="text-cyan-950 text-xs font-semibold mb-2 ms-1.5 flex items-center gap-1">
                    All Your Entries
                    <ChevronRight size={10} />
                </div>
            )}

            <div className="overflow-scroll max-w-full md:overflow-auto max-h-52 shadow-sm shadow-gray-300 rounded-xl md:flex-grow mb-10">
                {filteredUserEntries.length > 0 && (
                    <>
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
                                    {/* <th>Time Submitted</th> */}
                                    {/* <th>Date Submitted</th> */}
                                    <th>User</th>
                                    <th className=" text-end">Actions</th>
                                </tr>
                            </tbody>
                            <tbody>
                                {filteredUserEntries.map((item) => (
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
                                        {/* <td className="font-normal">{item.timesubmitted}</td> */}
                                        {/* <td className="font-normal">{item.datesubmitted.slice(0,10)}</td> */}
                                        <td className="font-bold">{item.user}</td>
                                        <td className="font-bold">

                                            {/* Del Modal */}
                                            <button
                                                onClick={() => {
                                                    document.getElementById('del_entry_modal').showModal();
                                                    setTitleTimestamp({
                                                        title: item.title,
                                                        timestamp: item.timestamp,
                                                        id: item._id,
                                                    });
                                                }}
                                                type="button"
                                                className="btn-xs flex justify-start items-center gap-1 bg-red-700 text-white rounded-full font-sans font-semibold text-xs py-0.5 px-2">
                                                <Trash2 size={13} className="" />
                                                <span>Del</span>
                                            </button>

                                            <dialog id="del_entry_modal" className="modal">
                                                <div className="modal-box max-w-md bg-zinc-50">
                                                    <form method="dialog">
                                                        {/* if there is a button in form, it will close the modal */}
                                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                                            <X size={15} className="text-red-700" />
                                                        </button>
                                                    </form>

                                                    <div className="mb-5">
                                                        <div className="text-xs text-cyan-950 mb-2 font-normal">{titleTimestamp.id}</div>
                                                        <span className="label-text text-base text-cyan-950">
                                                            Delete this entry for <span className="text-red-700 font-semibold">
                                                                {titleTimestamp.title}
                                                            </span>
                                                        </span>
                                                        <h1 className="text-base text-cyan-950">
                                                            with timestamp <span className="text-red-700 font-semibold"> {titleTimestamp.timestamp}
                                                            </span> ?
                                                        </h1>
                                                    </div>

                                                    <div className="flex justify-between items-center">
                                                        <kbd className="kbd kbd-xs bg-zinc-100 text-black">esc</kbd>
                                                        <DelEntryForm id={item._id} />
                                                    </div>
                                                </div>
                                            </dialog>
                                            {/* Del Modal */}

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </>
    )
}

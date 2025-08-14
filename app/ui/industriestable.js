"use client"

import { Trash2 } from "lucide-react";
import { useState } from "react"
import DelIndustryForm from "./delindustryform";

export default function IndustriesTable({ Industries }) {

    const sortedIndustries = Industries.slice().sort((a, b) =>
        a.industry.localeCompare(b.industry)
    );

    return (
        <>
            <div className="overflow-scroll md:overflow-auto max-h-96 max-w-lg shadow-sm shadow-gray-300 rounded-xl flex-grow">
                {Industries.length > 0 && (
                    <table className="table table-xs table-pin-rows bg-zinc-100">
                        <tbody className=" ">
                            <tr className="text-cyan-950/50">
                                <th>Industry</th>
                                <th className="flex justify-end items-center">Actions</th>
                            </tr>
                        </tbody>
                        <tbody>
                            {sortedIndustries.map((item) => (
                                <tr key={item._id} className="text-black hover:bg-zinc-100">
                                    <td className="font-medium text-sm">{item.industry}</td>
                                    <td className="font-bold">
                                        <div className="flex justify-end items-center gap-1">
                                            <DelIndustryForm id={item._id} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    )
}
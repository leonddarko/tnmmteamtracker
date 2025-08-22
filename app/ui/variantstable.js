"use client"
import DelVariantForm from "./delvariantform";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function VariantsTable({ Variants }) {

    const { data: session, status, update } = useSession({ required: "true" });

    useEffect(() => {
        update(); // force refetch from /api/auth/session
    }, []);

    const filteredVariants = Variants.filter(data => data.country === session.user.country)

    return (
        <>
            {filteredVariants.length > 0 && (
                <div className="overflow-scroll md:overflow-auto max-h-96 max-w-lg shadow-sm shadow-gray-300 rounded-xl flex-grow">

                    <table className="table table-xs table-pin-rows bg-zinc-100">
                        <tbody className=" ">
                            <tr className="text-cyan-950/50">
                                <th>Brand (Variant)</th>
                                <th className="flex justify-end items-center">Actions</th>
                            </tr>
                        </tbody>
                        <tbody>
                            {filteredVariants.reverse().map((item) => (
                                <tr key={item._id} className="text-black text-xs hover:bg-zinc-100">
                                    <td className="font-semibold text-sm">{item.variant}</td>
                                    <td className="flex justify-end items-center">
                                        {/* <DelCompanyForm id={item._id} /> */}
                                        <DelVariantForm id={item._id} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* {Variants.length > 0 && (
                    <table className="table table-xs table-pin-rows bg-zinc-100">
                        <tbody className=" ">
                            <tr className="text-cyan-950/50">
                                <th>Brand (Variant)</th>
                            </tr>
                        </tbody>
                        <tbody>
                            {Variants.map((item) => {
                                // Convert industry ObjectId to string for consistent matching
                                const companyName = CompanyMap.get(item.company) || 'Unknown';
                                return (
                                    <tr key={item._id} className="text-black  hover:bg-zinc-100">
                                        <td className="font-semibold">
                                            <div className=" text-xs text-cyan-800 flex justify-start items-center gap-2">
                                                <span className="font-normal">{companyName}</span>
                                                <DelVariantListForm id={item._id} />
                                            </div>
                                            {item.variants.map(vari => (
                                                <div className="text-sm flex justify-between items-center" key={vari}>
                                                    <span className="mb-1">{vari}</span>
                                                    <DelVariantForm id={item._id} vari={vari} />
                                                </div>
                                            ))}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )} */}

        </>
    )

}
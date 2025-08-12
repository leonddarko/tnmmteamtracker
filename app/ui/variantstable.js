import DelVariantForm from "./delvariantform";
import DelVariantListForm from "./delvariantlistform";


export default function VariantsTable({ Companies, Variants }) {

    const CompanyMap = new Map(
        Companies.map((comp) => [comp._id, comp.company])
    );

    return (
        <>
            <div className="overflow-scroll md:overflow-auto max-h-80 max-w-lg shadow-sm shadow-gray-300 rounded-xl flex-grow">
                {Variants.length > 0 && (
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
                )}

            </div>
        </>
    )

}
import DelBrandForm from "./delbrandform";
import DelBrandListForm from "./delbrandlistform";


export default function BrandsTable({ Companies, Brands }) {
    const CompanyMap = new Map(
        Companies.map((comp) => [comp._id, comp.company])
    );
    return (
        <>
            <div className="overflow-scroll md:overflow-auto max-h-80 max-w-lg shadow-sm shadow-gray-300 rounded-xl flex-grow">
                {Brands.length > 0 && (
                    <table className="table table-xs table-pin-rows bg-zinc-100">
                        <tbody className=" ">
                            <tr className="text-cyan-950/50">
                                <th>Brand (Generic)</th>
                            </tr>
                        </tbody>
                        <tbody>
                            {Brands.map((item) => {
                                // Convert industry ObjectId to string for consistent matching
                                const companyName = CompanyMap.get(item.company) || 'Unknown';
                                return (
                                    <tr key={item._id} className="text-black  hover:bg-zinc-100">
                                        <td className="font-semibold">
                                            <div className=" text-xs text-cyan-800 flex justify-start items-center gap-2">
                                                <span className=" font-normal">{companyName}</span>
                                                <DelBrandListForm id={item._id} />
                                            </div>
                                            {item.brands.map(brand => (
                                                <div className="text-sm flex justify-between items-center" key={brand}>
                                                    <span className="mb-1">{brand}</span>
                                                    <DelBrandForm id={item._id} brand={brand} />
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
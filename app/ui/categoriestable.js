import DelCategoryForm from "./delcategoryform";
import DelCategoryListForm from "./delcategorylistform";


export default function CategoriesTable({ Industries, Categories }) {
    // Build a lookup map of industryId -> industryName for fast resolution
    const industryMap = new Map(
        Industries.map((ind) => [ind._id, ind.industry])
    );

    return (
        <>
            <div className="overflow-scroll md:overflow-auto max-h-80 max-w-lg shadow-sm shadow-gray-300 rounded-xl flex-grow">
                {Categories.length > 0 && (
                    <table className="table table-xs table-pin-rows bg-zinc-100">
                        <tbody className=" ">
                            <tr className="text-cyan-950/50">
                                <th>Category</th>
                            </tr>
                        </tbody>
                        <tbody>
                            {Categories.map((item) => {
                                // Convert industry ObjectId to string for consistent matching
                                const industryName = industryMap.get(item.industry) || 'Unknown';
                                return (
                                    <tr key={item._id} className="text-black  hover:bg-zinc-100">
                                        <td className="font-semibold">
                                            <div className=" text-xs text-cyan-800 flex justify-start items-center gap-2">
                                                <span className="">{industryName}</span>
                                                <DelCategoryListForm id={item._id} />
                                            </div>
                                            {item.categories.map(cate => (
                                                <div className="text-sm flex justify-between items-center" key={cate}>
                                                    <span className="mb-1">{cate}</span>
                                                    <DelCategoryForm id={item._id} cate={cate} />
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

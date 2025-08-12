import getCompanies from "../lib/getCompanies"
import DelCompanyForm from "./delcompanyform";

export default async function CompaniesTable() {
    const data = await getCompanies();
    // console.log(data);

    // Convert data to a plain object
    const Companies = JSON.parse(JSON.stringify(data));
    return (
        <>
            <div className="overflow-scroll md:overflow-auto max-h-80 max-w-lg shadow shadow-gray-300 rounded-xl flex-grow">
                {Companies.length > 0 && (
                    <table className="table table-xs table-pin-rows bg-zinc-100">
                        <tbody className=" ">
                            <tr className="text-cyan-950/50">
                                <th>Company</th>
                                <th>Country</th>
                                <th className="flex justify-end items-center">Actions</th>
                            </tr>
                        </tbody>
                        <tbody>
                            {Companies.map((item) => (
                                <tr key={item._id} className="text-black text-xs hover:bg-zinc-100">
                                    <td className="font-semibold text-sm">{item.company}</td>
                                    <td className="font-normal">{item.country}</td>
                                    <td className="flex justify-end items-center">
                                        <DelCompanyForm id={item._id} />
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
import { Radio, RadioTower, Tv } from "lucide-react";
import DelStationForm from "./delstationform";


export default async function StationsTable({ Stations }) {

    return (<>
        <div className="overflow-scroll max-w-lg md:overflow-auto max-h-80 shadow-sm shadow-gray-300 rounded-xl md:flex-grow">
            <table className="table table-xs table-pin-rows bg-zinc-100">
                <tbody>
                    <tr className="text-black">
                        <th>Station</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </tbody>
                <tbody>
                    {Stations && Stations.map((item) => (
                        <tr key={item._id} className="text-black text-xs hover:bg-zinc-100">
                            <td className="flex justify-start items-center gap-1 font-bold">
                                {/* <RadioTower className="text-cyan-500" size={13} /> */}
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
        </div>
    </>)
}
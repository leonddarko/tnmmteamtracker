import { KeyRound, User } from "lucide-react";
import { getAllUsers } from "../lib/getUsers";
import DelUserForm from "./deluserform";

export default async function UsersTable() {
    const users = await getAllUsers();
    // Convert data to a plain object
    const Users = JSON.parse(JSON.stringify(users));
    return (<>
        <div className="overflow-scroll w-full md:overflow-auto max-h-80 shadow-sm shadow-gray-300 rounded-xl md:flex-grow">
            <table className="table table-xs table-pin-rows bg-zinc-100">
                <tbody>
                    <tr className="text-zinc-950/50">
                        <th>User</th>
                        <th>Email</th>
                        <th>Access</th>
                        <th>Actions</th>
                    </tr>
                </tbody>
                <tbody>
                    {Users && Users.map((item) => (
                        <tr key={item._id} className="text-black text-xs hover:bg-zinc-100">
                            <td className="flex justify-start items-center gap-1"><User className="text-cyan-500" size={13} />
                                {item.fname + " " + item.lname}
                            </td>
                            <td className="font-bold">{item.email}</td>
                            <td>
                                <div className="flex justify-start items-center gap-1 font-medium">
                                    <KeyRound size={15} className="text-cyan-700" />
                                    {item.access}
                                </div>
                            </td>
                            <td className="">
                                <DelUserForm id={item._id} />
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    </>)
}

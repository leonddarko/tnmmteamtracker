"use client"
import { useEffect, useState } from "react"
import axios from "axios"

export default function UserProgressDashboard() {
    const [users, setUsers] = useState([]); // Store all users
    const [captures, setCaptures] = useState([]); // Store capture records
    const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7)); // Default month (YYYY-MM)

    // Fetch users when component mounts
    useEffect(() => {
        axios.get('/api/admin/users').then(res => setUsers(res.data));
    }, []);

    // Fetch capture data for selected month
    useEffect(() => {
        axios.get(`/api/admin/captures?month=${month}`).then(res => setCaptures(res.data));
    }, [month]);

    // Filter captures by user ID
    const getUserCaptures = (userId) =>
        captures.filter(c => c.userId === userId);

    // Calculate capture completion rate for a station (based on 31 days max)
    const getCompletionRate = (days) => `${Math.round((days.length / 31) * 100)}%`;

    return (
        <main className="pb-6">

            {/* Month selector */}
            <label className="mb-4 block">
                <input
                    type="month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="py-0.5 px-2 text-sm font-bold rounded-lg focus:outline-none shadow-sm bg-cyan-700 text-white"
                />
            </label>

            {/* Display all users with their capture summaries */}
            <div className="flex flex-wrap justify-start gap-2 mt-10">
                {users.map(user => (
                    <div key={user._id} className="px-4 py-6 rounded-2xl shadow bg-cyan-50 text-black w-72">
                        <h2 className="text-lg font-bold leading-4">{user.fname} {user.lname}</h2>
                        <div className="text-xs">{user.email}</div>

                        <div className="mt-4">
                            {getUserCaptures(user._id).map(capture => (
                                <div key={capture._id} className="text-sm mb-1">
                                    <span className=" font-bold">{capture.station?.name || 'Unknown Station'}:</span> {capture.completedDays.length} day(s) captured — <span className={`font-black ${getCompletionRate(capture.completedDays) === "100%" ? "text-green-800" : "text-amber-700" }`}>{getCompletionRate(capture.completedDays)}</span>
                                </div>
                            ))}

                            {getUserCaptures(user._id).length === 0 && (
                                <div className="text-sm mb-1 text-red-900">
                                    No information available yet.
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );

}

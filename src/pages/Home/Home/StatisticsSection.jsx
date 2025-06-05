import axios from "axios";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

const StatisticsSection = () => {
    const [stats, setStats] = useState({ totalUsers: 0, normalUsers: 0, premiumUsers: 0 });

    
    useEffect(() => {
        axios.get("http://localhost:5000/stats")
            .then(res => setStats(res.data))
    }, []);
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Website Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-black">
                <div className="p-4 bg-white shadow-md rounded-md">
                    <p className="text-lg font-semibold">Total Users</p>
                    <CountUp end={stats.totalUsers} duration={2} className="text-4xl font-bold text-blue-500" />
                </div>
                <div className="p-4 bg-white shadow-md rounded-md">
                    <p className="text-lg font-semibold">Normal Users</p>
                    <CountUp end={stats.normalUsers} duration={2} className="text-4xl font-bold text-green-500" />
                </div>
                <div className="p-4 bg-white shadow-md rounded-md">
                    <p className="text-lg font-semibold">Premium Users</p>
                    <CountUp end={stats.premiumUsers} duration={2} className="text-4xl font-bold text-yellow-500" />
                </div>
            </div>
        </div>
    );
};

export default StatisticsSection;
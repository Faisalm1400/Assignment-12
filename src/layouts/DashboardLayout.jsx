import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import useAdmin from "../hooks/useAdmin";

const DashboardLayout = () => {
    // TODO: get isAdmin value from the database
    const [isAdmin] = useAdmin();
    return (
        <div className="flex min-h-screen">
            <div className="w-64 bg-gray-800 text-white min-h-screen fixed">
                <Sidebar />
            </div>
            <div className="ml-64 flex-1 p-6 bg-gray-500">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
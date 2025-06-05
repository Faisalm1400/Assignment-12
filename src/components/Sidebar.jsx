import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const adminLinks = <>
        <li>
            <NavLink
                to="/dashboard/adminHome"
                className={({ isActive }) =>
                    `block py-2 px-4 rounded ${isActive ? "bg-yellow-500 text-black font-bold" : "hover:bg-gray-700"}`
                }
            >
                Admin Home
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/dashboard/users"
                className={({ isActive }) =>
                    `block py-2 px-4 rounded ${isActive ? "bg-yellow-500" : "hover:bg-gray-700"}`
                }
            >
                All Users
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/dashboard/articles"
                className="block py-2 px-4 rounded"
            >
                All Articles
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/dashboard/publishers"
                className={({ isActive }) =>
                    `block py-2 px-4 rounded ${isActive ? "bg-yellow-500" : "hover:bg-gray-700"}`
                }
            >
                Add Publisher
            </NavLink>
        </li>
    </>

    const userLinks = <>
        <li>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `block py-2 px-4 rounded ${isActive ? "bg-blue-500 text-white font-bold" : "hover:bg-gray-700"}`
                }
            >
                Home
            </NavLink>
        </li>
    </>
    return (
        <div className="w-64 h-screen bg-gray-800 text-white p-4 fixed space-y-6">
            <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
            <nav>
                <ul className="space-y-5">
                    {adminLinks}
                </ul>
            </nav>
            <hr />
            <nav>
                <ul className="space-y-5">
{userLinks}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
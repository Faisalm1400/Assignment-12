import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
    const { user, logOut } = useAuth();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log('User logged out')
            })
    }

    const links = <>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/addArticle'}>Add Articles</Link></li>
        <li><Link to={'/allArticles'}>All Articles</Link></li>
        <li><Link to={'/myArticles'}>My Articles</Link></li>
        <li><Link to={'/'}>Subscription</Link></li>
        <li><Link to={'/dashboard'}>Dashboard</Link></li>
        <li><Link to={'/'}>Premium Articles</Link></li>
    </>

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end gap-2">
                {
                    user ? <>
                        <Link to={"/myProfile"}>
                            <img className="w-10 h-10 rounded-full" src={user.photoURL} alt="" />
                        </Link>
                        <button onClick={handleLogOut} className='btn btn-ghost'>Logout</button>
                    </> : <>
                        <Link to={"/login"}>
                            <button className='btn btn-primary'>Login</button>
                        </Link>
                        <Link to={"/register"}>
                            <button className='btn btn-primary'>Register</button>
                        </Link>
                    </>
                }
            </div>
        </div>
    );
};

export default Navbar;
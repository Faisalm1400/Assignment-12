import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoutes from "./PrivateRoutes";
import AddArticle from "../pages/Articles/AddArticle";
import AllArticles from "../pages/Articles/AllArticles";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "addArticle",
                element: <PrivateRoutes>
                    <AddArticle />
                </PrivateRoutes>
            },
            {
                path: "allArticles",
                element: <AllArticles />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            }
        ],
    },
]);
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
import ArticleDetails from "../pages/Articles/ArticleDetails";
import MyProfile from "../pages/Profile/MyProfile";
import MyArticles from "../pages/Articles/MyArticles";


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
                path: "article/:id",
                element: <PrivateRoutes>
                    <ArticleDetails />
                </PrivateRoutes>,
                loader: ({ params }) => fetch(`http://localhost:5000/articles/${params.id}`)
            },
            {
                path: "myProfile",
                element: <PrivateRoutes>
                    <MyProfile />
                </PrivateRoutes>
            },
            {
                path: "myArticles",
                element: <PrivateRoutes>
                    <MyArticles />
                </PrivateRoutes>
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
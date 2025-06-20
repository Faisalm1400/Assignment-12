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
import Dashboard from "../pages/Dashboard/Dashboard";
import AllUsers from "../pages/Dashboard/AllUsers";
import DashboardLayout from "../layouts/DashboardLayout";
import AddPublisher from "../pages/Dashboard/AddPublisher";
import AdminRoute from "./AdminRoute";
import AdminAllArticles from "../pages/Dashboard/AdminAllArticles";
import SubscriptionPage from "../pages/Subscription/SubscriptionPage";
import PremiumArticles from "../pages/Subscription/PremiumArticles";
import ErrorPage from "../pages/Error/ErrorPage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
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
                loader: ({ params }) => fetch(`https://newspaper-server-rose.vercel.app/articles/${params.id}`)
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
                path: "subscription",
                element: <PrivateRoutes>
                    <SubscriptionPage />
                </PrivateRoutes>
            },
            {
                path: "premiumArticles",
                element: <PrivateRoutes>
                    <PremiumArticles />
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
    {
        path: "dashboard",
        element: <AdminRoute>
            <DashboardLayout />
        </AdminRoute>,
        children: [
            {
                path: "adminHome",
                element: <Dashboard />
            },
            {
                path: "users",
                element: <AllUsers />
            },
            {
                path: "articles",
                element: <AdminAllArticles />
            },
            {
                path: "publishers",
                element: <AddPublisher />
            },
        ],
    },
]);
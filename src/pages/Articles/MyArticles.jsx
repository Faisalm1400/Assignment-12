import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyArticles = () => {
    const { user } = useAuth()
    const [articles, setArticles] = useState([]);


    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to recover this article!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/articles/${id}`)
                    .then(() => {
                        Swal.fire("Deleted!", "Your article has been deleted.", "success");
                        setArticles(articles.filter(article => article._id !== id));
                    })
            }
        });
    };

    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:5000/myArticles?email=${user.email}`)
                .then(res => setArticles(res.data))
        }
    }, [user?.email]);
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">My Articles</h1>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border p-2">#</th>
                        <th className="border p-2">Title</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Premium</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((article, index) => (
                        <tr key={article._id}>
                            <td className="border p-2">{index + 1}</td>
                            <td className="border p-2">{article.title}</td>
                            <td className="border p-2">
                                {article.status}
                                {article.status === "declined" && (
                                    <button className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                                        onClick={() => alert(`Reason: ${article.declineReason}`)}>
                                        View Reason
                                    </button>
                                )}
                            </td>
                            <td className="border p-2">{article.isPremium ? "Yes" : "No"}</td>
                            <td className="border p-2 space-x-3">
                                <Link to={`/article/${article._id}`}>
                                    <button className="bg-blue-500 text-white px-2 py-1 rounded">Details</button>
                                </Link>
                                <button className="bg-yellow-500 text-white px-2 py-1 rounded">Update</button>
                                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(article._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyArticles;
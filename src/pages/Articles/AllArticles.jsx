import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AllArticles = () => {

    const { user } = useAuth();
    const [articles, setArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPublisher, setSelectedPublisher] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [isPremium, setIsPremium] = useState(false);
    const [publishers, setPublishers] = useState([]);



    useEffect(() => {
        axios.get("https://newspaper-server-rose.vercel.app/publishers")
            .then(res => setPublishers(res.data))
            .catch(error => console.error("Error fetching publishers:", error));
    }, []);

    useEffect(() => {
        axios.get('https://newspaper-server-rose.vercel.app/articles', {
            params: {
                search: searchTerm,
                publisher: selectedPublisher,
            }
        })
            .then(res => setArticles(res.data))

        if (user) {
            axios.get(`https://newspaper-server-rose.vercel.app/users/premium-status/${user.email}`)
                .then(res => setIsPremium(res.data.isPremium))
                .catch(error => console.error("Error checking premium status:", error));
        }
    }, [searchTerm, selectedPublisher, selectedTags, user]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">All Articles</h1>
            <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
                <input
                    type="text"
                    placeholder="Search by title"
                    onChange={e => setSearchTerm(e.target.value)}
                    className="border p-2 rounded-md w-full md:w-auto"
                />
                <select
                    onChange={e => setSelectedPublisher(e.target.value)}
                    className="border p-2 rounded-md w-full md:w-auto text-black bg-gray-200"
                >
                    <option value="">All Publishers</option>
                    {publishers.map(pub => (
                        <option key={pub._id} value={pub.name}>{pub.name}</option>
                    ))}
                </select>
                <select
                    multiple
                    className="border p-2 rounded-md w-full md:w-auto"
                >
                    <option value="">All Tags</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles
                    .filter(article => article.status === "approved")
                    .map(article => (
                        <div key={article._id} className={`p-4 rounded-md shadow-md bg-white text-black`}>
                            <img src={article.image} alt={article.title} className="w-full h-48 object-cover rounded-md" />
                            <h2 className="text-xl font-semibold mt-3">{article.title}</h2>
                            <p className="text-gray-600 mt-2">{article.description}</p>
                            <p className="text-sm text-gray-500 mt-1">Published by: {article.publisher}</p>
                            <Link to={`/article/${article._id}`}>
                                <button
                                    className={`mt-4 px-4 py-2 rounded-md font-medium ${article.isPremium && !isPremium ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
                                        }`}
                                    disabled={article.isPremium && !isPremium}
                                >
                                    Details
                                </button>
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default AllArticles;
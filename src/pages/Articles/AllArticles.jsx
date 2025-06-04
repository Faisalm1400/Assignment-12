import axios from "axios";
import { useEffect, useState } from "react";
import { data, Link } from "react-router-dom";

const AllArticles = () => {

    const [articles, setArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPublisher, setSelectedPublisher] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);




    useEffect(() => {
        axios.get('http://localhost:5000/articles')
            .then(res => setArticles(res.data))
    }, [searchTerm, selectedPublisher, selectedTags]);

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
                    className="border p-2 rounded-md w-full md:w-auto"
                >
                    <option value="">All Publishers</option>
                    {/* Populate publishers dynamically */}
                </select>
                <select
                    multiple
                    onChange={e => setSelectedTags([...e.target.selectedOptions].map(o => o.value))}
                    className="border p-2 rounded-md w-full md:w-auto"
                >
                    <option value="">All Tags</option>
                    {/* Populate tags dynamically */}
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
                                    className={`mt-4 px-4 py-2 rounded-md font-medium ${article.isPremium && !article.hasSubscription ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                                    disabled={article.isPremium && !article.hasSubscription}
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
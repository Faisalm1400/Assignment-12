import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const PremiumArticles = () => {
    const [articles, setArticles] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get("/articles")
            .then(res => setArticles(res.data.filter(article => article.isPremium)))
    }, []);
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Premium Articles</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map(article => (
                    <div key={article._id} className="p-4 rounded-md shadow-md bg-white text-black">
                        <img src={article.image} alt={article.title} className="w-full h-48 object-cover rounded-md" />
                        <h2 className="text-xl font-semibold mt-3">{article.title}</h2>
                        <p className="text-gray-600 mt-2">{article.description}</p>
                        <p className="text-sm text-gray-500 mt-1">Published by: {article.publisher}</p>
                        <Link to={`/article/${article._id}`}>
                            <button className="mt-4 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600">
                                Details
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PremiumArticles;
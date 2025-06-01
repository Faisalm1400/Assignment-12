import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const ArticleDetails = () => {
    // const [article, setArticle] = useState([]);

    const { _id, title, description, publisher, tags, image, status, views } = useLoaderData();

console.log(_id)

    // useEffect(() => {
    //     fetch(`http://localhost:5000/articles/${id}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //         })
    // }, [])
    // fetch(`./articles.json/${_id}`)
    //     .then(res => res.json())
    //     .then(data => setArticle(data))

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 text-white">
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <img src={image} alt={title} className="w-full h-72 object-cover rounded-md" />
            <p className="mt-4">Published by: <span className="font-semibold">{publisher}</span></p>
            <p className="mt-6 text-lg text-gray-700">{description}</p>
            <p className="mt-4 text-sm text-gray-500">Views: {views}</p>
        </div>
    );
};

export default ArticleDetails;
import axios from 'axios';
import { useEffect, useState } from 'react';

const PublishersSection = () => {
    const [publishers, setPublishers] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:5000/publishers")
            .then(res => setPublishers(res.data))
    }, []);
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-center">All Publishers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-black px-5">
                {publishers.map(pub => (
                    <div key={pub._id} className="p-4 rounded-md shadow-md bg-white">
                        <img src={pub.logo} alt={pub.name} className="w-full h-24 object-cover" />
                        <p className="text-lg font-semibold text-center">{pub.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PublishersSection;
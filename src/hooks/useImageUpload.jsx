import axios from "axios";
import { useState } from "react";

const useImageUpload = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleUpload = async (imageFile) => {
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("image", imageFile);

            const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData);

            setImageUrl(data.data.url);
        } finally {
            setLoading(false);
        }
    };

    return { imageUrl, loading, handleUpload };
};

export default useImageUpload;
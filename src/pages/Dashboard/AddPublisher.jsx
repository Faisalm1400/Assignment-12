import { useState } from "react";
import Swal from "sweetalert2";
import useImageUpload from "../../hooks/useImageUpload";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddPublisher = () => {
    const [name, setName] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const { imageUrl, loading, handleUpload } = useImageUpload();
    const axiosSecure = useAxiosSecure();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!imageFile || !name) {
            Swal.fire("Error", "Please enter name and upload a logo!", "error");
            return;
        }

        handleUpload(imageFile).then(() => {
            if (!imageUrl) {
                Swal.fire("Error", "Image upload failed!", "error");
                return;
            }

            const publisherData = { name, logo: imageUrl };

            axiosSecure.post("/admin/publishers", publisherData)
                .then(() => {
                    Swal.fire("Success!", "Publisher added successfully!", "success");
                    setName("");
                    setImageFile(null);
                })
                .catch((error) => {
                    console.error("Error adding publisher:", error);
                    Swal.fire("Error", "Failed to add publisher!", "error");
                });
        });
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-amber-200 shadow-md rounded-md text-black">
            <h2 className="text-2xl font-bold mb-4">Add Publisher</h2>
            <form onSubmit={handleSubmit}>
                <label className="label">Publisher Name</label>
                <input
                    type="text"
                    className="input w-full text-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter publisher name"
                    required
                />

                <label className="label">Publisher Logo</label>
                <input
                    type="file"
                    accept="image/*"
                    className="input w-full text-white"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    required
                />

                {loading && <p>Uploading...</p>}

                <button type="submit" className="btn btn-primary mt-4">Submit</button>
            </form>
        </div>
    );
};

export default AddPublisher;
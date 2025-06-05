import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useImageUpload from "../../hooks/useImageUpload";

const AddArticle = () => {
    const { user } = useAuth();
    const { imageUrl, loading, handleUpload } = useImageUpload();
    const [title, setTitle] = useState("");
    const [publishers, setPublishers] = useState([]);
    const [selectedPublisher, setSelectedPublisher] = useState(null);
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [imageFile, setImageFile] = useState(null);


    useEffect(() => {
        axios.get("https://newspaper-server-rose.vercel.app/publishers")
            .then(res => setPublishers(res.data))
            .catch(error => console.error("Error fetching publishers:", error));
    }, []);

    const tagOptions = [
        { value: "Technology", label: "Technology" },
        { value: "Politics", label: "Politics" },
        { value: "Health", label: "Health" },
        { value: "Business", label: "Business" },
        { value: "Sports", label: "Sports" },
        { value: "Entertainment", label: "Entertainment" },
        { value: "Education", label: "Education" },
        { value: "Science", label: "Science" },
        { value: "Climate Change", label: "Climate Change" },
        { value: "Breaking News", label: "Breaking News" }
    ];


    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imageFile) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Please upload an image!',
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }

        await handleUpload(imageFile);

        if (!imageUrl) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Image upload failed!',
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }

        const articleData = {
            title,
            publisher: selectedPublisher.label,
            tags: tags.map(tag => tag.value),
            description,
            image: imageUrl,
            status: "pending",
            email: user.email,
            authorName: user.displayName,
            authorPhoto: user.photoURL
        };

        // console.log("Submitting article:", articleData);

        axios.post("https://newspaper-server-rose.vercel.app/articles", articleData)
            .then(() => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Article has been submitted',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }

    return (
        <div className="card w-full max-w-sm shadow-2xl mx-auto bg-amber-200">
            <div className="card-body">
                <form onSubmit={handleSubmit} className="space-y-3">
                    <label className="label text-black font-bold">Title</label>
                    <input type="text" className="input" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />

                    <label className="label text-black font-bold">Upload Image</label>
                    <input type="file" className="input" onChange={handleImageChange} required />
                    {loading && <p>Uploading...</p>}
                    {imageUrl && <img src={imageUrl} alt="Uploaded Preview" width="100" />}

                    <label className="label text-black font-bold">Publisher</label>
                    <Select
                        value={selectedPublisher}
                        name="publisher"
                        options={publishers.map(pub => ({ value: pub._id, label: pub.name }))}
                        onChange={setSelectedPublisher}
                        className="basic-single text-black"
                        classNamePrefix="select"
                    />

                    <label className="label text-black font-bold">Tags</label>
                    <Select
                        value={tags}
                        isMulti
                        name="tags"
                        options={tagOptions}
                        onChange={setTags}
                        className="basic-multi-select text-black"
                        classNamePrefix="select"
                    />

                    <label className="label text-black font-bold">Description</label>
                    <textarea className="input" name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />

                    <button type="submit" className="btn btn-neutral mt-4">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddArticle;
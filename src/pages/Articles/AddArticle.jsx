import axios from "axios";
import { useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useImageUpload from "../../hooks/useImageUpload";

const AddArticle = () => {
    const { user } = useAuth();
    const { imageUrl, loading, handleUpload } = useImageUpload();
    const [title, setTitle] = useState("");
    const [publisher, setPublisher] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [imageFile, setImageFile] = useState(null);

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
            Swal.fire("Error", "Please upload an image!", "error");
            return;
        }

        await handleUpload(imageFile);

        if (!imageUrl) {
            Swal.fire("Error", "Image upload failed!", "error");
            return;
        }

        const articleData = {
            title,
            publisher,
            tags: tags.map(tag => tag.value),
            description,
            image: imageUrl,
            status: "pending",
            email: user.email,
        };

        console.log("Submitting article:", articleData);

        axios.post("http://localhost:5000/articles", articleData)
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
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <label className="label">Title</label>
                    <input type="text" className="input" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />

                    <label className="label">Upload Image</label>
                    <input type="file" accept="image/*" className="input" onChange={handleImageChange} required />
                    {loading && <p>Uploading...</p>}
                    {imageUrl && <img src={imageUrl} alt="Uploaded Preview" width="100" />}

                    <label className="label">Publisher</label>
                    <input type="text" className="input" name="publisher" value={publisher} onChange={(e) => setPublisher(e.target.value)} placeholder="Publisher" required />

                    <label className="label">Tags</label>
                    <Select
                        value={tags}
                        isMulti
                        name="tags"
                        options={tagOptions}
                        onChange={setTags}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />

                    <label className="label">Description</label>
                    <textarea className="input" name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />

                    <button type="submit" className="btn btn-neutral mt-4">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddArticle;
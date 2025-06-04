import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdminAllArticles = () => {
    const axiosSecure = useAxiosSecure();

    const { data: articles, isLoading, refetch } = useQuery({
        queryKey: ["articles"],
        queryFn: () => axiosSecure.get("/articles").then(res => res.data),
    });

    const handleApprove = (id) => {
        axiosSecure.patch(`/articles/approve/${id}`)
            .then(() => {
                Swal.fire("Success", "Article Approved!", "success");
                refetch();
            })
            .catch((error) => console.error("Error approving article:", error));
    };


    const handleDecline = (id) => {
        Swal.fire({
            title: "Decline Article",
            input: "textarea",
            inputPlaceholder: "Enter reason for decline...",
            showCancelButton: true,
            confirmButtonText: "Submit",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/articles/decline/${id}`, { reason: result.value })
                    .then(() => {
                        Swal.fire("Success", "Article Declined!", "success");
                        refetch();
                    })
                    .catch((error) => console.error("Error declining article:", error));
            }
        });
    };

    const handleMakePremium = (id) => {
        axiosSecure.patch(`/articles/premium/${id}`)
            .then(() => {
                Swal.fire("Success", "Article marked as premium!", "success");
                refetch();
            })
            .catch((error) => console.error("Error making article premium:", error));
    };

    const handleDelete = (id) => {
        axiosSecure.delete(`/articles/${id}`)
            .then(() => {
                Swal.fire("Deleted!", "Article removed successfully!", "success");
                refetch();
            })
            .catch((error) => console.error("Error deleting article:", error));
    };

    return (
        <div className="p-6 max-w-screen-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">All Articles</h2>
            {isLoading ? <p>Loading...</p> : (
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100 text-black">
                            <th className="border p-2">Title</th>
                            <th className="border p-2">Author</th>
                            <th className="border p-2">Publisher</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((article) => (
                            <tr key={article._id}>
                                <td className="border p-2">{article.title}</td>
                                <td className="border p-2">
                                    <img src={article.authorPhoto} alt="Author" className="w-10 h-10 rounded-full mr-2 inline-block" />
                                    {article.authorName}
                                </td>
                                <td className="border p-2">{article.publisher}</td>
                                <td className="border p-2 space-x-2">
                                    {article.status === "pending" && (
                                        <>
                                            <button onClick={() => handleApprove(article._id)} className="btn btn-success">Approve</button>
                                            <button onClick={() => handleDecline(article._id)} className="btn btn-warning">Decline</button>
                                        </>
                                    )}
                                    <button onClick={() => handleMakePremium(article._id)} className="btn btn-primary">Make Premium</button>
                                    <button onClick={() => handleDelete(article._id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminAllArticles;
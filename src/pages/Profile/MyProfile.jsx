import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const MyProfile = () => {
    const { user, updateUserProfile } = useAuth()
    const [email, setEmail] = useState(user.email);
    const [name, setName] = useState(user?.displayName);
    const [photo, setPhoto] = useState(user?.photoURL || "");
    const [dbUser, setDbUser] = useState(null);
    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:5000/myProfile?email=${user.email}`)
                .then(res => {
                    if (res.data) {
                        console.log(res.data)
                        setDbUser(res.data);
                        setName(res.data.name ?? user.displayName ?? "");
                        setPhoto(res.data.photo ?? user.photoURL ?? "");
                        // setEmail(res.data.email);
                    } else {
                        console.error("User not found");
                    }
                })
                .catch(err => console.error("Error fetching user data:", err));
        }
    }, [user?.email]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();


        await updateUserProfile(name, photo);

        const updatedUserData = { email: user.email, name, photo };
        await axios.patch("http://localhost:5000/users", updatedUserData);

        Swal.fire("Success!", "Profile updated successfully!", "success");

    };


    return (
        <div className="max-w-md mx-auto p-6 bg-amber-600 shadow-md rounded-md items-center justify-center text-center flex-col flex">
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>

            {user?.photoURL && <img src={user.photoURL} alt="Profile" className="mt-4 w-24 h-24 rounded-full" />}

            <form onSubmit={handleUpdateProfile} className="mt-5 gap-3 flex-col flex items-center">

                <div className="flex gap-2 items-center">
                    <label className="">Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input w-full" />
                </div>
                <div className="flex gap-2 items-center">
                    <label className="">Email:</label>
                    <input type="text" value={email} className="input w-full" readOnly />
                </div>
                <div className="flex gap-2 items-center">
                    <label>Photo URL: </label>
                    <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} className="input w-full" />
                </div>

                <button type="submit" className="btn btn-primary mt-4">Update Profile</button>
            </form>
        </div>
    );
};

export default MyProfile;
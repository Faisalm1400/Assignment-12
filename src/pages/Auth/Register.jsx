import Lottie from "lottie-react";
import registerLottieData from "../../assets/lottie/Animation - 1745396532987.json"
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = data => {
        // console.log("Register button clicked with:", data);

        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                // console.log("Logged User:", loggedUser);

                updateUserProfile(data.name, data.photo)
                    .then(() => {
                        // console.log("User profile updated!");
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            photo: data.photo,
                        };
                        axiosPublic.post("/users", userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created successfully',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })

                    })
            })
    };


    return (
        <div className="hero bg-base-200 min-h-screen flex flex-col lg:flex-row items-center justify-center px-4">
            <div className="text-center lg:w-1/2 mb-6 lg:mb-0">
                <Lottie animationData={registerLottieData} className="max-w-sm mx-auto" />
            </div>

            <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="fieldset">
                            <h1 className="text-2xl font-bold text-center">Register Now</h1>

                            <label className="label">Name</label>
                            <input type="text" {...register("name", { required: true })} className="input w-full" placeholder="Name" />
                            {errors.name && <span className="text-red-600 text-xs">Name is required</span>}

                            <label className="label">Photo URL</label>
                            <input type="text" {...register("photo", { required: true })} className="input w-full" placeholder="Photo URL" />
                            {errors.photo && <span className="text-red-600 text-xs">Photo URL is required</span>}

                            <label className="label">Email</label>
                            <input type="email" {...register("email", { required: true })} className="input w-full" placeholder="Email" />
                            {errors.email && <span className="text-red-600 text-xs">Email is required</span>}

                            <label className="label">Password</label>
                            <input type="password" {...register("password", {
                                required: true,
                                minLength: 6,
                                pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{6,}$/
                            })} className="input w-full" placeholder="Password" />
                            {errors.password?.type === 'required' && <span className="text-red-600 text-xs">Password is required</span>}
                            {errors.password?.type === 'minLength' && <span className="text-red-600 text-xs">Password must be at least 6 characters</span>}
                            {errors.password?.type === 'pattern' && <span className="text-red-600 text-xs">Must have uppercase, number, and special character</span>}

                            <button type="submit" className="btn btn-neutral w-full mt-4">Register</button>
                        </fieldset>
                    </form>

                    <p className="text-center mt-2">
                        <small>Already have an account? <Link to="/login" className="text-blue-500">Login</Link></small>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
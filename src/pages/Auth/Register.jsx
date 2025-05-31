import Lottie from "lottie-react";
import registerLottieData from "../../assets/lottie/Animation - 1745396532987.json"
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContextProvider";

const Register = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = data => {
        // console.log("Register button clicked with:", data);

        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log("Logged User:", loggedUser);

                updateUserProfile(data.name, data.photo)
                    .then(() => {
                        console.log("User profile updated!");
                        reset();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'User created successfully',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/');
                    })
            })
    };


    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left w-2xl">
                    <Lottie animationData={registerLottieData} />
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset className="fieldset">
                                <label className="label">Name</label>
                                <input type="text" {...register("name", { required: true })} name="name" className="input" placeholder="Name" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                                <label className="label">Photo URL</label>
                                <input type="text" {...register("photo", { required: true })} name="photo" className="input" placeholder="Photo URL" />
                                {errors.photo && <span className="text-red-600">Photo URL is required</span>}
                                <label className="label">Email</label>
                                <input type="email" {...register("email", { required: true })} name="email" className="input" placeholder="Email" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                                <label className="label">Password</label>
                                <input type="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{6,}$/
                                })} name="password" className="input" placeholder="Password" />
                                {errors.password?.type === 'required' && <span className="text-red-600">Password is required</span>}
                                {errors.password?.type === 'minLength' && <span className="text-red-600">Password must be 6 characters</span>}
                                {errors.password?.type === 'pattern' && <span className="text-red-600">Password must have one upper case, one lower case, one number, one special character</span>}
                                <input className="btn btn-neutral mt-4" type="submit" value="Register" />
                            </fieldset>
                        </form>
                        <p><small>Already have an account? <Link to={'/login'}>Login</Link></small></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
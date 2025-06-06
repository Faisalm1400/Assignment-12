import Lottie from "lottie-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import loginLottieJSON from "../../assets/lottie/login.json"
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const Login = () => {
    const { signIn, setUser, googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        // console.log(email, password);

        signIn(email, password)
            .then(result => {
                const user = result.user;
                // console.log(user);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User logged in successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true });
            })

    }

    const handleGoogleSignInClick = () => {
        googleSignIn()
            .then((result) => {
                // console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photo: result.user?.photoURL
                }

                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        setUser(res.user);
                        navigate(location?.state ? location.state : "/");
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'User logged in successfully',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })

            })
    };


    return (
        <div className="hero bg-base-200 min-h-screen flex flex-col lg:flex-row items-center justify-center px-4">
            <div className="text-center lg:w-1/2 mb-6 lg:mb-0">
                <Lottie animationData={loginLottieJSON} className="max-w-sm mx-auto" />
            </div>

            <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
                <div className="card-body">
                    <form onSubmit={handleLogin}>
                        <fieldset className="fieldset">
                            <h1 className="text-2xl font-bold text-center">Login now!</h1>
                            <label className="label">Email</label>
                            <input type="email" className="input w-full" placeholder="Email" name='email' required />
                            <label className="label">Password</label>
                            <input type="password" className="input w-full" placeholder="Password" name='password' required />
                            <button className="btn btn-neutral w-full mt-4">Log In</button>
                        </fieldset>
                    </form>
                    <p className="text-center mt-2">
                        <small>New here? <Link to={'/register'} className="text-blue-500">Create an account</Link></small>
                    </p>
                    <div className="form-control mt-4">
                        <button onClick={handleGoogleSignInClick} className="btn w-full rounded-md text-black bg-amber-100 flex items-center justify-center">
                            <FcGoogle className="mr-2" /> Login with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Login;
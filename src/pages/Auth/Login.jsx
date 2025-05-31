import Lottie from "lottie-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import loginLottieJSON from "../../assets/lottie/login.json"
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";


const Login = () => {
    const { signIn, setUser, googleSignIn } = useAuth();
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
                console.log(user);
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
                setUser(result.user);
                navigate(location?.state ? location.state : "/");

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User logged in successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    };


    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left w-2xl">
                    <Lottie animationData={loginLottieJSON} />
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <fieldset className="fieldset">
                                <h1 className="text-2xl font-bold mx-auto my-2">Login now!</h1>
                                <label className="label">Email</label>
                                <input type="email" className="input" placeholder="Email" name='email' />
                                <label className="label">Password</label>
                                <input type="password" className="input" placeholder="Password" name='password' />
                                <button className="btn btn-neutral mt-4">Log In</button>
                            </fieldset>
                        </form>
                        <p><small>New here? <Link to={'/register'}>Create an account</Link></small></p>
                        <div className="form-control">
                            <button onClick={handleGoogleSignInClick} className="btn w-full rounded-md text-black bg-amber-100"><FcGoogle />Login with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
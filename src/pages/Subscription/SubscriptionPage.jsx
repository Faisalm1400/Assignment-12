import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import banner from '../../assets/images/Subcription.png';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const SubscriptionPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedPlan, setSelectedPlan] = useState(null);
    const axiosPublic = useAxiosPublic();

    const plans = [
        { value: 1 / 1440, label: "1 Minute - $0.10" },
        { value: 5, label: "5 Days - $5.99" },
        { value: 10, label: "10 Days - $9.99" },
    ];

    const handleSubscribe = () => {
        if (!selectedPlan) return alert("Please select a plan!");

        axiosPublic.patch("/users/subscribe", { email: user.email, duration: selectedPlan.value })
            .then(() => {
                alert("Subscription activated!");
                navigate("/");
            })
            .catch((error) => console.error("Subscription error:", error));
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-md shadow-lg text-black my-6">
            <h2 className="text-3xl font-bold text-center">Get Premium Access!</h2>

            <div className="flex justify-center mt-4">
                <img src={banner} alt="Subscription Banner" className="w-full rounded-md" />
            </div>

            <div className="mt-6">
                <label className="block text-lg font-semibold">Select Subscription Plan:</label>
                <select
                    className="w-full p-2 border rounded-md mt-2"
                    onChange={(e) => setSelectedPlan(plans.find(plan => plan.value == e.target.value))}
                >
                    <option value="">Choose Plan</option>
                    {plans.map(plan => (
                        <option key={plan.value} value={plan.value}>{plan.label}</option>
                    ))}
                </select>
            </div>

            <button
                onClick={handleSubscribe}
                className="btn btn-primary w-full mt-6"
            >
                Subscribe Now
            </button>
        </div>
    );
};

export default SubscriptionPage;
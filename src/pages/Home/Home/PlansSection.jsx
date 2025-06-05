import { useNavigate } from "react-router-dom";

const PlansSection = () => {
    const navigate = useNavigate();
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Choose Your Plan</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Free Plan */}
                <div className="card w-96 bg-cyan-500 shadow-sm">
                    <div className="card-body">
                        <span className="badge badge-xs badge-accent">Basic Access</span>
                        <div className="flex justify-between">
                            <h2 className="text-3xl font-bold">Free</h2>
                            <span className="text-xl">$0/mo</span>
                        </div>
                        <ul className="mt-6 flex flex-col gap-2 text-xs">
                            <li>
                                ✅ Access to public articles
                            </li>
                            <li>
                                ❌ No premium content
                            </li>
                            <li>
                                ❌ Limited features
                            </li>
                        </ul>
                        <div className="mt-6">
                            <button
                                onClick={() => navigate("/subscription")}
                                className="btn btn-outline btn-block"
                            >
                                Get Free Plan
                            </button>
                        </div>
                    </div>
                </div>

                {/* Premium Plan */}
                <div className="card w-96 bg-fuchsia-500 shadow-sm">
                    <div className="card-body">
                        <span className="badge badge-xs badge-warning">Most Popular</span>
                        <div className="flex justify-between">
                            <h2 className="text-3xl font-bold">Premium</h2>
                            <span className="text-xl">$29/mo</span>
                        </div>
                        <ul className="mt-6 flex flex-col gap-2 text-xs">
                            <li>
                                ✅ Access to **exclusive premium articles**
                            </li>
                            <li>
                                ✅ No ads & better reading experience
                            </li>
                            <li>
                                ✅ Extra features & advanced analytics
                            </li>
                        </ul>
                        <div className="mt-6">
                            <button
                                onClick={() => navigate("/subscription")}
                                className="btn btn-primary btn-block"
                            >
                                Subscribe Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlansSection;
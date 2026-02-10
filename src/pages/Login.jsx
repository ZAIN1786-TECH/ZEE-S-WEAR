import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
    const { signupWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Get the page they came from, or default to home
    const from = location.state?.from?.pathname || "/";

    const handleGoogleSignIn = async () => {
        try {
            await signupWithGoogle();
            navigate(from, { replace: true });
        } catch (error) {
            console.error("Failed to sign in", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-display font-bold text-gray-900">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sign in to access your account
                    </p>
                </div>

                <div className="mt-8 space-y-6">
                    <button
                        onClick={handleGoogleSignIn}
                        className="group relative w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold transition-colors duration-200"
                    >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                className="h-5 w-5"
                                alt="Google logo"
                            />
                        </span>
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;

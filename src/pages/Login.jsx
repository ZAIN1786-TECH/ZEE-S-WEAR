import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
    const { signInWithGoogle } = useAuth();
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [authError, setAuthError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Get the page they came from, or default to home
    const from = location.state?.from?.pathname || "/";

    const getAuthErrorMessage = (code) => {
        switch (code) {
            case 'auth/popup-closed-by-user':
                return 'Sign-in window was closed before completion.';
            case 'auth/popup-blocked':
                return 'Popup was blocked by your browser. Please allow popups and try again.';
            case 'auth/cancelled-popup-request':
                return 'Another sign-in attempt is already in progress. Please wait a moment and retry.';
            case 'auth/network-request-failed':
                return 'Network error. Check your internet connection and try again.';
            case 'auth/too-many-requests':
                return 'Too many attempts. Please wait and try again later.';
            default:
                return 'Sign-in failed. Please try again.';
        }
    };

    const handleGoogleSignIn = async () => {
        setAuthError('');
        setIsLoggingIn(true);
        try {
            await signInWithGoogle();
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Failed to sign in', {
                code: error?.code,
                message: error?.message,
            });
            setAuthError(getAuthErrorMessage(error?.code));
        } finally {
            setIsLoggingIn(false);
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
                    {authError && (
                        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert" aria-live="polite">
                            {authError}
                        </div>
                    )}
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={isLoggingIn}
                        className="group relative w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                className="h-5 w-5"
                                alt="Google logo"
                            />
                        </span>
                        {isLoggingIn ? "Signing in..." : "Sign in with Google"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;

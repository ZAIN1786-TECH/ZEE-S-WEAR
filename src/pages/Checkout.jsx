import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useCart } from '../Context/CartContext';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import PaymentForm from '../components/checkout/PaymentForm';

const Checkout = () => {
    const { currentUser } = useAuth();
    const { cartItems, getCartTotal } = useCart();
    const location = useLocation();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    if (!currentUser) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (cartItems.length === 0) {
        return <Navigate to="/cart" replace />;
    }

    const handlePaymentSubmit = async (cardData) => {
        setIsProcessing(true);

        // Simulate network delay for payment processing
        setTimeout(() => {
            setIsProcessing(false);
            navigate('/order-success');
        }, 2000);
    };

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-display font-bold mb-8 text-center">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Checkout Form */}
                    <div>
                        <h2 className="text-xl font-medium mb-6">Contact Information</h2>
                        <div className="mb-6 p-4 bg-gray-50 rounded-md border border-gray-200">
                            <p className="text-sm text-gray-500">Logged in as:</p>
                            <p className="font-medium text-gray-900">{currentUser.email}</p>
                        </div>

                        <form className="space-y-4 mb-10">
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="First Name" className="p-3 border border-gray-300 rounded-md w-full" />
                                <input type="text" placeholder="Last Name" className="p-3 border border-gray-300 rounded-md w-full" />
                            </div>
                            <input type="text" placeholder="Address" className="p-3 border border-gray-300 rounded-md w-full" />
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="City" className="p-3 border border-gray-300 rounded-md w-full" />
                                <input type="text" placeholder="Postal Code" className="p-3 border border-gray-300 rounded-md w-full" />
                            </div>
                        </form>

                        <h2 className="text-xl font-medium mb-6">Payment</h2>
                        <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
                            <PaymentForm onSubmit={handlePaymentSubmit} isProcessing={isProcessing} />
                        </div>
                    </div>

                    {/* Order Review */}
                    <div className="bg-gray-50 p-6 rounded-lg h-fit">
                        <h2 className="text-xl font-medium mb-6">Order Review</h2>
                        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                            {cartItems.map((item) => (
                                <div key={`${item.id}-${item.size}`} className="flex justify-between">
                                    <div className="flex gap-4">
                                        <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-medium line-clamp-1">{item.title}</p>
                                            <p className="text-sm text-gray-500">Size: {item.size} x {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-200 mt-6 pt-6 space-y-2">
                            <div className="flex justify-between">
                                <p className="text-gray-600">Subtotal</p>
                                <p className="font-medium">${getCartTotal().toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-600">Shipping</p>
                                <p className="font-medium">Free</p>
                            </div>
                            <div className="flex justify-between text-lg font-bold mt-4">
                                <p>Total</p>
                                <p>${getCartTotal().toFixed(2)}</p>
                            </div>
                        </div>

                        <Button
                            className="w-full mt-6"
                            onClick={() => document.querySelector('form[class*="space-y-4"]').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
                            disabled={isProcessing}
                        >
                            {isProcessing ? 'Processing...' : `Pay $${getCartTotal().toFixed(2)}`}
                        </Button>
                        <p className="text-xs text-center text-gray-500 mt-4">
                            Secure payment processing powered by Stripe.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

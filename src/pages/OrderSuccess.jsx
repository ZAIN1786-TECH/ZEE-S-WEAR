import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../Context/CartContext';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
    const { clearCart } = useCart();
    const navigate = useNavigate();

    // Generate a random order ID
    const orderId = '#ORD-' + Math.floor(100000 + Math.random() * 900000);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg text-center"
            >
                <div className="flex justify-center">
                    <div className="rounded-full bg-green-100 p-3">
                        <CheckCircle className="h-12 w-12 text-green-600" />
                    </div>
                </div>

                <div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Order Placed!
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Thank you for your purchase. Your order has been successfully processed.
                    </p>
                </div>

                <div className="border-t border-b border-gray-200 py-4">
                    <p className="text-sm font-medium text-gray-500">Order ID</p>
                    <p className="text-lg font-bold text-gray-900">{orderId}</p>
                    <p className="text-xs text-gray-400 mt-1">A confirmation email has been sent to your inbox.</p>
                </div>

                <div className="space-y-4">
                    <Link to="/shop">
                        <Button className="w-full flex items-center justify-center">
                            <ShoppingBag className="mr-2 h-5 w-5" />
                            Continue Shopping
                        </Button>
                    </Link>

                    <Link to="/" className="block text-sm font-medium text-brand-gold hover:text-yellow-600">
                        Return to Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default OrderSuccess;

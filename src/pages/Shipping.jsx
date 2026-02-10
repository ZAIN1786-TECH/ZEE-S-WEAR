import React from 'react';
import { motion } from 'framer-motion';

const Shipping = () => {
    return (
        <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl font-display font-bold text-gray-900 mb-8 text-center">Shipping & Returns</h1>

                    <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Policy</h2>
                            <p>
                                We strive to deliver your order as quickly as possible. All orders are processed within 1-2 business days.
                            </p>
                            <ul className="list-disc pl-5 mt-4 space-y-2">
                                <li><strong>Standard Shipping:</strong> 5-7 business days ($5.99, Free on orders over $100)</li>
                                <li><strong>Express Shipping:</strong> 2-3 business days ($15.00)</li>
                                <li><strong>Overnight Shipping:</strong> 1 business day ($25.00)</li>
                            </ul>
                            <p className="mt-4 text-sm text-gray-500 italic">
                                *Shipping times are estimates and start from the date of dispatch.
                            </p>
                        </section>

                        <div className="border-t border-gray-200 my-8"></div>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Return Policy</h2>
                            <p>
                                We want you to be completely satisfied with your purchase. If you're not happy, you can return your items within 30 days of delivery.
                            </p>
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mt-6">
                                <h3 className="font-bold text-lg mb-3">Conditions for Returns:</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Items must be unworn, unwashed, and in original condition.</li>
                                    <li>Original tags must be attached.</li>
                                    <li>Final sale items cannot be returned.</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Initiate a Return</h2>
                            <ol className="list-decimal pl-5 space-y-3">
                                <li>Log in to your account and go to "Order History".</li>
                                <li>Select the order and items you wish to return.</li>
                                <li>Print the prepaid shipping label sent to your email.</li>
                                <li>Pack your items and drop off the package at the nearest carrier location.</li>
                            </ol>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Shipping;

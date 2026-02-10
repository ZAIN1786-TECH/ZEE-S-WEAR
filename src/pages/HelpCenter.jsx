import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, MessageCircle, FileQuestion, Truck } from 'lucide-react';

const HelpCenter = () => {
    const faqs = [
        {
            question: "How do I track my order?",
            answer: "Once your order ships, you will receive an email with a tracking number and link. You can also view your order status in your account dashboard."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay."
        },
        {
            question: "How can I change or cancel my order?",
            answer: "Please contact our support team immediately if you need to make changes. Once an order has been processed, we cannot modify it, but we can help with a return."
        },
        {
            question: "Do you offer international shipping?",
            answer: "Yes, we ship to over 50 countries worldwide. Shipping costs and times vary by location."
        }
    ];

    return (
        <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">Help Center</h1>
                        <p className="text-lg text-gray-600">Find answers to frequently asked questions.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                            <Truck className="w-10 h-10 text-brand-gold mb-4" />
                            <h3 className="font-bold text-lg mb-2">Shipping & Delivery</h3>
                            <p className="text-sm text-gray-500">Track orders and shipping info</p>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                            <MessageCircle className="w-10 h-10 text-brand-gold mb-4" />
                            <h3 className="font-bold text-lg mb-2">Returns & Refunds</h3>
                            <p className="text-sm text-gray-500">Return policy and process</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b border-gray-100 pb-6 last:border-0">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h3>
                                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HelpCenter;

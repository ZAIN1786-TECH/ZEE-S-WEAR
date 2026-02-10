import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Button from '../components/ui/Button';

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        alert('Message sent! We will get back to you shortly.');
    };

    return (
        <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                >
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">Get in Touch</h1>
                            <p className="text-gray-600 text-lg">
                                Have questions about our products or your order? We're here to help.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="bg-gray-100 p-3 rounded-full">
                                    <Mail className="w-6 h-6 text-brand-black" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Email</h3>
                                    <p className="text-gray-600">support@zeeswear.com</p>
                                    <p className="text-sm text-gray-500 mt-1">Response within 24 hours</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="bg-gray-100 p-3 rounded-full">
                                    <Phone className="w-6 h-6 text-brand-black" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Phone</h3>
                                    <p className="text-gray-600">+1 (555) 123-4567</p>
                                    <p className="text-sm text-gray-500 mt-1">Mon-Fri, 9am-6pm EST</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="bg-gray-100 p-3 rounded-full">
                                    <MapPin className="w-6 h-6 text-brand-black" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Office</h3>
                                    <p className="text-gray-600">123 Fashion Ave,<br />New York, NY 10001</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all" placeholder="John" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all" placeholder="Doe" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all" placeholder="john@example.com" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea rows="4" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all" placeholder="How can we help you?" required></textarea>
                            </div>
                            <Button className="w-full flex items-center justify-center">
                                <Send className="w-4 h-4 mr-2" />
                                Send Message
                            </Button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;

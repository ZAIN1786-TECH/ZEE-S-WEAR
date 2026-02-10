import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-brand-black text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand Info */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-display font-bold text-white">ZEES WEAR</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Premium fashion for the modern individual. Elevate your style with our curated collections.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h4 className="font-bold mb-6 text-brand-gold">SHOP</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link to="/shop?category=new" className="hover:text-white transition-colors">New Arrivals</Link></li>
                            <li><Link to="/shop?category=men" className="hover:text-white transition-colors">Men</Link></li>
                            <li><Link to="/shop?category=women" className="hover:text-white transition-colors">Women</Link></li>
                            <li><Link to="/shop?category=accessories" className="hover:text-white transition-colors">Accessories</Link></li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="font-bold mb-6 text-brand-gold">SUPPORT</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                            <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
                            <li><Link to="/size-guide" className="hover:text-white transition-colors">Size Guide</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-bold mb-6 text-brand-gold">STAY IN TOUCH</h4>
                        <p className="text-gray-400 text-sm mb-4">Subscribe for exclusive offers and updates.</p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-gray-800 text-white px-4 py-2 w-full text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold"
                            />
                            <button className="bg-brand-gold text-brand-black px-4 py-2 font-bold hover:bg-white transition-colors">
                                JOIN
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-xs">
                    <p>&copy; {new Date().getFullYear()} Zees Wear. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

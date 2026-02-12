import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, Heart, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../Context/AuthContext';
import { useCart } from '../../Context/CartContext';
import { useWishlist } from '../../Context/WishlistContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentUser, logout } = useAuth();
    const { getCartCount } = useCart();
    const { wishlistItems } = useWishlist();
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    // Search State
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const searchRef = useRef(null);
    const userMenuRef = useRef(null);
    const navigate = useNavigate();

    const toggleMenu = () => setIsOpen(!isOpen);

    // Fetch products for search once
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                setAllProducts(data);
            } catch (error) {
                console.error("Failed to fetch products for search", error);
            }
        };
        fetchProducts();
    }, []);

    // Filter products based on query
    useEffect(() => {
        if (searchQuery.length > 1) {
            const results = allProducts.filter(product =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(results.slice(0, 5)); // Limit to 5 results
        } else {
            setSearchResults([]);
        }
    }, [searchQuery, allProducts]);

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            setUserMenuOpen(false);
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    const handleSearchClick = (productId) => {
        navigate(`/product/${productId}`);
        setIsSearchOpen(false);
        setSearchQuery('');
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'Collections', path: '/shop' },
        { name: 'About', path: '/about' },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-display font-bold text-brand-black tracking-tight">
                        ZEES WEAR
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-brand-black hover:text-brand-gold transition-colors duration-200 font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center space-x-6 relative">
                        {/* Search Bar */}
                        <div className="relative" ref={searchRef}>
                            <div className={`flex items-center transition-all duration-300 ${isSearchOpen ? 'w-64 bg-gray-100 rounded-full px-3 py-1' : 'w-auto'}`}>
                                <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-brand-black hover:text-brand-gold transition-colors">
                                    <Search size={20} />
                                </button>
                                {isSearchOpen && (
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="ml-2 bg-transparent border-none focus:ring-0 text-sm w-full outline-none"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        autoFocus
                                    />
                                )}
                            </div>

                            {/* Search Dropdown */}
                            <AnimatePresence>
                                {isSearchOpen && searchResults.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50"
                                    >
                                        {searchResults.map(product => (
                                            <div
                                                key={product.id}
                                                onClick={() => handleSearchClick(product.id)}
                                                className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"
                                            >
                                                <img src={product.image} alt={product.title} className="w-10 h-10 object-contain mr-3" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">{product.title}</p>
                                                    <p className="text-xs text-gray-500">${product.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link to="/wishlist" className="text-brand-black hover:text-brand-gold transition-colors relative">
                            <Heart size={20} />
                            {wishlistItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </Link>

                        <Link to="/cart" className="text-brand-black hover:text-brand-gold transition-colors relative">
                            <ShoppingBag size={20} />
                            {getCartCount() > 0 && (
                                <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                                    {getCartCount()}
                                </span>
                            )}
                        </Link>

                        {currentUser ? (
                            <div className="relative" ref={userMenuRef}>
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center space-x-2 text-brand-black hover:text-brand-gold transition-colors"
                                >
                                    {currentUser.photoURL ? (
                                        <img src={currentUser.photoURL} alt="Profile" className="w-8 h-8 rounded-full border border-gray-200 object-cover" />
                                    ) : (
                                        <User size={20} />
                                    )}
                                </button>

                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100">
                                        <div className="px-4 py-2 border-b border-gray-100">
                                            <p className="text-sm font-medium text-gray-900 truncate">{currentUser.displayName}</p>
                                            <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                                        >
                                            <LogOut size={16} className="mr-2" /> Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="text-brand-black hover:text-brand-gold transition-colors">
                                <User size={20} />
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button, Search & Cart */}
                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={() => {
                                setIsSearchOpen(!isSearchOpen);
                                setIsOpen(false); // Close menu if open
                            }}
                            className="text-brand-black"
                        >
                            <Search size={24} />
                        </button>

                        <Link to="/cart" className="text-brand-black relative">
                            <ShoppingBag size={24} />
                            {getCartCount() > 0 && (
                                <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                                    {getCartCount()}
                                </span>
                            )}
                        </Link>

                        <button onClick={toggleMenu} className="text-brand-black">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="block py-3 text-brand-black hover:text-brand-gold font-medium border-b border-gray-50"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex items-center space-x-6 pt-4 border-t border-gray-50 mt-2">
                                <button
                                    onClick={() => {
                                        setIsSearchOpen(true);
                                        setIsOpen(false);
                                    }}
                                    className="text-brand-black"
                                >
                                    <Search size={20} />
                                </button>

                                <Link
                                    to="/wishlist"
                                    onClick={() => setIsOpen(false)}
                                    className="text-brand-black relative"
                                >
                                    <Heart size={20} />
                                    {wishlistItems.length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                                            {wishlistItems.length}
                                        </span>
                                    )}
                                </Link>

                                <Link
                                    to="/cart"
                                    onClick={() => setIsOpen(false)}
                                    className="text-brand-black relative"
                                >
                                    <ShoppingBag size={20} />
                                    {getCartCount() > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                                            {getCartCount()}
                                        </span>
                                    )}
                                </Link>

                                {currentUser ? (
                                    <div className="flex items-center justify-between w-full pt-4 border-t border-gray-50 mt-4">
                                        <div className="flex items-center space-x-3">
                                            {currentUser.photoURL ? (
                                                <img src={currentUser.photoURL} alt="Profile" className="w-8 h-8 rounded-full border border-gray-200 object-cover" />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                                    <User size={16} className="text-gray-600" />
                                                </div>
                                            )}
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-gray-900">{currentUser.displayName}</span>
                                                <span className="text-xs text-gray-500">{currentUser.email}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setIsOpen(false);
                                            }}
                                            className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                                        >
                                            <LogOut size={20} />
                                        </button>
                                    </div>
                                ) : (
                                    <Link
                                        to="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center space-x-2 text-brand-black font-medium"
                                    >
                                        <User size={20} />
                                        <span>Log In</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Mobile Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 p-4 shadow-lg z-40"
                    >
                        <div className="relative">
                            <Search className="absolute left-4 top-3 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold outline-none transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                            />
                            <button
                                onClick={() => setIsSearchOpen(false)}
                                className="absolute right-3 top-2.5 text-gray-400 p-1"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Mobile Search Results */}
                        {searchResults.length > 0 && (
                            <div className="mt-4 bg-white rounded-lg border border-gray-100 shadow-sm max-h-60 overflow-y-auto">
                                {searchResults.map(product => (
                                    <div
                                        key={product.id}
                                        onClick={() => handleSearchClick(product.id)}
                                        className="flex items-center p-3 border-b border-gray-50 last:border-0 active:bg-gray-50"
                                    >
                                        <img src={product.image} alt={product.title} className="w-10 h-10 object-contain mr-3" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{product.title}</p>
                                            <p className="text-sm text-brand-gold font-bold">${product.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

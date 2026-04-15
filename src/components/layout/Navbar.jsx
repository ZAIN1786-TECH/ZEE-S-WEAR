import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, Heart, LogOut, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../Context/AuthContext';
import { useCart } from '../../Context/CartContext';
import { useWishlist } from '../../Context/WishlistContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { currentUser, logout } = useAuth();
    const { getCartCount } = useCart();
    const { wishlistItems } = useWishlist();
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Search State
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const searchRef = useRef(null);
    const userMenuRef = useRef(null);
    const navigate = useNavigate();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 8);
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
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
        setIsMenuOpen(false);
        setSearchQuery('');
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'Lookbook', path: '/lookbook' },
        { name: 'About', path: '/about' },
    ];

    const navLinkClass = ({ isActive }) => (
        `relative text-sm font-semibold uppercase tracking-[0.12em] transition-colors ${isActive ? 'text-brand-gold' : 'text-brand-black hover:text-brand-gold'}`
    );

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md border-gray-200 shadow-sm' : 'bg-white/90 backdrop-blur-sm border-gray-100'}`}>
            <div className="bg-brand-black text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                    <p className="text-center text-[11px] sm:text-xs uppercase tracking-[0.16em] font-medium">
                        Free shipping on all orders over $99
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-16 flex items-center justify-between">
                    <Link to="/" className="text-[1.7rem] leading-none font-display font-bold text-brand-black tracking-tight" onClick={() => navigate('/')}>
                        ZEES WEAR
                    </Link>

                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <NavLink key={link.name} to={link.path} className={navLinkClass}>
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-2" ref={searchRef}>
                        <button
                            onClick={() => {
                                setIsSearchOpen((prev) => !prev);
                                setIsMenuOpen(false);
                            }}
                            className="h-10 px-3 rounded-full text-brand-black hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                            aria-label="Search products"
                        >
                            <Search size={18} />
                            <span className="text-xs font-semibold uppercase tracking-[0.12em]">Search</span>
                        </button>

                        <Link to="/wishlist" className="h-10 w-10 rounded-full text-brand-black hover:bg-gray-100 transition-colors inline-flex items-center justify-center relative" aria-label="Wishlist">
                            <Heart size={18} />
                            {wishlistItems.length > 0 && (
                                <span className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 bg-red-500 text-white text-[10px] min-w-4 h-4 px-1 flex items-center justify-center rounded-full">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </Link>

                        <Link to="/cart" className="h-10 px-3 rounded-full text-brand-black hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2 relative" aria-label="Cart">
                            <ShoppingBag size={18} />
                            <span className="text-xs font-semibold uppercase tracking-[0.12em]">Cart</span>
                            {getCartCount() > 0 && (
                                <span className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 bg-brand-gold text-white text-[10px] min-w-4 h-4 px-1 flex items-center justify-center rounded-full">
                                    {getCartCount()}
                                </span>
                            )}
                        </Link>

                        {currentUser ? (
                            <div className="relative" ref={userMenuRef}>
                                <button
                                    onClick={() => setUserMenuOpen((prev) => !prev)}
                                    className="h-10 pl-2 pr-3 rounded-full border border-gray-200 hover:border-gray-300 transition-colors inline-flex items-center gap-2"
                                >
                                    {currentUser.photoURL ? (
                                        <img src={currentUser.photoURL} alt="Profile" className="w-7 h-7 rounded-full border border-gray-200 object-cover" />
                                    ) : (
                                        <span className="w-7 h-7 rounded-full bg-gray-100 inline-flex items-center justify-center">
                                            <User size={14} className="text-gray-700" />
                                        </span>
                                    )}
                                    <span className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-black">Account</span>
                                    <ChevronDown size={14} className="text-gray-500" />
                                </button>

                                <AnimatePresence>
                                    {userMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 8 }}
                                            className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                                        >
                                            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                                                <p className="text-sm font-semibold text-gray-900 truncate">{currentUser.displayName || 'Signed in user'}</p>
                                                <p className="text-xs text-gray-600 truncate">{currentUser.email}</p>
                                            </div>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 inline-flex items-center"
                                            >
                                                <LogOut size={16} className="mr-2" />
                                                Sign out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link to="/login" className="h-10 px-4 rounded-full border border-gray-200 hover:border-brand-gold hover:text-brand-gold transition-colors inline-flex items-center gap-2 text-brand-black">
                                <User size={16} />
                                <span className="text-xs font-semibold uppercase tracking-[0.1em]">Sign in</span>
                            </Link>
                        )}
                    </div>

                    <div className="md:hidden flex items-center gap-2" ref={searchRef}>
                        <button
                            onClick={() => {
                                setIsSearchOpen((prev) => !prev);
                                setIsMenuOpen(false);
                            }}
                            className="h-10 w-10 rounded-full hover:bg-gray-100 text-brand-black inline-flex items-center justify-center"
                            aria-label="Search"
                        >
                            <Search size={20} />
                        </button>

                        <Link to="/cart" className="h-10 w-10 rounded-full hover:bg-gray-100 text-brand-black inline-flex items-center justify-center relative" aria-label="Cart">
                            <ShoppingBag size={20} />
                            {getCartCount() > 0 && (
                                <span className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 bg-brand-gold text-white text-[10px] min-w-4 h-4 px-1 flex items-center justify-center rounded-full">
                                    {getCartCount()}
                                </span>
                            )}
                        </Link>

                        <button onClick={toggleMenu} className="h-10 w-10 rounded-full hover:bg-gray-100 text-brand-black inline-flex items-center justify-center" aria-label="Toggle menu">
                            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="hidden md:block absolute left-1/2 -translate-x-1/2 top-[4.9rem] w-[min(680px,calc(100%-2rem))] bg-white border border-gray-100 rounded-2xl shadow-xl p-4"
                    >
                        <div className="relative">
                            <Search className="absolute left-4 top-3 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search products, categories, styles..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-11 pr-4 focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold outline-none transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                            />
                        </div>
                        {searchResults.length > 0 && (
                            <div className="mt-3 rounded-xl border border-gray-100 overflow-hidden">
                                {searchResults.map((product) => (
                                    <button
                                        key={product.id}
                                        onClick={() => handleSearchClick(product.id)}
                                        className="w-full text-left flex items-center p-3 hover:bg-gray-50 border-b border-gray-50 last:border-0"
                                    >
                                        <img src={product.image} alt={product.title} className="w-10 h-10 object-contain mr-3" />
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium text-gray-900 truncate">{product.title}</p>
                                            <p className="text-xs text-gray-500">${product.price}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    className={({ isActive }) => `block py-3 border-b border-gray-50 text-sm font-semibold uppercase tracking-[0.1em] ${isActive ? 'text-brand-gold' : 'text-brand-black hover:text-brand-gold'}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </NavLink>
                            ))}

                            <div className="flex items-center space-x-6 pt-4 border-t border-gray-50 mt-2">
                                <button
                                    onClick={() => {
                                        setIsSearchOpen(true);
                                        setIsMenuOpen(false);
                                    }}
                                    className="text-brand-black"
                                >
                                    <Search size={20} />
                                </button>

                                <Link
                                    to="/wishlist"
                                    onClick={() => setIsMenuOpen(false)}
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
                                    onClick={() => setIsMenuOpen(false)}
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
                                                setIsMenuOpen(false);
                                            }}
                                            className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                                        >
                                            <LogOut size={20} />
                                        </button>
                                    </div>
                                ) : (
                                    <Link
                                        to="/login"
                                        onClick={() => setIsMenuOpen(false)}
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

            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="md:hidden absolute top-[4.9rem] left-0 w-full bg-white border-b border-gray-100 p-4 shadow-lg z-40"
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

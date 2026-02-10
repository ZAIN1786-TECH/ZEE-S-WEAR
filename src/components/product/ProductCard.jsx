import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { addToCart } = useCart();
    const isWishlisted = isInWishlist(product.id);

    const handleWishlistClick = (e) => {
        e.preventDefault(); // Prevent link navigation
        toggleWishlist(product);
    };

    const handleQuickAdd = (e) => {
        e.preventDefault();
        addToCart(product, 1, 'M'); // Default add
    };

    return (
        <div className="group relative">
            <div className="aspect-[3/4] w-full overflow-hidden bg-gray-200 relative">
                <Link to={`/product/${product.id}`}>
                    <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                </Link>

                {/* Badges */}
                {product.isNew && (
                    <span className="absolute top-2 left-2 bg-brand-black text-white text-xs font-bold px-2 py-1 uppercase">
                        New
                    </span>
                )}
                {product.discount && (
                    <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 uppercase">
                        -{product.discount}%
                    </span>
                )}

                {/* Hover Actions */}
                <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center gap-2">
                    <button
                        onClick={handleWishlistClick}
                        className={`p-3 rounded-full shadow-lg transition-colors ${isWishlisted
                                ? 'bg-red-50 text-red-600'
                                : 'bg-white hover:bg-brand-gold hover:text-white'
                            }`}
                    >
                        <Heart size={18} className={isWishlisted ? 'fill-current' : ''} />
                    </button>
                    <button
                        onClick={handleQuickAdd}
                        className="bg-white p-3 rounded-full shadow-lg hover:bg-brand-gold hover:text-white transition-colors"
                    >
                        <ShoppingBag size={18} />
                    </button>
                </div>
            </div>

            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm font-medium text-gray-900">
                        <Link to={`/product/${product.id}`}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                        </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">${product.price}</p>
            </div>
        </div>
    );
};

export default ProductCard;

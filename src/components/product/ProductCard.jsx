import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../Context/WishlistContext';
import { useCart } from '../../Context/CartContext';

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

            <div className="mt-2 md:mt-4 flex justify-between items-start gap-2">
                <div className="min-w-0 flex-1">
                    <h3 className="text-xs md:text-sm font-medium text-gray-900 truncate">
                        <Link to={`/product/${product.id}`}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                        </Link>
                    </h3>
                    <p className="mt-0.5 text-[10px] md:text-sm text-gray-500 truncate">{product.category}</p>
                </div>
                <p className="text-xs md:text-sm font-bold md:font-medium text-gray-900 whitespace-nowrap">${product.price}</p>
            </div>
        </div>
    );
};

export default ProductCard;

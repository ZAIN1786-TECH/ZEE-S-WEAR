import React, { useState } from 'react';
import { Heart, ShoppingBag, Truck, RotateCcw, ShieldCheck, Star } from 'lucide-react';
import Button from '../ui/Button';
import { useCart } from '../../Context/CartContext';
import { useWishlist } from '../../Context/WishlistContext';

const ProductInfo = ({ product }) => {
    const [selectedSize, setSelectedSize] = useState('M');
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const isWishlisted = product ? isInWishlist(product.id) : false;

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity, selectedSize);
        }
    };

    return (
        <div className="flex flex-col space-y-6">
            <div className="border-b border-gray-200 pb-6">
                <h1 className="text-3xl font-display font-bold text-gray-900">{product.name}</h1>
                <div className="mt-4 flex items-center justify-between">
                    <p className="text-2xl text-gray-900 font-medium">${product.price}</p>
                    <div className="flex items-center">
                        <div className="flex items-center text-brand-gold">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill="currentColor" />
                            ))}
                        </div>
                        <p className="ml-2 text-sm text-gray-500">(124 reviews)</p>
                    </div>
                </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
                {product.description}
            </p>

            {/* Size Selector */}
            <div>
                <div className="flex justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <button className="text-sm text-brand-gold underline">Size Guide</button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                    {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`py-3 text-sm font-medium border-2 transition-all ${selectedSize === size
                                ? 'border-brand-black bg-brand-black text-white'
                                : 'border-gray-200 text-gray-900 hover:border-brand-black'
                                }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-4 pt-4 border-t border-gray-200">
                <div className="w-32 flex items-center border border-gray-300">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-full flex items-center justify-center hover:bg-gray-100"
                    >
                        -
                    </button>
                    <input
                        type="number"
                        value={quantity}
                        readOnly
                        className="w-full text-center focus:outline-none"
                    />
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-full flex items-center justify-center hover:bg-gray-100"
                    >
                        +
                    </button>
                </div>

                <div className="flex-1 flex gap-4">
                    <Button
                        className="flex-1"
                        onClick={handleAddToCart}
                    >
                        <ShoppingBag className="mr-2 h-5 w-5" />
                        Add to Cart
                    </Button>
                    <button
                        onClick={() => toggleWishlist(product)}
                        className={`p-3 rounded-full border transition-colors ${isWishlisted
                            ? 'bg-red-50 border-red-200 text-red-600'
                            : 'border-gray-300 hover:border-brand-gold hover:text-brand-gold text-gray-400'
                            }`}
                    >
                        <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="flex flex-col items-center text-center">
                    <ShieldCheck className="text-gray-400 mb-2" />
                    <span className="text-xs text-gray-500">Secure Checkout</span>
                </div>
                <div className="flex flex-col items-center text-center">
                    <Truck className="text-gray-400 mb-2" />
                    <span className="text-xs text-gray-500">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center">
                    <RotateCcw className="text-gray-400 mb-2" />
                    <span className="text-xs text-gray-500">30-Day Returns</span>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;

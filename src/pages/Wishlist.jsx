import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, Heart } from 'lucide-react';
import Button from '../components/ui/Button';
import { useWishlist } from '../Context/WishlistContext';
import { useCart } from '../Context/CartContext';

const Wishlist = () => {
    const { wishlistItems, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();

    if (wishlistItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Heart className="h-10 w-10 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
                <p className="text-gray-500 mb-8 max-w-sm">
                    Save items you love to your wishlist and revisit them later.
                </p>
                <Link to="/shop">
                    <Button>Start Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-display font-bold mb-8">My Wishlist ({wishlistItems.length})</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {wishlistItems.map((item) => (
                        <div key={item.id} className="group relative">
                            <div className="aspect-[3/4] w-full overflow-hidden bg-gray-200 relative">
                                <Link to={`/product/${item.id}`}>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                    />
                                </Link>

                                <div className="absolute top-2 right-2">
                                    <button
                                        onClick={() => toggleWishlist(item)}
                                        className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-shadow text-red-500"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                {/* Add to Cart Overlay */}
                                <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Button
                                        variant="primary"
                                        className="w-full text-sm py-2"
                                        onClick={() => addToCart(item, 1, 'M')}
                                    >
                                        <ShoppingBag size={16} className="mr-2" /> Add to Cart
                                    </Button>
                                </div>
                            </div>

                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-gray-900">
                                    <Link to={`/product/${item.id}`}>
                                        {item.name}
                                    </Link>
                                </h3>
                                <p className="mt-1 text-sm font-medium text-gray-900">${item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;

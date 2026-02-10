import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

    // Calculate subtotal
    const subtotal = getCartTotal();
    const shipping = subtotal > 100 ? 0 : 15;
    const total = subtotal + shipping;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Trash2 className="h-10 w-10 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-8 max-w-sm">
                    Looks like you haven't added anything to your cart yet.
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
                <h1 className="text-3xl font-display font-bold mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-8">
                        <div className="border-t border-gray-200 divide-y divide-gray-200">
                            {cartItems.map((item) => (
                                <div key={`${item.id}-${item.size}`} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                                                </h3>
                                                <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                                            <p className="mt-1 text-sm text-gray-500">Size: {item.size}</p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <div className="flex items-center border border-gray-300 rounded-md">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                                    className="p-1 hover:text-brand-gold disabled:opacity-50"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="px-2 font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                    className="p-1 hover:text-brand-gold"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeFromCart(item.id, item.size)}
                                                className="font-medium text-red-500 hover:text-red-700 flex items-center"
                                            >
                                                <Trash2 size={16} className="mr-1" />
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-4">
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <p className="text-gray-600">Subtotal</p>
                                    <p className="font-medium text-gray-900">${subtotal.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-gray-600">Shipping</p>
                                    <p className="font-medium text-gray-900">
                                        {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                                    </p>
                                </div>
                                {shipping === 0 && (
                                    <p className="text-xs text-green-600">Free shipping applied!</p>
                                )}
                                <div className="flex justify-between border-t border-gray-200 pt-4">
                                    <p className="text-lg font-bold text-gray-900">Total</p>
                                    <p className="text-lg font-bold text-gray-900">${total.toFixed(2)}</p>
                                </div>
                            </div>

                            <Link to="/checkout" className="block mt-6">
                                <Button className="w-full">
                                    Checkout <ArrowRight size={18} className="ml-2" />
                                </Button>
                            </Link>

                            <div className="mt-6 text-center text-sm text-gray-500">
                                <p>or</p>
                                <Link to="/shop" className="font-medium text-brand-gold hover:text-brand-black">
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

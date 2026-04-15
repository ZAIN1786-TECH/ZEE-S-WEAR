import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { currentUser } = useAuth();
    const cartStorageKey = currentUser ? `cart_${currentUser.uid}` : 'cart_guest';

    // Load cart from localStorage for signed-in user or guest session.
    useEffect(() => {
        try {
            const storedCart = localStorage.getItem(cartStorageKey);
            setCartItems(storedCart ? JSON.parse(storedCart) : []);
        } catch (error) {
            console.error('Error reading cart from localStorage:', error);
            setCartItems([]);
        }
    }, [cartStorageKey]);

    const persistCart = (newCartItems) => {
        try {
            localStorage.setItem(cartStorageKey, JSON.stringify(newCartItems));
        } catch (error) {
            console.error('Error writing cart to localStorage:', error);
        }
    };

    const addToCart = (product, quantity = 1, size = 'M') => {
        const newItems = [...cartItems];
        const existingItemIndex = newItems.findIndex(
            (item) => item.id === product.id && item.size === size
        );

        if (existingItemIndex > -1) {
            newItems[existingItemIndex].quantity += quantity;
        } else {
            newItems.push({ ...product, quantity, size, timestamp: new Date() });
        }

        setCartItems(newItems);
        persistCart(newItems);
        setIsCartOpen(true);
    };

    const removeFromCart = (id, size) => {
        const newItems = cartItems.filter((item) => !(item.id === id && item.size === size));
        setCartItems(newItems);
        persistCart(newItems);
    };

    const updateQuantity = (id, size, newQuantity) => {
        if (newQuantity < 1) return;
        const newItems = cartItems.map((item) =>
            item.id === id && item.size === size
                ? { ...item, quantity: newQuantity }
                : item
        );
        setCartItems(newItems);
        persistCart(newItems);
    };

    const clearCart = () => {
        setCartItems([]);
        persistCart([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    const value = {
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

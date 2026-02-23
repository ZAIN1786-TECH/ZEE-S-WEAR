import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../Firebase/firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { currentUser } = useAuth();

    // Fetch cart from Firestore when user logs in
    useEffect(() => {
        if (currentUser) {
            const userDocRef = doc(db, 'users', currentUser.uid);
            const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setCartItems(data.cart || []);
                } else {
                    setCartItems([]);
                }
            }, (error) => {
                console.error("Error fetching cart:", error);
            });
            return unsubscribe;
        } else {
            // If no user, clear cart
            setCartItems([]);
        }
    }, [currentUser]);

    const updateCartInFirestore = async (newCartItems) => {
        if (currentUser) {
            try {
                const userDocRef = doc(db, 'users', currentUser.uid);
                await setDoc(userDocRef, { cart: newCartItems }, { merge: true });
            } catch (error) {
                console.error("Error updating cart in Firestore:", error);
            }
        }
    };

    const addToCart = async (product, quantity = 1, size = 'M') => {
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
        await updateCartInFirestore(newItems);
        setIsCartOpen(true);
    };

    const removeFromCart = async (id, size) => {
        const newItems = cartItems.filter((item) => !(item.id === id && item.size === size));
        setCartItems(newItems);
        await updateCartInFirestore(newItems);
    };

    const updateQuantity = async (id, size, newQuantity) => {
        if (newQuantity < 1) return;
        const newItems = cartItems.map((item) =>
            item.id === id && item.size === size
                ? { ...item, quantity: newQuantity }
                : item
        );
        setCartItems(newItems);
        await updateCartInFirestore(newItems);
    };

    const clearCart = async () => {
        setCartItems([]);
        await updateCartInFirestore([]);
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

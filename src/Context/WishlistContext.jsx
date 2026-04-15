import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => {
    return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const { currentUser } = useAuth();
    const wishlistStorageKey = currentUser ? `wishlist_${currentUser.uid}` : 'wishlist_guest';

    // Load wishlist from localStorage for signed-in user or guest session.
    useEffect(() => {
        try {
            const storedWishlist = localStorage.getItem(wishlistStorageKey);
            setWishlistItems(storedWishlist ? JSON.parse(storedWishlist) : []);
        } catch (error) {
            console.error('Error reading wishlist from localStorage:', error);
            setWishlistItems([]);
        }
    }, [wishlistStorageKey]);

    const persistWishlist = (newWishlistItems) => {
        try {
            localStorage.setItem(wishlistStorageKey, JSON.stringify(newWishlistItems));
        } catch (error) {
            console.error('Error writing wishlist to localStorage:', error);
        }
    };

    const toggleWishlist = (product) => {
        const exists = wishlistItems.find((item) => item.id === product.id);
        let newItems;
        if (exists) {
            newItems = wishlistItems.filter((item) => item.id !== product.id);
        } else {
            newItems = [...wishlistItems, { ...product, timestamp: new Date() }];
        }
        setWishlistItems(newItems);
        persistWishlist(newItems);
    };

    const isInWishlist = (productId) => {
        return wishlistItems.some((item) => item.id === productId);
    };

    const value = {
        wishlistItems,
        toggleWishlist,
        isInWishlist
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../Firebase/firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => {
    return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const { currentUser } = useAuth();

    // Fetch wishlist from Firestore when user logs in
    useEffect(() => {
        if (currentUser) {
            const userDocRef = doc(db, 'users', currentUser.uid);
            const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setWishlistItems(data.favourites || []);
                } else {
                    setWishlistItems([]);
                }
            }, (error) => {
                console.error("Error fetching wishlist:", error);
            });
            return unsubscribe;
        } else {
            // If no user, clear wishlist
            setWishlistItems([]);
        }
    }, [currentUser]);

    const updateWishlistInFirestore = async (newWishlistItems) => {
        if (currentUser) {
            try {
                const userDocRef = doc(db, 'users', currentUser.uid);
                await setDoc(userDocRef, { favourites: newWishlistItems }, { merge: true });
            } catch (error) {
                console.error("Error updating wishlist in Firestore:", error);
            }
        }
    };

    const toggleWishlist = async (product) => {
        const exists = wishlistItems.find((item) => item.id === product.id);
        let newItems;
        if (exists) {
            newItems = wishlistItems.filter((item) => item.id !== product.id);
        } else {
            newItems = [...wishlistItems, { ...product, timestamp: new Date() }];
        }
        setWishlistItems(newItems);
        await updateWishlistInFirestore(newItems);
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

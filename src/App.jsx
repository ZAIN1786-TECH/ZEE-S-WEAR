
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Wishlist from './pages/Wishlist';
import OrderSuccess from './pages/OrderSuccess';
import HelpCenter from './pages/HelpCenter';
import Shipping from './pages/Shipping';
import SizeGuide from './pages/SizeGuide';
import Contact from './pages/Contact';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <WishlistProvider>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/shop" element={<Shop />} />
                            <Route path="/product/:id" element={<Product />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/wishlist" element={<Wishlist />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/order-success" element={<OrderSuccess />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/help" element={<HelpCenter />} />
                            <Route path="/shipping" element={<Shipping />} />
                            <Route path="/size-guide" element={<SizeGuide />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </Layout>
                </WishlistProvider>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;

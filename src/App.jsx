
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Lazy load pages to reduce initial bundle size
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const Product = lazy(() => import('./pages/Product'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const About = lazy(() => import('./pages/About'));
const Login = lazy(() => import('./pages/Login'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'));
const HelpCenter = lazy(() => import('./pages/HelpCenter'));
const Shipping = lazy(() => import('./pages/Shipping'));
const SizeGuide = lazy(() => import('./pages/SizeGuide'));
const Contact = lazy(() => import('./pages/Contact'));
import ScrollToTop from './components/utils/ScrollToTop';

// Loading Fallback
const PageLoader = () => (
    <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
    </div>
);

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <WishlistProvider>
                    <ScrollToTop />
                    <Layout>
                        <Suspense fallback={<PageLoader />}>
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
                        </Suspense>
                    </Layout>
                </WishlistProvider>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;

import React, { useState, useEffect } from 'react';
import { Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/product/ProductCard';
import FilterSidebar from '../components/features/FilterSidebar';
import SortDropdown from '../components/features/SortDropdown';
import { getLocalImage } from '../utils/imageMapper';

const Shop = () => {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();

                // Transform data
                const transformedProducts = data.map((item, index) => ({
                    id: item.id,
                    name: item.title,
                    category: item.category,
                    price: item.price,
                    image: getLocalImage(index), // Use local image
                    isNew: Math.random() > 0.8,
                    discount: Math.random() > 0.9 ? 15 : null,
                }));

                setProducts(transformedProducts);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
                {/* Mobile Filter Dialog */}
                <AnimatePresence>
                    {mobileFiltersOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setMobileFiltersOpen(false)}
                                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                            />
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'tween' }}
                                className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white shadow-xl p-6 overflow-y-auto lg:hidden"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                    <button
                                        type="button"
                                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                        onClick={() => setMobileFiltersOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <X className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                <form className="mt-4 border-t border-gray-200">
                                    <h3 className="sr-only">Categories</h3>
                                    <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                                        <li><a href="#" className="block px-2 py-3">New Arrivals</a></li>
                                        <li><a href="#" className="block px-2 py-3">Tees</a></li>
                                        <li><a href="#" className="block px-2 py-3">Hoodies</a></li>
                                        <li><a href="#" className="block px-2 py-3">Pants</a></li>
                                    </ul>
                                </form>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
                    <h1 className="text-4xl font-display font-bold text-gray-900">Shop All</h1>

                    <div className="flex items-center">
                        <SortDropdown />
                        <button
                            type="button"
                            className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                            onClick={() => setMobileFiltersOpen(true)}
                        >
                            <span className="sr-only">Filters</span>
                            <Filter className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>

                <section aria-labelledby="products-heading" className="pt-6 pb-24">
                    <h2 id="products-heading" className="sr-only">Products</h2>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                        {/* Filters */}
                        <FilterSidebar />

                        {/* Product Grid */}
                        <div className="lg:col-span-3">
                            {loading ? (
                                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-4 md:gap-x-6 xl:gap-x-8">
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="animate-pulse">
                                            <div className="bg-gray-200 aspect-[3/4] w-full rounded-md mb-4"></div>
                                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-4 md:gap-x-6 xl:gap-x-8">
                                    {products.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Shop;

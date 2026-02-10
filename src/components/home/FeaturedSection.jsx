import React, { useState, useEffect } from 'react';
import ProductCard from '../product/ProductCard';
import { getLocalImage } from '../../utils/imageMapper';

const FeaturedSection = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products?limit=8');
                const data = await response.json();

                // Transform data to match our ProductCard props
                const transformedProducts = data.map((item, index) => ({
                    id: item.id,
                    name: item.title,
                    category: item.category,
                    price: item.price,
                    image: getLocalImage(index), // Use local image
                    isNew: Math.random() > 0.7, // Simulate 'New' badge
                    discount: Math.random() > 0.8 ? 20 : null, // Simulate discount
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
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-black mb-4">
                        Trending Now
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Our most coveted pieces. Handpicked for the season from our exclusive collection.
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 xl:gap-x-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-gray-200 aspect-[3/4] w-full rounded-md mb-4 scroll:no-scroll"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 xl:gap-x-8">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedSection;

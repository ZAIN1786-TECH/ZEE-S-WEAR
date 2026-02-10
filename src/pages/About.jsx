import React from 'react';

const About = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative py-24 bg-brand-black text-white">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
                        alt="Fashion Studio"
                        className="w-full h-full object-cover opacity-20"
                    />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl font-display font-bold mb-6">Our Story</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Redefining modern fashion with a focus on quality, sustainability, and timeless elegance.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-display font-bold text-brand-black mb-6">Born in 2026</h2>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                Zees Wear began with a simple mission: to bridge the gap between high-end fashion and everyday wearability. We believe that looking good shouldn't come at the cost of comfort or conscience.
                            </p>
                            <p>
                                Our collections are curated for the modern individual who values both aesthetics and functionality. From our signature leather jackets to our breathable cotton basics, every piece is designed to stand the test of time.
                            </p>
                            <p>
                                We are committed to sustainable practices, sourcing materials responsibly, and ensuring fair labor conditions in every step of our supply chain.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
                            className="rounded-lg shadow-lg w-full h-64 object-cover"
                            alt="Fashion details"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop"
                            className="rounded-lg shadow-lg w-full h-64 object-cover mt-8"
                            alt="Model posing"
                        />
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-brand-gray py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-display font-bold text-center mb-16">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                            <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-gold text-2xl">
                                💎
                            </div>
                            <h3 className="text-xl font-bold mb-4">Quality First</h3>
                            <p className="text-gray-600">We never compromise on materials or craftsmanship. Excellence is our baseline.</p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                            <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-gold text-2xl">
                                🌿
                            </div>
                            <h3 className="text-xl font-bold mb-4">Sustainability</h3>
                            <p className="text-gray-600">Dedicated to reducing our footprint through eco-friendly materials and ethical production.</p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                            <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-gold text-2xl">
                                🤝
                            </div>
                            <h3 className="text-xl font-bold mb-4">Community</h3>
                            <p className="text-gray-600">Building a diverse, inclusive community where style knows no boundaries.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;

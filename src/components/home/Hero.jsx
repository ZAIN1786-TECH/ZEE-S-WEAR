import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const Hero = () => {
    return (
        <section className="relative h-[80vh] w-full overflow-hidden bg-gray-100">
            {/* Background Image Placeholder or Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 opacity-90">
                {/* In a real app, use an <img> or background-image here */}
                <img
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
                    alt="Fashion Model"
                    className="w-full h-full object-cover mix-blend-overlay opacity-50"
                />
            </div>

            <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start text-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-4 block">
                        New Collection 2026
                    </span>
                    <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
                        Elegance is <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-300">
                            an Attitude.
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
                        Discover the latest trends in premium fashion. Curated for those who demand style and substance.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button variant="primary" size="lg">
                            Shop Now
                        </Button>
                        <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                            View Lookbook
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;

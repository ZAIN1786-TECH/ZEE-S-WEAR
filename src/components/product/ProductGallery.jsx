import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductGallery = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-24">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative flex-shrink-0 w-20 h-24 border-2 overflow-hidden ${selectedImage === index ? 'border-brand-gold' : 'border-transparent'
                            }`}
                    >
                        <img
                            src={image}
                            alt={`Product thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 aspect-[3/4] md:aspect-auto md:h-[600px] overflow-hidden bg-gray-100 relative">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={selectedImage}
                        src={images[selectedImage]}
                        alt="Product view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full object-cover"
                    />
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ProductGallery;


import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ProductGallery from '../components/product/ProductGallery';
import ProductInfo from '../components/product/ProductInfo';
import FeaturedSection from '../components/home/FeaturedSection';
import { getLocalImage } from '../utils/imageMapper';

const Product = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const lookbookItem = state?.lookbookItem;

        if (lookbookItem && String(lookbookItem.id) === String(id)) {
            setProduct({
                id: lookbookItem.id,
                name: lookbookItem.title,
                price: (49 + Number(lookbookItem.id)).toFixed(2),
                description: `A premium ${lookbookItem.category.toLowerCase()} piece from the Zees Wear lookbook, crafted for elevated daily styling and lasting comfort.`,
                images: [
                    lookbookItem.image,
                    lookbookItem.image,
                    lookbookItem.image,
                    lookbookItem.image
                ]
            });
            setLoading(false);
            return;
        }

        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
const data = await response.json();

const localImg = getLocalImage(data.id - 1);

setProduct({
    id: data.id,
    name: data.title,
    price: data.price,
    description: data.description,
    // Use local image for gallery
    images: [
        localImg,
        localImg,
        localImg,
        localImg
    ]
});
            } catch (error) {
    console.error("Failed to fetch product:", error);
} finally {
    setLoading(false);
}
        };

if (id) {
    fetchProduct();
}
    }, [id, state]);

if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-gold"></div>
        </div>
    );
}

if (!product) {
    return <div className="text-center py-20">Product not found.</div>;
}

return (
    <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                <ProductGallery images={product.images} />
                <ProductInfo product={product} />
            </div>

            {/* Related Products */}
            <div className="mt-24 border-t border-gray-100 pt-16">
                <h2 className="text-2xl font-display font-bold mb-8">You May Also Like</h2>
                <FeaturedSection />
            </div>
        </div>
    </div>
);
};

export default Product;

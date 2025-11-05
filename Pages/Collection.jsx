import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "/src/Context/CartContext";
import { useSearch } from "/src/Context/SearchContext";

const Collection = () => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { searchTerm } = useSearch();
  const [activeFilter, setActiveFilter] = useState("all");
  const [showNotification, setShowNotification] = useState(false);

  // Product Data
  const products = [
    // Men's Wear (10 items)
    {
      id: 1,
      name: "Classic Denim Jacket",
      price: 89.99,
      image: "Images/Classic  denim jacket.jpeg",
      category: "men",
      description: "Timeless denim jacket for casual outings",
    },
    {
      id: 2,
      name: "Premium Leather Jacket",
      price: 199.99,
      image: "Images/Premium Leather Jacket1.jpg",
      category: "men",
      description: "Genuine leather jacket for bold statements",
    },
    {
      id: 3,
      name: "Urban Street Hoodie",
      price: 59.99,
      image: "Images/Urban Street Hoodie.jpg",
      category: "men",
      description: "Comfortable hoodie for urban lifestyle",
    },
    {
      id: 4,
      name: "Business Formal Suit",
      price: 299.99,
      image: "Images/Business Formal Suit.jpg",
      category: "men",
      description: "Elegant suit for professional settings",
    },
    {
      id: 5,
      name: "Casual Summer Shirt",
      price: 45.99,
      image: "Images/Casual Summer Shirt.jpg",
      category: "men",
      description: "Lightweight shirt for summer days",
    },
    {
      id: 6,
      name: "Sporty Track Pants",
      price: 39.99,
      image: "Images/Sporty Track Pants.webp",
      category: "men",
      description: "Comfortable pants for active lifestyle",
    },
    {
      id: 7,
      name: "Designer T-Shirt Pack",
      price: 79.99,
      image: "Images/Designer.webp",
      category: "men",
      description: "Set of 3 premium cotton t-shirts",
    },
    {
      id: 8,
      name: "Winter Wool Coat",
      price: 159.99,
      image: "Images/winter wool coat.jpg",
      category: "men",
      description: "Warm wool coat for chilly days",
    },
    {
      id: 9,
      name: "Casual Chino Pants",
      price: 49.99,
      image: "Images/Casual Chino Pants.webp",
      category: "men",
      description: "Versatile chinos for any occasion",
    },
    {
      id: 10,
      name: "Designer Sweater",
      price: 89.99,
      image: "Images/Designer Sweater.webp",
      category: "men",
      description: "Warm and stylish knitted sweater",
    },

    // Women's Wear (10 items)
    {
      id: 11,
      name: "Elegant Evening Gown",
      price: 149.99,
      image: "Images/Elegant Evening Gown1.webp",
      category: "women",
      description: "Stunning gown for special occasions",
    },
    {
      id: 12,
      name: "Summer Floral Dress",
      price: 69.99,
      image: "Images/Summer Floral Dress.webp",
      category: "women",
      description: "Light and breezy floral print dress",
    },
    {
      id: 13,
      name: "Designer Handbag",
      price: 129.99,
      image: "Images/Designer Handbag.jpg",
      category: "women",
      description: "Luxurious leather handbag",
    },
    {
      id: 14,
      name: "Casual Jumpsuit",
      price: 79.99,
      image: "Images/Casual Jumpsuit.jpg",
      category: "women",
      description: "Comfortable and stylish jumpsuit",
    },
    {
      id: 15,
      name: "Office Blazer Set",
      price: 119.99,
      image: "Images/Office Blazer Set.jpg",
      category: "women",
      description: "Professional blazer and pants set",
    },
    {
      id: 16,
      name: "Boho Maxi Dress",
      price: 89.99,
      image: "Images/Boho Maxi Dress.jpeg",
      category: "women",
      description: "Bohemian style maxi dress",
    },
    {
      id: 17,
      name: "Designer Heels",
      price: 99.99,
      image: "Images/Designer Heels.webp",
      category: "women",
      description: "Elegant high heels for parties",
    },
    {
      id: 18,
      name: "Casual Summer Top",
      price: 35.99,
      image: "Images/Casual Summer Top.avif",
      category: "women",
      description: "Comfortable cotton summer top",
    },
    {
      id: 19,
      name: "Winter Knit Dress",
      price: 79.99,
      image: "Images/Winter Knit Dress.jpg",
      category: "women",
      description: "Warm and cozy knitted dress",
    },
    {
      id: 20,
      name: "Designer Skirt",
      price: 59.99,
      image: "Images/Designer Skirt.jpeg",
      category: "women",
      description: "Elegant A-line skirt",
    },

    // Accessories (10 items)
    {
      id: 21,
      name: "Premium Watch",
      price: 199.99,
      image: "Images/Premium Watch.webp",
      category: "accessories",
      description: "Luxury wristwatch with leather strap",
    },
    {
      id: 22,
      name: "Designer Sunglasses",
      price: 89.99,
      image: "Images/Designer Sunglasses.avif",
      category: "accessories",
      description: "UV protection sunglasses",
    },
    {
      id: 23,
      name: "Leather Belt",
      price: 45.99,
      image: "Images/Leather Belt.webp",
      category: "accessories",
      description: "Genuine leather designer belt",
    },
    {
      id: 24,
      name: "Silver Necklace",
      price: 79.99,
      image: "Images/Silver Necklace.webp",
      category: "accessories",
      description: "Elegant silver chain necklace",
    },
    {
      id: 25,
      name: "Designer Scarf",
      price: 39.99,
      image: "Images/Designer Scarf.avif",
      category: "accessories",
      description: "Silk blend fashion scarf",
    },
    {
      id: 26,
      name: "Luxury Wallet",
      price: 69.99,
      image: "Images/Luxury Wallet.jpeg",
      category: "accessories",
      description: "Premium leather wallet",
    },
    {
      id: 27,
      name: "Sports Cap",
      price: 29.99,
      image: "Images/Sports Cap.jpg",
      category: "accessories",
      description: "Adjustable sports baseball cap",
    },
    {
      id: 28,
      name: "Designer Bracelet",
      price: 49.99,
      image: "Images/Designer Bracelet.jpg",
      category: "accessories",
      description: "Elegant gold-plated bracelet",
    },
    {
      id: 29,
      name: "Winter Beanie",
      price: 24.99,
      image: "Images/Winter Beanie.jpg",
      category: "accessories",
      description: "Warm knitted winter beanie",
    },
    {
      id: 30,
      name: "Laptop Bag",
      price: 89.99,
      image: "Images/Laptop Bag1.jpg",
      category: "accessories",
      description: "Professional laptop messenger bag",
    },
  ];

  const filters = [
    { key: "all", label: "All Items" },
    { key: "men", label: "Men's Wear" },
    { key: "women", label: "Women's Wear" },
    { key: "accessories", label: "Accessories" },
  ];

  const handleAddToCart = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addToCart(product);
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };

  const filteredProducts = products
    .filter((product) =>
      activeFilter === "all" ? true : product.category === activeFilter
    )
    .filter((product) =>
      searchTerm
        ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    );

  return (
    <div className="bg-linear-to-br from-gray-100 via-amber-50 to-gray-200 font-sans min-h-screen">
      {/* Collection Header */}
      <header className="max-w-6xl mx-auto text-center py-8 px-4">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Zee's Collection
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover our exclusive fashion pieces curated just for you
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {filters.map((filter) => (
            <button
              key={filter.key}
              className={`px-6 py-2 rounded-full font-semibold transition duration-300 hover:scale-105 ${
                activeFilter === filter.key
                  ? "bg-amber-300 text-black"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </header>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition duration-500"
            >
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover transition duration-500 hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-amber-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                  ${product.price}
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {product.description}
              </p>
              <button
                onClick={() => handleAddToCart(product.id)}
                className="add-to-cart-btn w-full bg-amber-300 text-black font-semibold py-3 rounded-lg hover:bg-amber-400 transition duration-300"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Notification */}
      <div
        className={`cart-notification fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-transform duration-300 ${
          showNotification ? "translate-x-0" : "translate-x-full"
        }`}
      >
        Item added to cart! 🎉
      </div>

      <style jsx>{`
        .product-card {
          transition: all 0.3s ease;
        }
        .product-card:hover {
          transform: translateY(-5px);
        }
        .cart-notification {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
};

export default Collection;

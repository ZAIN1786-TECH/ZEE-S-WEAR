import { useState } from "react";
import { useNavigate } from "react-router-dom";


const lookbookData = [
  {
    id: 2,
    image: "/Images/Business Formal Suit.jpg",
    title: "Business Formal Suit",
    category: "Men",
  },
  {
    id: 3,
    image: "/Images/Casual Chino Pants.webp",
    title: "Casual Chino Pants",
    category: "Men",
  },
  {
    id: 4,
    image: "/Images/Casual Jumpsuit.jpg",
    title: "Casual Jumpsuit",
    category: "Women",
  },
  {
    id: 5,
    image: "/Images/Casual Summer Shirt.jpg",
    title: "Casual Summer Shirt",
    category: "Women",
  },
  {
    id: 6,
    image: "/Images/Casual Summer Top.avif",
    title: "Casual Summer Top",
    category: "Women",
  },
  {
    id: 7,
    image: "/Images/Classic  denim jacket.jpeg",
    title: "Classic Denim Jacket",
    category: "Men",
  },
  {
    id: 8,
    image: "/Images/Designer Bracelet.jpg",
    title: "Designer Bracelet",
    category: "Accessories",
  },
  {
    id: 9,
    image: "/Images/Designer Handbag.jpg",
    title: "Designer Handbag",
    category: "Accessories",
  },
  {
    id: 10,
    image: "/Images/Designer Heels.webp",
    title: "Designer Heels",
    category: "Accessories",
  },
  {
    id: 11,
    image: "/Images/Designer Scarf.avif",
    title: "Designer Scarf",
    category: "Accessories",
  },
  {
    id: 12,
    image: "/Images/Designer Skirt.jpeg",
    title: "Designer Skirt",
    category: "Women",
  },
  {
    id: 13,
    image: "/Images/Designer Sunglasses.avif",
    title: "Designer Sunglasses",
    category: "Accessories",
  },
  {
    id: 14,
    image: "/Images/Designer Sweater.webp",
    title: "Designer Sweater",
    category: "Women",
  },
  {
    id: 15,
    image: "/Images/Designer T-Shirt Pack",
    title: "Designer T-Shirt Pack",
    category: "Accessories",
  },
  {
    id: 16,
    image: "/Images/Elegant Evening Gown1.webp",
    title: "Elegant Evening Gown",
    category: "Women",
  },
  {
    id: 17,
    image: "/Images/Laptop Bag1.jpg",
    title: "Laptop Bag",
    category: "Accessories",
  },
  {
    id: 18,
    image: "/Images/Leather Belt.webp",
    title: "Leather Belt",
    category: "Accessories",
  },
  {
    id: 19,
    image: "/Images/Luxury Wallet.jpeg",
    title: "Luxury Wallet",
    category: "Accessories",
  },
  {
    id: 20,
    image: "/Images/Office Blazer Set.jpg",
    title: "Office Blazer Set",
    category: "Men",
  },
  {
    id: 21,
    image: "/Images/Premium Leather Jacket.jpg",
    title: "Premium Leather Jacket",
    category: "Men",
  },
  {
    id: 22,
    image: "/Images/Premium Leather Jacket1.jpg",
    title: "Premium Leather Jacket",
    category: "Men",
  },
  {
    id: 23,
    image: "/Images/Premium Watch.webp",
    title: "Premium Watch",
    category: "Accessories",
  },
  {
    id: 24,
    image: "/Images/Silver Necklace.webp",
    title: "Silver Necklace",
    category: "Accessories",
  },
  {
    id: 25,
    image: "/Images/Sports Cap.jpg",
    title: "Sports Cap",
    category: "Accessories",
  },
  {
    id: 26,
    image: "/Images/Sporty Track Pants.webp",
    title: "Sporty Track Pants",
    category: "Men",
  },
  {
    id: 27,
    image: "/Images/Summer Floral Dress.webp",
    title: "Summer Floral Dress",
    category: "Women",
  },
  {
    id: 28,
    image: "/Images/Urban Street Hoodie.jpg",
    title: "Urban Street Hoodie",
    category: "Men",
  },
  {
    id: 29,
    image: "/Images/Winter Beanie.jpg",
    title: "Winter Beanie",
    category: "Accessories",
  },
  {
    id: 30,
    image: "/Images/Winter Knit Dress.jpg",
    title: "Winter Knit Dress",
    category: "Women",
  },
  {
    id: 31,
    image: "/Images/Winter Wool Coat.jpg",
    title: "Winter Wool Coat",
    category: "Men",
  },
];

export default function Lookbook() {
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  const handleViewProduct = (item) => {
    navigate(`/product/${item.id}`, { state: { lookbookItem: item } });
  };

  const filteredItems =
    filter === "All"
      ? lookbookData
      : lookbookData.filter((item) => item.category === filter);

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-16 py-16">
      
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-wide">
          Zees Wear Lookbook
        </h1>
        <p className="text-gray-500 mt-4">
          Explore our curated seasonal styles
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-12">
        {["All", "Men", "Women", "Accessories"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 border transition duration-300 ${
              filter === cat
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-black hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <article
            key={item.id}
            className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="h-105 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="space-y-4 p-5">
              <h3 className="text-lg font-semibold tracking-wide text-gray-900">
                {item.title}
              </h3>
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-xs uppercase tracking-[0.18em] text-gray-500">
                  {item.category}
                </span>
                <button
                  onClick={() => handleViewProduct(item)}
                  className="rounded-full border border-black px-4 py-2 text-sm font-medium text-black transition-all duration-300 group-hover:bg-black group-hover:text-white"
                >
                  View Product
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
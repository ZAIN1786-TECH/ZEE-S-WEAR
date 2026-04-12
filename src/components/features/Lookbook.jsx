import { useState } from "react";


const lookbookData = [
  {
    id: 1,
    image: "/Images/Boho Maxi Dress.jpeg",
    title: "Boho Maxi Dress",
    category: "Women",
  },
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
          <div
            key={item.id}
            className="group relative overflow-hidden cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[420px] object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-white text-xl font-medium">
                {item.title}
              </h3>
              <button className="mt-3 bg-white text-black px-4 py-2 w-max hover:bg-gray-200 transition">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
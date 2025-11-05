import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      title: "The Minimalist's Shelf",
      description: "Neat, timeless, and always in Style",
      image: "/Images/pexels-bohlemedia-1884581.jpg",
      alt: "Product 1"
    },
    {
      id: 2,
      title: "Runway in Monochrome",
      description: "Sleek vibes for bold Souls",
      image: "/Images/pexels-bohlemedia-1884584.jpg",
      alt: "Product 2"
    },
    {
      id: 3,
      title: "Weekend Starter Pack",
      description: "Easy fits, zero Effort",
      image: "/Images/junko-nakase-Q-72wa9-7Dg-unsplash.jpg",
      alt: "Product 3"
    },
    {
      id: 4,
      title: "Snuggle Knit Luxe",
      description: "Cozy feels, Luxe Touch",
      image: "/Images/micheile-henderson-FpPcoOAk5PI-unsplash.jpg",
      alt: "Product 4"
    },
    {
      id: 5,
      title: "Sunset Glam Vibes",
      description: "Bright, Breezy, Beautiful",
      image: "/Images/marcus-loke-xXJ6utyoSw0-unsplash.jpg",
      alt: "Product 5"
    },
    {
      id: 6,
      title: "Boardroom Royalty",
      description: "Power dressing made Simple",
      image: "/Images/pexels-pixabay-325876.jpg",
      alt: "Product 6"
    }
  ];

  const handleProductClick = () => {
    navigate('/collection');
  };

  const handleViewAllClick = () => {
    navigate('/collection');
  };

  return (
    <main>
      {/* Hero Section */}
      <div className="p-4 m-4 text-center">
        <h1 className="font-bold text-3xl mb-4">Welcome to Zee's Wear</h1>
        <p>Discover Fashion and Ideas</p>
        <p className="bg-amber-200 rounded-2xl mt-2 p-2">
          Feel free to explore the different sections using the navigation
        </p>
      </div>

      {/* Products Section */}
      <div className="container mx-auto p-4">
        <div className="bg-gray-200 rounded-2xl m-4 p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Zee's Collection</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div 
                key={product.id}
                className="bg-white p-4 rounded-lg shadow-md cursor-pointer transform transition duration-300 hover:scale-105"
                onClick={handleProductClick}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && handleProductClick()}
              >
                <img 
                  src={product.image} 
                  alt={product.alt} 
                  className="w-full h-48 object-cover rounded-md mb-3"
                />
                <h3 className="font-semibold text-lg">{product.title}</h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
                <div className="mt-2 text-amber-600 font-semibold">Click to explore →</div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-8">
            <button 
              onClick={handleViewAllClick}
              className="bg-amber-300 text-black font-semibold px-8 py-3 rounded-full shadow-md hover:bg-amber-500 hover:scale-105 transition duration-300"
            >
              View All Collections
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
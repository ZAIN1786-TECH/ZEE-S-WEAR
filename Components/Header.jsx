import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '/src/Context/CartContext';
import { useSearch } from '/src/Context/SearchContext';

const Header = () => {
  const { getTotalItems } = useContext(CartContext);
  const { searchTerm, updateSearchTerm } = useSearch();
  const location = useLocation();
  const navigate = useNavigate();
  const cartCount = getTotalItems();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Collection', path: '/collection' },
    { label: 'About', path: '/about' },

    { label: 'Contact', path: '/contact' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    updateSearchTerm(searchTerm);
    navigate('/collection');
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-linear-to-r from-black via-zinc-900 to-black rounded-2xl text-white flex items-center justify-between px-6 py-3 m-4 shadow-lg">
      <ul className="flex space-x-6">
        {navItems.map((item, index) => (
          <li 
            key={index}
            className={`hover:bg-zinc-700 px-4 py-2 rounded-lg transition duration-300 ${
              isActiveLink(item.path) ? 'bg-zinc-700' : ''
            }`}
          >
            <Link 
              to={item.path}
              className="block"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      
      <div className="flex items-center space-x-4">
        <Link 
          to="/cart" 
          className="relative hover:bg-amber-500 px-4 py-2 rounded-lg transition duration-300"
        >
          🛒 My Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-amber-400 text-black font-bold text-xs px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
        
        <form onSubmit={handleSearch} className="flex">
          <input 
            type="text" 
            placeholder="Search" 
            value={searchTerm}
            onChange={(e) => updateSearchTerm(e.target.value)}
            className="bg-white rounded-l-full px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-amber-300" 
          />
          <button 
            type="submit"
            className="bg-amber-300 text-black rounded-r-full px-4 py-2 hover:bg-amber-400 transition duration-300"
          >
            Go
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Header;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '/Components/Header';
import Footer from '/Components/Footer';
import { SearchProvider } from './Context/SearchContext';
import Home from '/Pages/Home';
import About from '/Pages/About';
import Collection from '/Pages/Collection';
import Contact from '/Pages/Contact';
import Cart from "/Pages/Cart";
import Checkout from "/Pages/Checkout";
function App() {
  return (
    <SearchProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </SearchProvider>
  );
}

export default App;
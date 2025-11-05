import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Load cart from localStorage on component mount
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const updateQuantity = (productId, change) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + change };
      }
      return item;
    }).filter(item => item.quantity > 0); // Remove items with quantity <= 0
    
    updateCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    updateCart(updatedCart);
  };

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      updateCart([]);
    }
  };

  const proceedToCheckout = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    
    localStorage.setItem('checkoutTotal', total.toFixed(2));
    navigate('/checkout');
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getCartTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return {
      subtotal: subtotal.toFixed(2),
      shipping: shipping.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2)
    };
  };

  if (cart.length === 0) {
    return (
      <div className="bg-linear-to-br from-gray-100 via-amber-50 to-gray-200 font-sans min-h-screen">
        <main className="max-w-6xl mx-auto p-6">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Shopping Cart</h1>
          
          <div className="empty-cart text-center py-16 px-8">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Discover our amazing collection and add some items to your cart!</p>
            <Link 
              to="/collection" 
              className="bg-amber-300 text-black font-semibold px-6 py-3 rounded-full hover:bg-amber-400 transition duration-300 inline-block"
            >
              Start Shopping
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const totals = getCartTotal();

  return (
    <div className="bg-linear-to-br from-gray-100 via-amber-50 to-gray-200 font-sans min-h-screen">
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Shopping Cart</h1>
        
        <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
          <div className="space-y-4">
            {cart.map(item => {
              const itemTotal = item.price * item.quantity;
              return (
                <div 
                  key={item.id} 
                  className="cart-item flex items-center justify-between p-4 border-b border-gray-200"
                >
                  <div className="flex items-center space-x-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-gray-600 text-sm">${item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="font-semibold w-8 text-center">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                    <span className="font-bold text-gray-800 w-20 text-right">
                      ${itemTotal.toFixed(2)}
                    </span>
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
            <div className="flex justify-between text-lg">
              <span>Subtotal:</span>
              <span>${totals.subtotal}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span>Shipping:</span>
              <span>${totals.shipping}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span>Tax (8%):</span>
              <span>${totals.tax}</span>
            </div>
            <div className="flex justify-between items-center text-xl font-bold pt-3 border-t border-gray-200">
              <span>Total:</span>
              <span>${totals.total}</span>
            </div>
            <div className="mt-6 flex space-x-4">
              <button 
                onClick={clearCart}
                className="flex-1 bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-300 transition duration-300"
              >
                Clear Cart
              </button>
              <button 
                onClick={proceedToCheckout}
                className="flex-1 checkout-btn"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .cart-item {
          transition: all 0.3s ease;
        }
        .empty-cart {
          text-align: center;
          padding: 4rem 2rem;
        }
        .quantity-btn {
          width: 30px;
          height: 30px;
          border: none;
          background: #f59e0b;
          color: black;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
        .remove-btn {
          background: #ef4444;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 12px;
        }
        .checkout-btn {
          background: #10b981;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
          transition: all 0.3s ease;
        }
        .checkout-btn:hover {
          background: #059669;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default Cart;
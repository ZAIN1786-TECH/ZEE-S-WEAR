import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    shipping: 'standard',
    payment: 'credit-card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
    
    if (savedCart.length === 0) {
      navigate('/cart');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'radio' ? value : value
    }));
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ');
    if (formattedValue) {
      value = formattedValue;
    }
    setFormData(prev => ({ ...prev, cardNumber: value }));
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\//g, '').replace(/[^0-9]/gi, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setFormData(prev => ({ ...prev, expiryDate: value }));
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/gi, '');
    setFormData(prev => ({ ...prev, cvv: value }));
  };

  const selectPayment = (method) => {
    setFormData(prev => ({ ...prev, payment: method }));
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getOrderSummary = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = formData.shipping === 'standard' ? 9.99 : 
                        formData.shipping === 'express' ? 19.99 : 29.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shippingCost + tax;

    return {
      subtotal: subtotal.toFixed(2),
      shipping: shippingCost.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2)
    };
  };

  const validateForm = () => {
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 'address', 
      'city', 'state', 'zipCode', 'country'
    ];

    for (let field of requiredFields) {
      if (!formData[field].trim()) {
        alert(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return false;
    }

    // Validate phone
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      alert('Please enter a valid phone number');
      return false;
    }

    // Validate payment details if credit card is selected
    if (formData.payment === 'credit-card') {
      if (!formData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
        alert('Please enter a valid 16-digit card number');
        return false;
      }
      if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
        alert('Please enter a valid expiry date (MM/YY)');
        return false;
      }
      if (!formData.cvv.match(/^\d{3,4}$/)) {
        alert('Please enter a valid CVV');
        return false;
      }
      if (!formData.cardName.trim()) {
        alert('Please enter the name on card');
        return false;
      }
    }

    return true;
  };

  const processOrder = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Save order to localStorage
      const order = {
        id: 'ORD' + Date.now(),
        items: cart,
        total: getOrderSummary().total,
        date: new Date().toLocaleDateString(),
        status: 'Confirmed',
        shippingAddress: formData
      };
      localStorage.setItem('lastOrder', JSON.stringify(order));
      
      // Clear cart
      localStorage.removeItem('cart');
      setCart([]);
      
      setIsSuccess(true);
    } catch (error) {
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const orderSummary = getOrderSummary();

  if (isSuccess) {
    return (
      <div className="bg-linear-to-br from-gray-100 via-amber-50 to-gray-200 font-sans min-h-screen">
        <div className="checkout-container p-6">
          <div className="success-message bg-green-500 text-white p-8 rounded-2xl text-center max-w-2xl mx-auto mt-8">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-3xl font-bold mb-4">Order Successful!</h3>
            <p className="text-xl mb-6">Thank you for your purchase. You will receive a confirmation email shortly.</p>
            <Link 
              to="/" 
              className="bg-white text-green-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300 inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-br from-gray-100 via-amber-50 to-gray-200 font-sans min-h-screen">
      <div className="checkout-container p-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Checkout Form */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <form>
              {/* Shipping Address */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Shipping Address</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label" htmlFor="firstName">First Name *</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName" 
                      className="form-input" 
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="lastName">Last Name *</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName" 
                      className="form-input" 
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="form-input" 
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Phone Number *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    className="form-input" 
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="address">Street Address *</label>
                  <input 
                    type="text" 
                    id="address" 
                    name="address" 
                    className="form-input" 
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="form-group">
                    <label className="form-label" htmlFor="city">City *</label>
                    <input 
                      type="text" 
                      id="city" 
                      name="city" 
                      className="form-input" 
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="state">State *</label>
                    <input 
                      type="text" 
                      id="state" 
                      name="state" 
                      className="form-input" 
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="zipCode">ZIP Code *</label>
                    <input 
                      type="text" 
                      id="zipCode" 
                      name="zipCode" 
                      className="form-input" 
                      required
                      value={formData.zipCode}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="country">Country *</label>
                  <select 
                    id="country" 
                    name="country" 
                    className="form-input" 
                    required
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="PK">Pakistan</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
              </section>

              {/* Shipping Method */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Shipping Method</h2>
                <div className="space-y-3">
                  {[
                    { value: 'standard', label: 'Standard Shipping', desc: '5-7 business days - $9.99' },
                    { value: 'express', label: 'Express Shipping', desc: '2-3 business days - $19.99' },
                    { value: 'overnight', label: 'Overnight Shipping', desc: 'Next business day - $29.99' }
                  ].map(method => (
                    <label key={method.value} className="flex items-center space-x-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="shipping" 
                        value={method.value}
                        checked={formData.shipping === method.value}
                        onChange={handleInputChange}
                        className="text-amber-500"
                      />
                      <span className="flex-1">
                        <div className="font-semibold">{method.label}</div>
                        <div className="text-sm text-gray-600">{method.desc}</div>
                      </span>
                    </label>
                  ))}
                </div>
              </section>

              {/* Payment Method */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Payment Method</h2>
                
                {/* Credit Card */}
                <div 
                  className={`payment-method border-2 rounded-lg p-4 mb-4 cursor-pointer transition-all ${
                    formData.payment === 'credit-card' 
                      ? 'border-amber-500 bg-amber-50' 
                      : 'border-gray-200'
                  }`}
                  onClick={() => selectPayment('credit-card')}
                >
                  <div className="flex items-center space-x-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="credit-card"
                      checked={formData.payment === 'credit-card'}
                      onChange={handleInputChange}
                      className="text-amber-500"
                    />
                    <span className="font-semibold">Credit/Debit Card</span>
                  </div>
                  {formData.payment === 'credit-card' && (
                    <div className="mt-4 space-y-4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="cardNumber">Card Number *</label>
                        <input 
                          type="text" 
                          id="cardNumber" 
                          name="cardNumber" 
                          className="form-input" 
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                          value={formData.cardNumber}
                          onChange={handleCardNumberChange}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="form-group">
                          <label className="form-label" htmlFor="expiryDate">Expiry Date *</label>
                          <input 
                            type="text" 
                            id="expiryDate" 
                            name="expiryDate" 
                            className="form-input" 
                            placeholder="MM/YY"
                            maxLength="5"
                            value={formData.expiryDate}
                            onChange={handleExpiryDateChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="cvv">CVV *</label>
                          <input 
                            type="text" 
                            id="cvv" 
                            name="cvv" 
                            className="form-input" 
                            placeholder="123"
                            maxLength="3"
                            value={formData.cvv}
                            onChange={handleCvvChange}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="cardName">Name on Card *</label>
                        <input 
                          type="text" 
                          id="cardName" 
                          name="cardName" 
                          className="form-input"
                          value={formData.cardName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* PayPal */}
                <div 
                  className={`payment-method border-2 rounded-lg p-4 mb-4 cursor-pointer transition-all ${
                    formData.payment === 'paypal' 
                      ? 'border-amber-500 bg-amber-50' 
                      : 'border-gray-200'
                  }`}
                  onClick={() => selectPayment('paypal')}
                >
                  <div className="flex items-center space-x-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="paypal"
                      checked={formData.payment === 'paypal'}
                      onChange={handleInputChange}
                      className="text-amber-500"
                    />
                    <span className="font-semibold">PayPal</span>
                  </div>
                </div>

                {/* Cash on Delivery */}
                <div 
                  className={`payment-method border-2 rounded-lg p-4 mb-4 cursor-pointer transition-all ${
                    formData.payment === 'cod' 
                      ? 'border-amber-500 bg-amber-50' 
                      : 'border-gray-200'
                  }`}
                  onClick={() => selectPayment('cod')}
                >
                  <div className="flex items-center space-x-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="cod"
                      checked={formData.payment === 'cod'}
                      onChange={handleInputChange}
                      className="text-amber-500"
                    />
                    <span className="font-semibold">Cash on Delivery</span>
                  </div>
                </div>
              </section>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-md h-fit">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Summary</h2>
            
            <div className="mb-4 space-y-4">
              {cart.map(item => {
                const itemTotal = item.price * item.quantity;
                return (
                  <div key={item.id} className="order-summary-item flex justify-between items-center py-3 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{item.name}</div>
                        <div className="text-gray-600 text-xs">Qty: {item.quantity}</div>
                      </div>
                    </div>
                    <div className="font-semibold">${itemTotal.toFixed(2)}</div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-3 border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${orderSummary.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>${orderSummary.shipping}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${orderSummary.tax}</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t border-gray-200 pt-3">
                <span>Total:</span>
                <span>${orderSummary.total}</span>
              </div>
            </div>

            <button 
              onClick={processOrder}
              disabled={isLoading}
              className="w-full bg-amber-300 text-black font-bold py-4 rounded-lg hover:bg-amber-400 transition duration-300 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Place Order'}
            </button>

            {isLoading && (
              <div className="loading-spinner text-center py-8">
                <div className="text-4xl mb-4">⏳</div>
                <p>Processing your order...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .checkout-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #374151;
        }
        .form-input {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e5e7eb;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
        }
        .form-input:focus {
          outline: none;
          border-color: #f59e0b;
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
        }
        .order-summary-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .success-message {
          background: #10b981;
          color: white;
          padding: 2rem;
          border-radius: 1rem;
          text-align: center;
          margin: 2rem 0;
        }
        .loading-spinner {
          text-align: center;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Checkout;
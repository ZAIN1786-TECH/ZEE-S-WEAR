import React, { useState } from 'react';
import { CreditCard, Calendar, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const PaymentForm = ({ onSubmit, isProcessing }) => {
    const [cardData, setCardData] = useState({
        cardNumber: '',
        expiry: '',
        cvc: '',
        cardName: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        // Simple formatting
        if (name === 'cardNumber') {
            formattedValue = value.replace(/\D/g, '').substring(0, 16);
            formattedValue = formattedValue.match(/.{1,4}/g)?.join(' ') || formattedValue;
        } else if (name === 'expiry') {
            formattedValue = value.replace(/\D/g, '').substring(0, 4);
            if (formattedValue.length >= 2) {
                formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2);
            }
        } else if (name === 'cvc') {
            formattedValue = value.replace(/\D/g, '').substring(0, 3);
        }

        setCardData({ ...cardData, [name]: formattedValue });
        // Clear error on change
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!cardData.cardNumber || cardData.cardNumber.replace(/\s/g, '').length < 16) {
            newErrors.cardNumber = 'Invalid card number';
        }
        if (!cardData.expiry || cardData.expiry.length < 5) {
            newErrors.expiry = 'Invalid expiry date';
        }
        if (!cardData.cvc || cardData.cvc.length < 3) {
            newErrors.cvc = 'Invalid CVC';
        }
        if (!cardData.cardName) {
            newErrors.cardName = 'Cardholder name is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(cardData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Card Number */}
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Card Number</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        name="cardNumber"
                        value={cardData.cardNumber}
                        onChange={handleChange}
                        placeholder="0000 0000 0000 0000"
                        className={`block w-full pl-10 pr-3 py-2 border ${errors.cardNumber ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-brand-gold focus:border-brand-gold'} rounded-md shadow-sm sm:text-sm`}
                    />
                </div>
                {errors.cardNumber && <p className="text-xs text-red-500">{errors.cardNumber}</p>}
            </div>

            {/* Expiry and CVC */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Expiry Date</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            name="expiry"
                            value={cardData.expiry}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            className={`block w-full pl-10 pr-3 py-2 border ${errors.expiry ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-brand-gold focus:border-brand-gold'} rounded-md shadow-sm sm:text-sm`}
                        />
                    </div>
                    {errors.expiry && <p className="text-xs text-red-500">{errors.expiry}</p>}
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">CVC</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            name="cvc"
                            value={cardData.cvc}
                            onChange={handleChange}
                            placeholder="123"
                            className={`block w-full pl-10 pr-3 py-2 border ${errors.cvc ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-brand-gold focus:border-brand-gold'} rounded-md shadow-sm sm:text-sm`}
                        />
                    </div>
                    {errors.cvc && <p className="text-xs text-red-500">{errors.cvc}</p>}
                </div>
            </div>

            {/* Cardholder Name */}
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Cardholder Name</label>
                <input
                    type="text"
                    name="cardName"
                    value={cardData.cardName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`block w-full px-3 py-2 border ${errors.cardName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-brand-gold focus:border-brand-gold'} rounded-md shadow-sm sm:text-sm`}
                />
                {errors.cardName && <p className="text-xs text-red-500">{errors.cardName}</p>}
            </div>

            {/* Processing Overlay */}
            {isProcessing && (
                <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10 rounded-lg">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-gold"></div>
                </div>
            )}
        </form>
    );
};

export default PaymentForm;

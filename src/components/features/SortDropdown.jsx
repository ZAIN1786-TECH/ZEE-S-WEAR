import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SortDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('Most Popular');

    const options = ['Most Popular', 'Best Rating', 'Newest', 'Price: Low to High', 'Price: High to Low'];

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                    Sort by: <span className="font-bold ml-1">{selected}</span>
                    <ChevronDown
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                    />
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute right-0 z-40 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                        <div className="py-1">
                            {options.map((option) => (
                                <button
                                    key={option}
                                    className={`block px-4 py-2 text-sm w-full text-left ${selected === option ? 'font-medium text-gray-900 bg-gray-100' : 'text-gray-500'
                                        } hover:bg-gray-50`}
                                    onClick={() => {
                                        setSelected(option);
                                        setIsOpen(false);
                                    }}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SortDropdown;

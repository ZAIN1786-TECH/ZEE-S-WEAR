import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

const FilterSection = ({ title, options, isOpen = true }) => {
    const [expanded, setExpanded] = useState(isOpen);

    return (
        <div className="border-b border-gray-200 py-6">
            <h3 className="-my-3 flow-root">
                <button
                    type="button"
                    onClick={() => setExpanded(!expanded)}
                    className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500"
                >
                    <span className="font-medium text-gray-900">{title}</span>
                    <span className="ml-6 flex items-center">
                        {expanded ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                </button>
            </h3>
            {expanded && (
                <div className="pt-6">
                    <div className="space-y-4">
                        {options.map((option, optionIdx) => (
                            <div key={option.value} className="flex items-center">
                                <input
                                    id={`filter-${title}-${optionIdx}`}
                                    name={`${title}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold"
                                />
                                <label
                                    htmlFor={`filter-${title}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                >
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const FilterSidebar = () => {
    const categories = [
        { value: 'new-arrivals', label: 'New Arrivals' },
        { value: 'tees', label: 'Tees' },
        { value: 'hoodies', label: 'Hoodies & Sweatshirts' },
        { value: 'pants', label: 'Pants' },
    ];

    const sizes = [
        { value: 'xs', label: 'XS' },
        { value: 's', label: 'S' },
        { value: 'm', label: 'M' },
        { value: 'l', label: 'L' },
        { value: 'xl', label: 'XL' },
    ];

    return (
        <form className="hidden lg:block">
            <FilterSection title="Category" options={categories} />
            <FilterSection title="Size" options={sizes} isOpen={false} />
            <div className="border-b border-gray-200 py-6">
                <h3 className="font-medium text-gray-900 mb-4">Price Range</h3>
                <div className="flex items-center space-x-4">
                    <input type="number" placeholder="Min" className="w-20 p-2 border border-gray-300 text-sm rounded-md" />
                    <span className="text-gray-400">-</span>
                    <input type="number" placeholder="Max" className="w-20 p-2 border border-gray-300 text-sm rounded-md" />
                </div>
            </div>
        </form>
    );
};

export default FilterSidebar;

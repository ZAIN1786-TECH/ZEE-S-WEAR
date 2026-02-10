import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SizeGuide = () => {
    const [activeTab, setActiveTab] = useState('men');

    const Chart = ({ data }) => (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs text-brand-black uppercase bg-gray-50">
                    <tr>
                        <th className="px-6 py-3">Size</th>
                        <th className="px-6 py-3">Chest (in)</th>
                        <th className="px-6 py-3">Waist (in)</th>
                        <th className="px-6 py-3">Hips (in)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.size} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-bold text-brand-black">{row.size}</td>
                            <td className="px-6 py-4">{row.chest}</td>
                            <td className="px-6 py-4">{row.waist}</td>
                            <td className="px-6 py-4">{row.hips}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const menData = [
        { size: 'XS', chest: '34-36', waist: '28-30', hips: '34-36' },
        { size: 'S', chest: '36-38', waist: '30-32', hips: '36-38' },
        { size: 'M', chest: '38-40', waist: '32-34', hips: '38-40' },
        { size: 'L', chest: '40-42', waist: '34-36', hips: '40-42' },
        { size: 'XL', chest: '42-44', waist: '36-38', hips: '42-44' },
    ];

    const womenData = [
        { size: 'XS', chest: '31-33', waist: '23-25', hips: '33-35' },
        { size: 'S', chest: '33-35', waist: '25-27', hips: '35-37' },
        { size: 'M', chest: '35-37', waist: '27-29', hips: '37-39' },
        { size: 'L', chest: '37-40', waist: '29-32', hips: '39-42' },
        { size: 'XL', chest: '40-43', waist: '32-35', hips: '42-45' },
    ];

    return (
        <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl font-display font-bold text-gray-900 mb-4 text-center">Size Guide</h1>
                    <p className="text-center text-gray-500 mb-10">Find your perfect fit with our detailed measurement charts.</p>

                    <div className="flex justify-center space-x-4 mb-8">
                        <button
                            className={`px-6 py-2 rounded-full font-medium transition-colors ${activeTab === 'men' ? 'bg-brand-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            onClick={() => setActiveTab('men')}
                        >
                            Men
                        </button>
                        <button
                            className={`px-6 py-2 rounded-full font-medium transition-colors ${activeTab === 'women' ? 'bg-brand-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            onClick={() => setActiveTab('women')}
                        >
                            Women
                        </button>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        {activeTab === 'men' ? <Chart data={menData} /> : <Chart data={womenData} />}
                    </div>

                    <div className="mt-10 p-6 bg-gray-50 rounded-lg">
                        <h3 className="font-bold text-gray-900 mb-4">How to Measure</h3>
                        <div className="space-y-4 text-sm text-gray-600">
                            <div>
                                <strong className="block text-gray-900 mb-1">Chest:</strong>
                                Measure around the fullest part of your chest, keeping the tape horizontal.
                            </div>
                            <div>
                                <strong className="block text-gray-900 mb-1">Waist:</strong>
                                Measure around the narrowest part (typically where your body bends side to side), keeping the tape horizontal.
                            </div>
                            <div>
                                <strong className="block text-gray-900 mb-1">Hips:</strong>
                                Measure around the fullest part of your hips, keeping the tape horizontal.
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SizeGuide;

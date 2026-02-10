import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedSection from '../components/home/FeaturedSection';
import Testimonials from '../components/home/Testimonials';

const Home = () => {
    return (
        <>
            <Hero />
            <FeaturedSection />
            <Testimonials />

            {/* Newsletter Section */}
            <section className="py-20 bg-brand-black text-white text-center">
                <div className="max-w-2xl mx-auto px-4">
                    <h2 className="text-3xl font-display font-bold mb-4">Join the Club</h2>
                    <p className="text-gray-400 mb-8">Get exclusive access to new drops and 10% off your first order.</p>
                    <form className="flex flex-col sm:flex-row gap-4 justify-center">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="px-6 py-3 bg-gray-800 rounded-none focus:outline-none focus:ring-1 focus:ring-brand-gold w-full sm:w-80"
                        />
                        <button className="px-8 py-3 bg-brand-gold text-brand-black font-bold uppercase tracking-wider hover:bg-white transition-colors">
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Home;

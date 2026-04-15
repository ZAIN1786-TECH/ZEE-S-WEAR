import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedSection from '../components/home/FeaturedSection';
import Testimonials from '../components/home/Testimonials';

const Home = () => {
    return (
        <main className="bg-brand-ivory text-brand-charcoal">
            <Hero />

            <div className="h-32 bg-linear-to-b from-brand-charcoal via-[#dbd9d3] to-[#f5f5f7]" />

            <FeaturedSection />
            <Testimonials />

            {/* Newsletter Section */}
            <section className="bg-[#f5f5f7] px-6 py-32 text-center text-[#1a1a1a] md:px-12 lg:py-40">
                <div className="mx-auto max-w-3xl">
                    <p className="mb-5 text-xs uppercase tracking-[0.45em] text-brand-gold/80">Private Access</p>
                    <h2 className="mb-6 font-display text-4xl leading-tight md:text-6xl">Join ZEES WEAR Atelier</h2>
                    <p className="mx-auto mb-12 max-w-2xl text-sm leading-relaxed tracking-[0.11em] text-[#1a1a1a]/68 md:text-base">
                        Receive first access to capsule drops, private styling previews, and members-only pricing reserved for our inner circle.
                    </p>
                    <form className="mx-auto flex max-w-2xl flex-col gap-4 sm:flex-row sm:justify-center">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full border border-[#1a1a1a]/22 bg-white/65 px-6 py-4 text-sm tracking-[0.08em] text-[#1a1a1a] placeholder:text-[#1a1a1a]/35 focus:outline-none focus:ring-1 focus:ring-brand-gold"
                        />
                        <button className="ghost-btn border-[#1a1a1a]/35 px-8 py-4 text-xs uppercase tracking-[0.35em] text-[#1a1a1a]">
                            Request Invite
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default Home;

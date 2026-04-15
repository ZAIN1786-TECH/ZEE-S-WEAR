import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedSection from '../components/home/FeaturedSection';
import Testimonials from '../components/home/Testimonials';
import { motion, useScroll, useTransform } from 'framer-motion';

const Home = () => {
    const contentRef = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: contentRef,
        offset: ['start end', 'end start'],
    });
    const textureY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

    return (
        <main className="bg-brand-ivory text-brand-charcoal">
            <Hero />

            <section ref={contentRef} className="relative overflow-hidden bg-neutral-950 text-brand-ivory">
                <motion.div style={{ y: textureY }} className="atmospheric-texture pointer-events-none absolute -inset-10 opacity-35" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_45%_23%,rgba(197,160,72,0.24),rgba(26,26,26,0.88)_32%,rgba(10,10,10,0.96)_65%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_47%_27%,rgba(197,160,72,0.15),transparent_36%)]" />

                <div className="relative z-10">
                    <FeaturedSection />
                    <Testimonials />

                    {/* Newsletter Section */}
                    <section className="px-6 py-32 text-center md:px-12 lg:py-40">
                        <div className="mx-auto max-w-3xl">
                            <p className="mb-5 text-xs uppercase tracking-[0.45em] text-brand-gold/80">Private Access</p>
                            <h2 className="mb-6 font-display text-4xl leading-tight md:text-6xl">Join ZEES WEAR Atelier</h2>
                            <p className="mx-auto mb-12 max-w-2xl text-sm leading-relaxed tracking-[0.11em] text-brand-ivory/70 md:text-base">
                                Receive first access to capsule drops, private styling previews, and members-only pricing reserved for our inner circle.
                            </p>
                            <form className="mx-auto flex max-w-2xl flex-col gap-4 sm:flex-row sm:justify-center">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full border border-brand-ivory/40 bg-transparent px-6 py-4 text-sm tracking-[0.08em] text-brand-ivory placeholder:text-brand-ivory/40 focus:outline-none focus:ring-1 focus:ring-brand-gold"
                                />
                                <button className="ghost-btn border-brand-ivory/45 px-8 py-4 text-xs uppercase tracking-[0.35em] text-brand-ivory">
                                    Request Invite
                                </button>
                            </form>
                        </div>
                    </section>
                </div>
            </section>
        </main>
    );
};

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeaturedSection = () => {
    const parentVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const childVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <section className="relative overflow-hidden bg-[#f5f5f7] px-6 py-36 md:px-10 lg:px-16 lg:py-44">

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={parentVariants}
                className="relative mx-auto max-w-450"
            >
                <motion.div variants={childVariants} className="mb-20 lg:mb-24">
                    <p className="mb-7 text-xs uppercase tracking-[0.52em] text-brand-gold/75">Trending</p>
                    <h2 className="font-display text-5xl leading-[0.9] tracking-[0.06em] text-[#1a1a1a] md:text-7xl">
                        Editorial Lookbook
                    </h2>
                    <p className="mt-12 max-w-3xl text-sm leading-relaxed tracking-[0.13em] text-[#1f1f1f]/72 md:text-base">
                        Our most coveted pieces are curated as a visual story, with gallery-scale spacing and a cinematic tone that extends the hero without interruption.
                    </p>
                </motion.div>

                <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
                    <motion.article
                        variants={childVariants}
                        whileHover={{ y: -5, x: 2 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="grain-overlay group relative overflow-hidden border border-[#1a1a1a]/10 shadow-[0_8px_22px_rgba(26,26,26,0.08),0_20px_58px_rgba(26,26,26,0.06)] lg:w-[65%]"
                    >
                        <img
                            src="/Images/Elegant Evening Gown1.webp"
                            alt="Elegant Evening Gown"
                            className="editorial-grade h-140 w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.035] lg:h-175"
                        />
                        <div className="absolute inset-0 bg-linear-to-b from-[#1a1a1a]/0 via-[#1a1a1a]/10 to-[#1a1a1a]/48" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
                            <p className="mb-2 text-[10px] uppercase tracking-[0.34em] text-[#f5f5f7]/70">Evening Edit</p>
                            <h3 className="font-display text-xl text-[#f5f5f7] md:text-2xl">Elegant Evening Gown</h3>
                        </div>
                    </motion.article>

                    <motion.article
                        variants={childVariants}
                        whileHover={{ y: -4, x: 1 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="grain-overlay group relative overflow-hidden border border-[#1a1a1a]/10 shadow-[0_8px_20px_rgba(26,26,26,0.08),0_18px_44px_rgba(26,26,26,0.06)] lg:w-[35%] lg:translate-y-14"
                    >
                        <img
                            src="/Images/Premium Leather Jacket.jpg"
                            alt="Premium Leather Jacket"
                            className="editorial-grade h-120 w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03] lg:h-140"
                        />
                        <div className="absolute inset-0 bg-linear-to-b from-[#1a1a1a]/0 via-[#1a1a1a]/12 to-[#1a1a1a]/56" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
                            <p className="mb-2 text-[10px] uppercase tracking-[0.34em] text-[#f5f5f7]/70">Statement Piece</p>
                            <h3 className="font-display text-lg text-[#f5f5f7] md:text-xl">Premium Leather Jacket</h3>
                        </div>
                    </motion.article>
                </div>

                <motion.div variants={childVariants} className="mt-14 flex justify-center lg:mt-20">
                    <Link className="ghost-btn text-white border-[#1a1a1a]/35 px-10 py-4 text-xs uppercase tracking-[0.34em]" to="/lookbook">
                        Explore Full Lookbook
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default FeaturedSection;

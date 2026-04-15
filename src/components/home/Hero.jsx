import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const Hero = () => {
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();
    const imageY = useSpring(useTransform(scrollYProgress, [0, 0.6], [0, 120]), {
        stiffness: 120,
        damping: 30,
        mass: 0.4,
    });

    const headlineWords = ['Elegance', 'is', 'an', 'Attitude'];

    return (
        <section className="relative min-h-screen overflow-hidden bg-brand-ivory px-6 pb-20 pt-24 md:px-10 lg:px-16 lg:pb-28 lg:pt-28">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(197,160,72,0.22),transparent_43%),radial-gradient(circle_at_84%_76%,rgba(26,26,26,0.2),transparent_36%)]" />

            <div className="relative mx-auto grid min-h-[88vh] w-full max-w-450 grid-cols-1 gap-14 lg:grid-cols-[1fr_1.18fr] lg:items-end lg:gap-8">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { staggerChildren: 0.08, delayChildren: 0.2 },
                        },
                    }}
                    className="relative z-20 pb-2 lg:max-w-xl"
                >
                    <motion.p
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="mb-7 text-xs uppercase tracking-[0.5em] text-brand-gold"
                    >
                        ZEES WEAR
                    </motion.p>

                    <h1 className="font-display text-[clamp(3.4rem,8.8vw,8.7rem)] leading-[0.88] text-brand-charcoal">
                        {headlineWords.map((word, index) => (
                            <motion.span
                                key={word}
                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                className="mr-[0.22em] inline-block"
                                style={{
                                    color: index === 0 ? 'rgba(26,26,26,0.92)' : 'rgba(26,26,26,0.86)',
                                }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h1>

                    <motion.p
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="mt-8 max-w-md text-sm leading-relaxed tracking-[0.09em] text-brand-charcoal/70 md:text-base"
                    >
                        Ultra-refined silhouettes for the modern wardrobe. Precision tailoring, editorial textures, and quiet confidence in every piece.
                    </motion.p>

                    <motion.div
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="mt-10 flex flex-col gap-4 sm:flex-row"
                    >
                        <button className="ghost-btn px-8 py-4 text-xs uppercase tracking-[0.34em]" onClick={() => navigate('/shop')}>
                            Shop Now
                        </button>
                        <button
                            className="ghost-btn border-brand-charcoal/45 px-8 py-4 text-xs uppercase tracking-[0.34em] text-brand-charcoal"
                            onClick={() => navigate('/lookbook')}
                        >
                            View Lookbook
                        </button>
                    </motion.div>
                </motion.div>

                <motion.div style={{ y: imageY }} className="relative lg:h-[88vh]">
                    <div className="absolute -left-10 top-14 hidden h-56 w-56 rounded-full bg-brand-gold/20 blur-3xl lg:block" />
                    <div className="grain-overlay relative h-[68vh] overflow-hidden rounded-[2.6rem] bg-brand-charcoal lg:h-full">
                        <img
                            src="/Images/Winter Wool Coat.jpg"
                            alt="ZEES WEAR editorial model"
                            className="h-full w-full object-cover object-[58%_26%] saturate-90 transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-brand-charcoal/42" />
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.45 }}
                    className="pointer-events-none absolute bottom-[5%] right-[6%] z-10 font-display text-[clamp(2.6rem,10vw,10rem)] leading-none text-transparent [WebkitTextStroke:1px_rgba(249,249,249,0.42)]"
                >
                    Elegance is an Attitude
                </motion.p>
            </div>
        </section>
    );
};

export default Hero;

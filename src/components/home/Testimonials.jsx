import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        id: 1,
        name: 'Sarah M.',
        role: 'Fashion Blogger',
        content: "The quality of the fabric is unmatched. I've never felt so confident in an outfit before.",
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    },
    {
        id: 2,
        name: 'James L.',
        role: 'Verified Buyer',
        content: "Fast delivery and the packaging felt so premium. Zees Wear is now my go-to for essentials.",
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    },
    {
        id: 3,
        name: 'Emily R.',
        role: 'Designer',
        content: "I love the minimalist aesthetic. It's rare to find a brand that nails both style and comfort.",
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    },
];

const Testimonials = () => {
    return (
        <section className="paper-texture relative overflow-hidden bg-[#eae7e1] px-6 py-32 md:px-10 lg:px-16 lg:py-40">
            <div className="relative mx-auto max-w-450">
                <div className="mb-16 max-w-3xl">
                    <p className="mb-5 text-xs uppercase tracking-[0.45em] text-brand-gold/80">Social Proof</p>
                    <h2 className="font-display text-4xl leading-[0.95] text-[#25211a] md:text-6xl">
                        Trusted by tastemakers, worn by insiders.
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <motion.article
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.35 }}
                            transition={{ duration: 0.65, delay: index * 0.08 }}
                            whileHover={{ scale: 1.03 }}
                            className="relative overflow-hidden rounded-md border border-brand-gold/45 bg-white/40 p-8 shadow-[0_6px_12px_rgba(26,26,26,0.06),0_14px_32px_rgba(26,26,26,0.08)] backdrop-blur-md transition-all duration-700 hover:shadow-2xl md:p-10"
                        >
                            <div className="mb-5 flex text-[#b39145]">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" />
                                ))}
                            </div>
                            <p className="mb-8 font-display text-xl leading-relaxed text-[#2b271f]/90 md:text-2xl">"{testimonial.content}"</p>
                            <div className="flex items-center gap-4">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="h-12 w-12 rounded-full object-cover"
                                />
                                <div>
                                    <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1f1b14]">{testimonial.name}</h4>
                                    <p className="mt-1 text-xs uppercase tracking-[0.22em] text-[#1f1b14]/58">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

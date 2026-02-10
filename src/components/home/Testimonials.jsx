import React from 'react';
import { Star } from 'lucide-react';

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
        <section className="py-20 bg-brand-gray">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-black mb-4">
                        What Our Customers Say
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex text-brand-gold mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" />
                                ))}
                            </div>
                            <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                            <div className="flex items-center">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="h-10 w-10 rounded-full object-cover mr-4"
                                />
                                <div>
                                    <h4 className="font-bold text-sm text-brand-black">{testimonial.name}</h4>
                                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

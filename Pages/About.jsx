import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Shirt, ShoppingBag, Watch } from "lucide-react";

const About = () => {
  const navigate = useNavigate();
  const sectionRefs = useRef([]);

  const handleExploreClick = () => navigate("/collection");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
            entry.target.style.opacity = "1";
          }
        }),
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => sectionRefs.current.forEach((ref) => ref && observer.unobserve(ref));
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) sectionRefs.current.push(el);
  };

  const offerings = [
    {
      icon: <Shirt className="w-10 h-10 text-indigo-500" />,
      title: "Men’s Collection",
      desc: "Modern fits, clean aesthetics, and bold essentials built for everyday confidence.",
    },
    {
      icon: <ShoppingBag className="w-10 h-10 text-pink-500" />,
      title: "Women’s Collection",
      desc: "Effortless style meets versatility — crafted to empower every move you make.",
    },
    {
      icon: <Watch className="w-10 h-10 text-amber-500" />,
      title: "Accessories",
      desc: "Refined add-ons that complete your look with subtle sophistication.",
    },
  ];

  return (
    <div className="bg-linear-to-br from-gray-50 mx-4  rounded-2xl via-white to-amber-50/30 text-gray-900 font-sans overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex flex-col justify-center items-center text-center px-6 font-serif rounded-2xl">
        <div className="absolute inset-0 bg-linear-to-br from-black via-gray-900 to-amber-950 opacity-90 rounded-2xl"></div>
        <div className="absolute inset-0 bg-black rounded-2xl"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 space-y-8 max-w-3xl"
        >
          <span className="inline-block bg-amber-500/20 text-yellow-600 px-6 py-2 rounded-full text-xs uppercase font-semibold tracking-wider border border-amber-500/40">
            Our Story
          </span>
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight text-white">
            Redefining <br />
            <span className="bg-linear-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
              Fashion Every Day
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Where timeless design meets modern streetwear energy. Crafted for individuality, built to last.
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-t border-gray-200 bg-white/60 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["30+", "Premium Products"],
            ["3", "Collections"],
            ["100%", "Quality Assured"],
            ["24/7", "Support"],
          ].map(([num, label], i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="space-y-2"
            >
              <div className="text-5xl font-bold text-amber-500">{num}</div>
              <p className="text-gray-600 uppercase tracking-wide font-semibold text-sm">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Journey Section */}
      <section
        ref={addToRefs}
        className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 px-6 py-20 items-center opacity-0 bg-gray-50"
      >
        <div className="space-y-6">
          <span className="text-cyan-800 font-semibold uppercase tracking-wider">The Journey</span>
          <h2 className="text-5xl font-extrabold">
            From <span className="text-amber-600 font-serif font-bold">Vision</span> to Reality
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Zee’s Wear was born from a belief: fashion should empower authentic expression. From a small idea to a trusted
            streetwear brand — our mission remains to make premium design accessible.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Each collection is a story — of craftsmanship, care, and creativity that meets culture.
          </p>
        </div>
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="relative h-80 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-linear-to-br from-black/20 to-black"
        >
          <div className="absolute inset-0 bg-black text-white" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white ">
            <div className="text-7xl mb-4"></div>
            <h3 className="text-2xl text-shadow-black text-white font-bold">Crafted With Passion</h3>
            <p className="text-white  rounded-2xl w-46 items-center">Every thread tells a story</p>
          </div>
        </motion.div>
      </section>

      {/* Offerings Section */}
      <section className="relative py-24 bg-linear-to-br from-white via-gray-50 to-amber-50/50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient ] blur-3xl"></div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-extrabold mb-16 flex items-center justify-center gap-3"
          >
            <Sparkles className="w-8 h-8 text-indigo-500" /> What We Offer
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {offerings.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-10 shadow-lg border border-gray-100 hover:shadow-2xl transition-all group"
              >
                <div className="flex justify-center mb-6">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
                <div className="mt-6 h-1 w-full bg-linear-to-r from-red-500 via-pink-400 to-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-all" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={addToRefs}
        className="text-center py-24 px-6 bg-linear-to-br from-gray-900 via-black to-amber-950 text-white opacity-0"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-extrabold mb-6"
        >
          Ready to Elevate Your Style?
        </motion.h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
          Explore our full collection and discover timeless designs that fit your vibe.
        </p>
        <button
          onClick={handleExploreClick}
          className="group relative inline-flex items-center justify-center px-10 py-4 bg-amber-500 text-black font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105"
        >
          <span className="absolute inset-0 bg-linear-to-r from-amber-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          <span className="relative flex items-center gap-2">
            Explore Collection
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </button>
      </section>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default About;

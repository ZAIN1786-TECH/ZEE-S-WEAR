import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    hp: '' // honeypot field
  });
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const fadeElementsRef = useRef([]);

  useEffect(() => {
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animationDelay = '120ms';
            entry.target.classList.add('opacity-100');
          }
        });
      },
      { threshold: 0.12 }
    );

    fadeElementsRef.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      fadeElementsRef.current.forEach((element) => {
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const addToFadeRefs = (el) => {
    if (el && !fadeElementsRef.current.includes(el)) {
      fadeElementsRef.current.push(el);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('');

    // Honeypot check
    if (formData.hp) {
      setFormStatus('Spam detected.');
      return;
    }

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus('Please fill name, email and message.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual form submission
      await new Promise(resolve => setTimeout(resolve, 900));
      
      setFormStatus('Thanks! We got your message — we will reply within 24–48 hours.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        hp: ''
      });
    } catch (err) {
      setFormStatus('Something went wrong. Try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMessageUsClick = () => {
    document.getElementById('contact-form')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const socialLinks = [
    { label: 'Instagram', short: 'IG' },
    { label: 'Facebook', short: 'FB' },
    { label: 'Twitter', short: 'X' }
  ];

  return (
    <div className="bg-linear-to-br from-gray-100 via-amber-50 to-gray-200 font-sans min-h-screen">
      {/* Hero Section */}
      <header className="max-w-6xl mx-auto rounded-2xl m-4 overflow-hidden shadow-lg">
        <div 
          className="relative bg-cover bg-center h-44 md:h-56 rounded-2xl" 
          style={{ backgroundImage: "url('./Images/bg1.jpg')" }}
        >
          <div className="relative p-4 text-black flex items-center justify-between h-full">
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-bold">Contact Zee's Wear</h1>
              <p className="text-sm md:text-base opacity-90">
                Questions, collabs, wholesale — hit us up. We'll reply fast.
              </p>
            </div>
            <button 
              onClick={handleMessageUsClick}
              className="bg-amber-400 text-black px-4 py-2 rounded-full hover:scale-105 transition"
            >
              Message Us
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
        
        {/* Contact Info / Socials */}
        <aside 
          ref={addToFadeRefs}
          className="col-span-1 bg-white rounded-2xl p-6 shadow-md fade-in-up opacity-0 transition-opacity duration-500"
        >
          <h2 className="text-xl font-bold text-amber-600 mb-3">Get in touch</h2>
          <p className="text-sm mb-4">
            Prefer email or quick DM? We got you. Below are the fastest ways to reach Zee's Wear.
          </p>

          <dl className="space-y-3 text-sm">
            <div>
              <dt className="font-semibold">Email</dt>
              <dd>
                <a 
                  href="mailto:zeedesignx@gmail.com" 
                  className="text-amber-600 hover:underline"
                >
                  zeedesignx@gmail.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Phone</dt>
              <dd>
                <a 
                  href="tel:+923181621718" 
                  className="hover:underline"
                >
                  +92 318 1621718
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Location</dt>
              <dd>Karachi, Pakistan (online store)</dd>
            </div>
          </dl>

          <hr className="my-4" />

          <h3 className="font-semibold mb-2">Follow us</h3>
          <div className="flex space-x-3">
            {socialLinks.map((social, index) => (
              <a 
                key={index}
                href="#" 
                aria-label={social.label}
                className="px-3 py-2 bg-zinc-900 text-white rounded-lg hover:scale-105 transition"
              >
                {social.short}
              </a>
            ))}
          </div>

          <hr className="my-4" />
          <p className="text-xs text-gray-600">
            Business hours: Mon — Sat, 10:00 — 18:00 PKT
          </p>
        </aside>

        {/* Contact Form */}
        <section 
          id="contact-form"
          ref={addToFadeRefs}
          className="col-span-2 bg-white rounded-2xl p-6 shadow-md fade-in-up opacity-0 transition-opacity duration-500"
        >
          <h2 className="text-2xl font-bold mb-4 text-amber-600">Send us a message</h2>
          <p className="text-sm mb-4">
            Tell us what you need — orders, collabs, press, or just good vibes. We'll get back in 24–48 hours.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot to reduce spam */}
            <label className="sr-only" htmlFor="hp">Leave this empty</label>
            <input 
              id="hp" 
              name="hp" 
              type="text" 
              className="sr-only" 
              autoComplete="off"
              value={formData.hp}
              onChange={handleInputChange}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">Name</label>
                <input 
                  id="name" 
                  name="name" 
                  required 
                  type="text" 
                  placeholder="Your name" 
                  className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <input 
                  id="email" 
                  name="email" 
                  required 
                  type="email" 
                  placeholder="you@example.com" 
                  className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium">Subject</label>
              <input 
                id="subject" 
                name="subject" 
                type="text" 
                placeholder="Order question, collab, wholesale..." 
                className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300"
                value={formData.subject}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="6" 
                required 
                placeholder="Tell us everything..." 
                className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300"
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="flex items-center space-x-3">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-amber-400 text-black font-semibold px-5 py-2 rounded-full shadow hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send message'}
              </button>
              {formStatus && (
                <div className="text-sm text-gray-600">{formStatus}</div>
              )}
            </div>
          </form>
        </section>

        {/* Map / Store Card */}
        <aside 
          ref={addToFadeRefs}
          className="col-span-1 bg-white rounded-2xl p-6 shadow-md fade-in-up opacity-0 transition-opacity duration-500"
        >
          <h3 className="font-semibold text-amber-600 mb-3">Visit (by appointment)</h3>
          <p className="text-sm mb-4">
            Drop by our studio in Karachi — we do fittings & wholesale meetings by appointment only.
          </p>

          <div className="rounded-lg overflow-hidden mb-4 map-h">
            <iframe 
              title="Zee's Wear location" 
              className="w-full h-full border-0" 
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.1234567890123!2d67.0011!3d24.8607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f...%3A0x...!2sKarachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v0000000000000"
              allowFullScreen
            ></iframe>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Contact;
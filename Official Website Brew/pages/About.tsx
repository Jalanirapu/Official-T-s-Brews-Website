import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-serif font-bold text-stone-900 mb-6">Our Story</h1>
        <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
      </div>
      
      <div className="prose prose-stone prose-lg mx-auto text-stone-700">
        <img 
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
          alt="Coffee Beans" 
          className="w-full h-80 object-cover rounded-xl shadow-lg mb-12"
        />

        <p className="mb-6">
          Founded in 2020, <strong>T's Coffee & Brews</strong> started with a simple mission: to make high-quality beverages accessible in bulk for everyone. We realized that whether you are hosting a garden party, stocking an office kitchen, or just have a large family that loves caffeine, buying by the cup just doesn't cut it.
        </p>

        <h3 className="text-2xl font-serif font-bold text-stone-900 mt-10 mb-4">The "Bulk" Philosophy</h3>
        <p className="mb-6">
          We specialize in large-format beverages. Our coffee grounds are sold in 5lb bags to ensure you're never scraping the bottom of the bag on a Monday morning. Our famous Southern Sweet Tea and Classic Lemonade are sold strictly by the gallon because we know one glass is never enough.
        </p>

        <h3 className="text-2xl font-serif font-bold text-stone-900 mt-10 mb-4">Sourcing with Care</h3>
        <p className="mb-6">
          Despite our volume, we never compromise on quality. Our beans are ethically sourced from small-lot farmers in Ethiopia and Sumatra. Our lemons are organic California-grown, and our tea leaves are hand-picked.
        </p>

        <div className="bg-stone-100 p-8 rounded-lg mt-12 border-l-4 border-amber-500">
          <p className="italic text-stone-600">
            "We believe that a great drink brings people together, and a lot of great drinks keep them together longer."
          </p>
          <p className="mt-4 font-bold text-stone-900">— The T's Coffee Team</p>
        </div>
      </div>
    </div>
  );
};

export default About;
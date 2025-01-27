'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { TrendingUp, Award, Grid } from 'lucide-react';

const HomePage = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setShowText(true);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">ArtBlock</div>
        <button className="px-4 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-900 transition-all transform hover:scale-105">
          Connect Wallet
        </button>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          <h1
            className={`text-6xl font-bold text-black transition-opacity duration-1000 ${
              showText ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Discover Rare Digital Art
          </h1>
          <p
            className={`text-xl text-gray-600 max-w-2xl mx-auto transition-opacity duration-1000 delay-500 ${
              showText ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Join the next generation of digital art collectors. Explore unique NFTs, 
            participate in live auctions, and own pieces of digital history.
          </p>
          <Link href="/auctions" className="inline-block">
            <button
              className={`px-8 py-4 bg-black text-white rounded-full text-lg font-semibold hover:bg-gray-900 transition-all transform hover:scale-105 duration-300 ${
                showText ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Explore Auctions
            </button>
          </Link>
        </div>

        {/* Features */}
        <div className={`grid md:grid-cols-3 gap-8 mt-20 transition-opacity duration-1000 delay-700 ${
          showText ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="bg-gray-50 p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300">
            <TrendingUp className="w-12 h-12 text-black mb-4" />
            <h3 className="text-xl font-semibold mb-2">Live Auctions</h3>
            <p className="text-gray-600">
              Participate in real-time bidding for exclusive digital artworks
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300">
            <Award className="w-12 h-12 text-black mb-4" />
            <h3 className="text-xl font-semibold mb-2">Verified Artists</h3>
            <p className="text-gray-600">
              Discover and collect works from renowned digital creators
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300">
            <Grid className="w-12 h-12 text-black mb-4" />
            <h3 className="text-xl font-semibold mb-2">Unique Collections</h3>
            <p className="text-gray-600">
              Browse through carefully curated collections of digital art
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, Heart, Search, X } from "lucide-react";

interface Auction {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  attributes: { trait_type: string; value: string }[];
}

const AuctionsPage = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

 
  const localImages = [
    "/images/DALL·E 2025-01-31 22.22.46 - A futuristic cyberpunk city with neon lights, flying cars, and high-tech skyscrapers.webp",
    "/images/DALL·E 2025-01-31 22.22.48 - A majestic dragon soaring over a medieval castle, breathing fire into the sky.webp",
    "/images/DALL·E 2025-01-31 22.22.50 - A mysterious astronaut exploring an alien planet with vibrant, glowing plants and strange creatures.webp",
    "/images/DALL·E 2025-01-31 22.22.52 - A futuristic samurai warrior in high-tech armor wielding an energy sword in a neon-lit city.webp",
    "/images/DALL·E 2025-01-31 22.22.53 - An enchanted forest with glowing mushrooms, floating lanterns, and a mystical waterfall.webp",
    "/images/DALL·E 2025-01-31 22.22.55 - A futuristic racing car speeding on a neon-lit track in a cyber city.webp"
  ];

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
       
        const nftFiles = Array.from({ length: 6 }, (_, i) =>
          `/nfts/nft_metadata_${i + 1}.json`
        );

        const fetchedNFTs = await Promise.all(
          nftFiles.map(async (url, index) => {
            const res = await fetch(url);
            if (!res.ok) {
              throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
            }
            const data = await res.json();

        
            const imageUrl = localImages[index];

            return {
              id: (index + 1).toString(),
              title: data.name,
              description: data.description,
              imageUrl,
              attributes: data.attributes,
            };
          })
        );

        setAuctions(fetchedNFTs);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      }
    };

    fetchNFTs();
  }, []);

  
  const filteredAuctions = auctions.filter((auction) =>
    auction.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-black">
     
      <nav className="px-6 py-4 flex items-center justify-between border-b border-gray-200">
        <div className="text-2xl font-bold">ArtBlock</div>
        <div className="flex-1 mx-4 flex justify-center">
          <div className="relative w-1/3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search NFTs by name..."
              className="w-full border border-gray-300 rounded pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
           
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-8 flex items-center pr-2"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            )}
           
            <button
              onClick={() => {}}
              className="absolute inset-y-0 right-0 flex items-center bg-gray-200 hover:bg-gray-300 px-3 rounded-r"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors">
          Connect Wallet
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Live Auctions</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAuctions.map((auction) => (
            <Link href={`/auctions/${auction.id}`} key={auction.id}>
              <div className="bg-gray-50 rounded-xl overflow-hidden hover:transform hover:scale-[1.02] transition-transform">
                <div className="relative aspect-square">
                  <img
                    src={auction.imageUrl}
                    alt={auction.title}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-4 right-4 p-2 bg-white/50 rounded-full hover:bg-white/70">
                    <Heart className="w-5 h-5 text-black" />
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{auction.title}</h3>
                  <p className="text-gray-600">{auction.description}</p>
                  <div className="flex items-center text-gray-600 mt-2">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Live Auction</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {filteredAuctions.length === 0 && (
          <p className="mt-8 text-center text-gray-500">No NFTs found.</p>
        )}
      </main>
    </div>
  );
};

export default AuctionsPage;

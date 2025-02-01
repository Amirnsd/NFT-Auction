"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Auction {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  attributes: { trait_type: string; value: string }[];
}

const AuctionDetailPage = () => {
  const { id } = useParams(); 
  const router = useRouter();
  const [auction, setAuction] = useState<Auction | null>(null);
  const [loading, setLoading] = useState(true);

 
  const localImages = [
    "/images/DALL·E 2025-01-31 22.22.46 - A futuristic cyberpunk city with neon lights, flying cars, and high-tech skyscrapers.webp",
    "/images/DALL·E 2025-01-31 22.22.48 - A majestic dragon soaring over a medieval castle, breathing fire into the sky.webp",
    "/images/DALL·E 2025-01-31 22.22.50 - A mysterious astronaut exploring an alien planet with vibrant, glowing plants and strange creatures.webp",
    "/images/DALL·E 2025-01-31 22.22.52 - A futuristic samurai warrior in high-tech armor wielding an energy sword in a neon-lit city.webp",
    "/images/DALL·E 2025-01-31 22.22.53 - An enchanted forest with glowing mushrooms, floating lanterns, and a mystical waterfall.webp",
    "/images/DALL·E 2025-01-31 22.22.55 - A futuristic racing car speeding on a neon-lit track in a cyber city.webp"
  ];

  useEffect(() => {
    const fetchNFT = async () => {
      try {
       
        const url = `/nfts/nft_metadata_${id}.json`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
        }
        const data = await res.json();

        
        const index = parseInt(id) - 1;
        const imageUrl = localImages[index];

        setAuction({
          id,
          title: data.name,
          description: data.description,
          imageUrl,
          attributes: data.attributes,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching NFT:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchNFT();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Failed to load NFT details.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <nav className="px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <div className="text-2xl font-bold">ArtBlock</div>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
        >
          Back
        </button>
      </nav>
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <img
              src={auction.imageUrl}
              alt={auction.title}
              className="w-full h-auto object-cover rounded-xl"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">{auction.title}</h1>
            <p className="text-gray-700 mb-4">{auction.description}</p>
            <div className="space-y-2">
              {auction.attributes.map((attr, index) => (
                <div key={index} className="border p-2 rounded">
                  <strong>{attr.trait_type}:</strong> {attr.value}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuctionDetailPage;

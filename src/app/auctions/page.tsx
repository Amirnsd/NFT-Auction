import React from 'react';
import Link from 'next/link';
import { Clock, Heart } from 'lucide-react';


interface Auction {
  id: string;
  title: string;
  artist: string;
  currentBid: number;
  timeLeft: string;
  imageUrl: string;
}

const AuctionsPage = () => {
  
  const auctions: Auction[] = [
    {
      id: '1',
      title: 'Neon Horizons',
      artist: 'FutureFrame Studios',
      currentBid: 0.169,
      timeLeft: '13h 43m',
      imageUrl: '/api/placeholder/400/400'
    },
    {
      id: '2',
      title: 'Mystic Glow',
      artist: 'Enchanted Canvas',
      currentBid: 0.245,
      timeLeft: '6h 22m',
      imageUrl: '/api/placeholder/400/400'
    },
    {
      id: '3',
      title: 'Shapes in Motion',
      artist: ' Geometrika Labs',
      currentBid: 0.324,
      timeLeft: '2h 15m',
      imageUrl: '/api/placeholder/400/400'
    },
    {
      id: '4',
      title: 'Pixel Vibes',
      artist: ' Nostalgia Artworks',
      currentBid: 0.198,
      timeLeft: '8h 55m',
      imageUrl: '/api/placeholder/400/400'
    },
    {
      id: '5',
      title: 'Timeless Mirage',
      artist: ' Dreamscape Designs',
      currentBid: 0.412,
      timeLeft: '4h 30m',
      imageUrl: '/api/placeholder/400/400'
    },
    {
      id: '6',
      title: 'Slam Energy',
      artist: ' Momentum Art Collective',
      currentBid: 0.267,
      timeLeft: '9h 15m',
      imageUrl: '/api/placeholder/400/400'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <nav className="px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <div className="text-2xl font-bold">ArtBlock</div>
        <button className="px-4 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors">
          Connect Wallet
        </button>
      </nav>

      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">Live Auctions</h1>
          <div className="flex gap-4">
            <select className="bg-gray-100 text-black px-4 py-2 rounded-lg">
              <option>Recently Added</option>
              <option>Ending Soon</option>
              <option>Price: High to Low</option>
              <option>Price: Low to High</option>
            </select>
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {auctions.map((auction) => (
            <Link href={`/auction/${auction.id}`} key={auction.id}>
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
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{auction.title}</h3>
                      <p className="text-gray-600">{auction.artist}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Current bid</p>
                      <p className="font-semibold">{auction.currentBid} ETH</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{auction.timeLeft} left</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AuctionsPage;
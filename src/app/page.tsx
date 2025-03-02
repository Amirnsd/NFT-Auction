import { AuctionCard } from "@/components/auction-card";

export default async function Home() {
    const auctions = await fetch("http://localhost:3000/api/auctions").then(
        (res) => res.json()
    );

    return (
        <div className="grid grid-cols-4 gap-4">
            {auctions.map((auction: any) => (
                <AuctionCard
                    key={auction.address}
                    title={auction.title}
                    image={auction.image}
                    description={auction.description}
                    price={auction.price}
                    ends={new Date(auction.ends)}
                    address={auction.address}
                />
            ))}
        </div>
    );
}

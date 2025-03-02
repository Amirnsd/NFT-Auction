import { Text, Gavel, Timer } from "lucide-react";
import { EndsIn } from "@/components/ends-in";
import { Bid } from "@/components/bid";
import { truncateAddress } from "@/lib/utils";

export default function Auction() {
    const nftData = {
        title: "Doodle #5221",
        image: "https://i.seadn.io/s/raw/files/16fa6d078b38ae323e22564171d82e7d.png?auto=format&dpr=1&w=3840",
        description:
            "A community-driven collectibles project featuring art by Burnt Toast. Doodles come in a joyful range of colors, traits and sizes with a collection size of 10,000. Each Doodle allows its owner to vote for experiences and activations paid for by the Doodles Community Treasury. Burnt Toast is the working alias for Scott Martin, a Canadian-based illustrator, designer, animator and muralist.",
        price: 1000,
        ends: new Date("2025-03-07"),
        address: "0xdF8C3A7FFbdC144f462687120E4AE4C4e5E55abE",
        creator: "0xdF8C3A7FFbdC144f462687120E4AE4C4e5E55abE",
        bidders: [
            {
                address: "0xdF8C3A7ijfC144f462687120E4AE4C4e5E55abE",
                time: new Date("2025-02-24"),
            },
            {
                address: "0xdF8C3A7ijfC144f462687120E4AE4C4e5E55abF",
                time: new Date("2025-02-28"),
            },
            {
                address: "0xdF8C3A7ijfC144f462687120E4AE4C4e5E55abG",
                time: new Date("2025-03-01"),
            },
        ],
    };

    return (
        <div className="grid grid-cols-2 gap-10 h-full">
            <div className="rounded-lg overflow-hidden">
                <picture>
                    <img
                        src={nftData.image}
                        alt=""
                        className="object-cover h-full w-full"
                    />
                </picture>
            </div>

            <div className="flex flex-col h-full ">
                <div className="flex-grow overflow-y-auto">
                    <div className="space-y-4 h-full">
                        <div>
                            <h1 className="font-bold text-5xl">
                                {nftData.title}
                            </h1>
                            <p className="text-muted-foreground">
                                Creator:{" "}
                                {truncateAddress(
                                    nftData.creator as `0x${string}`
                                )}
                            </p>
                        </div>

                        <div className="space-y-1 flex flex-col">
                            <div className="flex space-x-1">
                                <Text />
                                <span className="font-semibold text-md">
                                    Description
                                </span>
                            </div>

                            <p className="text-muted-foreground">
                                {nftData.description}
                            </p>
                        </div>

                        <div className="space-y-1 flex flex-col">
                            <div className="flex space-x-1">
                                <Timer />
                                <span className="font-semibold text-md">
                                    Ends In
                                </span>
                            </div>

                            <EndsIn ends={nftData.ends} />
                        </div>

                        <div className="space-y-1 flex flex-col">
                            <div className="flex space-x-1">
                                <Gavel />
                                <span className="font-semibold text-md">
                                    Bidders
                                </span>
                            </div>

                            <div className="border rounded-lg divide-y px-2">
                                {nftData.bidders.map((bidder) => (
                                    <div
                                        key={bidder.address}
                                        className="flex items-center justify-between p-2"
                                    >
                                        <p>
                                            {truncateAddress(
                                                bidder.address as `0x${string}`
                                            )}
                                        </p>
                                        <p>
                                            {bidder.time.toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Bid minBid={nftData.price} />
                </div>
            </div>
        </div>
    );
}

import { Text, Gavel, Timer } from "lucide-react";
import { EndsIn } from "@/components/ends-in";
import { Bid } from "@/components/bid";
import { truncateAddress } from "@/lib/utils";

export default async function Auction({
    params,
}: {
    params: Promise<{ address: string }>;
}) {
    const { address } = await params;
    const auction = await fetch(
        `http://localhost:3000/api/auctions/${address}`
    ).then((res) => res.json());

    return (
        <div className="grid grid-cols-2 gap-10 h-full">
            <div className="rounded-lg overflow-hidden">
                <picture>
                    <img
                        src={auction.image}
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
                                {auction.title}
                            </h1>
                            <p className="text-muted-foreground">
                                Creator:{" "}
                                {truncateAddress(
                                    auction.creator as `0x${string}`
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
                                {auction.description}
                            </p>
                        </div>

                        <div className="space-y-1 flex flex-col">
                            <div className="flex space-x-1">
                                <Timer />
                                <span className="font-semibold text-md">
                                    Ends In
                                </span>
                            </div>

                            <EndsIn ends={new Date(auction.ends)} />
                        </div>

                        <div className="space-y-1 flex flex-col">
                            <div className="flex space-x-1">
                                <Gavel />
                                <span className="font-semibold text-md">
                                    Bidders
                                </span>
                            </div>

                            <div className="border rounded-lg divide-y px-2">
                                {auction.bidders.map((bidder: any) => (
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
                                            {new Date(
                                                bidder.time
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Bid minBid={auction.price} />
                </div>
            </div>
        </div>
    );
}

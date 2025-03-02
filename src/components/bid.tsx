"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

type BidProps = {
    minBid: number;
};

export function Bid({ minBid }: BidProps) {
    const [bidAmount, setBidAmount] = useState<number | null>(null);

    function handleBidChange(event: React.ChangeEvent<HTMLInputElement>) {
        setBidAmount(Number(event.target.value));
    }

    return (
        <div className="sticky bottom-0 flex flex-col items-center">
            <div className="border w-fit border-b-0 p-2 rounded-t-lg bg-background">
                <span className="text-muted-foreground">Min Bid:</span>{" "}
                <span className="font-semibold">${minBid}</span>
            </div>

            <div className="border-t-1 w-full pt-4 space-y-4">
                <Input
                    type="number"
                    value={bidAmount ?? ""}
                    onChange={handleBidChange}
                    placeholder="Enter bid amount"
                />

                <Button
                    variant="default"
                    onClick={() =>
                        toast(
                            "We are connecting some wires. We'll let you place bids soon!"
                        )
                    }
                    disabled={bidAmount! < minBid}
                    className="w-full hover:cursor-pointer"
                >
                    Place Bid
                </Button>
            </div>
        </div>
    );
}

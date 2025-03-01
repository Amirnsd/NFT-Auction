"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type AuctionCardProps = {
    title: string;
    image: string;
    description: string;
    price: number;
    ends: Date;
    address: `0x${string}`;
};

export function AuctionCard({
    title,
    image,
    description,
    price,
    ends,
    address,
}: AuctionCardProps) {
    const [timeLeft, setTimeLeft] = useState(getTimeLeft(ends));

    function getTimeLeft(ends: Date) {
        const difference = +new Date(ends) - +new Date();
        let timeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeLeft(ends));
        }, 1000);

        return () => clearInterval(timer);
    }, [ends]);

    return (
        <Link
            href={`/auctions/${address}`}
            className="border max-w-[250px] flex flex-col overflow-hidden rounded-lg space-y-4 group"
        >
            <div className="overflow-hidden">
                <picture>
                    <img
                        src={image}
                        alt={`${title}'s image`}
                        className="group-hover:scale-105 ease-in-out duration-300 "
                    />
                </picture>
            </div>

            <div className="px-2 space-y-1">
                <p className="font-bold text-xl">{title}</p>
                <p className="font-semibold">${price}</p>
                <p className="text-muted-foreground line-clamp-2">
                    {description}
                </p>
            </div>

            <div className="border-t-1 flex justify-center flex-col items-center p-1">
                <p className="text-muted-foreground">Ends In</p>
                <div className="flex space-x-1 text-xl font-semibold">
                    <p>
                        <span className="text-foreground">{timeLeft.days}</span>
                        d
                    </p>
                    <p>
                        <span className="text-foreground">
                            {timeLeft.hours}
                        </span>
                        h
                    </p>
                    <p>
                        <span className="text-foreground">
                            {timeLeft.minutes}
                        </span>
                        m
                    </p>
                </div>
            </div>
        </Link>
    );
}

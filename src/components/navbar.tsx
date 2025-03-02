"use client";

import Link from "next/link";
import { ConnectKitButton } from "connectkit";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Navbar() {
    return (
        <header className="sticky left-0 top-0 z-[100] flex w-full flex-col border-b border-border bg-background">
            <nav className="flex h-[48px] bg-background justify-center">
                <div className="container flex items-center justify-between w-full">
                    <Link href="/" className="font-bold text-3xl">
                        ArtBlock
                    </Link>

                    <Input
                        type="text"
                        placeholder="Search"
                        className="w-[300px]"
                    />

                    <ConnectKitButton.Custom>
                        {({
                            isConnected,
                            isConnecting,
                            show,
                            truncatedAddress,
                        }) => (
                            <Button
                                onClick={show}
                                className="hover:cursor-pointer"
                                disabled={isConnecting}
                                variant={isConnected ? "secondary" : "default"}
                            >
                                {isConnected
                                    ? truncatedAddress
                                    : isConnecting
                                    ? "Connecting..."
                                    : "Connect Wallet"}
                            </Button>
                        )}
                    </ConnectKitButton.Custom>
                </div>
            </nav>
        </header>
    );
}

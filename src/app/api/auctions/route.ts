import auctions from "@/data/auctions.json";

export function GET() {
    const data = auctions.map((a) => ({
        title: a.title,
        image: a.image,
        description: a.description,
        price: a.price,
        ends: a.ends,
        address: a.address,
    }));

    return Response.json(data);
}

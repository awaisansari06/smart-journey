import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import type { Hotel } from "./types";

type Props = {
    hotel: Hotel;
};

function HotelCardItem({ hotel }: Props) {
    const [photoUrl, setPhotoUrl] = useState<string>();

    useEffect(() => {
        if (hotel?.hotel_name) GetGooglePlaceDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hotel?.hotel_name]);

    const GetGooglePlaceDetail = async () => {
        try {
            const result = await axios.post("/api/arcjet/google-place-detail", {
                placeName: hotel?.hotel_name,
            });

            if (result?.data?.error) return;

            setPhotoUrl(result?.data);
        } catch (err) {
            console.log("Google place detail error:", err);
        }
    };

    const imageSrc =
        photoUrl ||
        (hotel?.hotel_image_url && !hotel.hotel_image_url.includes("example.com")
            ? hotel.hotel_image_url
            : "/placeholder.jpg");

    return (
        <div className="hover:scale-[1.02] transition-all cursor-pointer border rounded-xl shadow-sm bg-white overflow-hidden">
            <div className="relative h-[250px] w-full">
                <Image
                    src={imageSrc}
                    alt={hotel?.hotel_name || "Hotel Image"}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="p-4 flex flex-col gap-2">
                <h2 className="font-bold text-lg line-clamp-1">{hotel?.hotel_name}</h2>

                <p className="text-xs text-gray-500 line-clamp-2">
                    📍 {hotel?.hotel_address}
                </p>

                <div className="flex justify-between items-center">
                    <p className="text-sm text-green-700 font-medium">💵 {hotel?.price}</p>
                    <p className="text-sm font-bold">⭐ {hotel?.rating}</p>
                </div>

                <Link
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${hotel?.hotel_name},${hotel?.hotel_address}`
                    )}`}
                    target="_blank"
                    className="w-full text-center mt-2"
                >
                    <button className="w-full bg-primary/10 text-primary text-sm px-3 py-2 rounded-md border border-primary hover:bg-primary/20 transition-all">
                        View on Map
                    </button>
                </Link>
            </div>
        </div>
    );
}
export default HotelCardItem;

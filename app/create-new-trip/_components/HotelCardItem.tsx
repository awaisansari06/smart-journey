import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import type { Hotel } from "./types";

type Props = {
    hotel: Hotel;
    onSelect?: (image: string, images: string[]) => void;
};

function HotelCardItem({ hotel, onSelect }: Props) {
    const [photoUrls, setPhotoUrls] = useState<string[]>([]);

    useEffect(() => {
        if (hotel?.hotel_name) GetGooglePlaceDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hotel?.hotel_name]);

    const GetGooglePlaceDetail = async () => {
        try {
            const result = await axios.post("/api/google-place-detail", {
                placeName: hotel?.hotel_name,
            });

            if (result?.data?.error) return;

            // Handle array or legacy string response
            const data = result?.data;
            if (Array.isArray(data)) {
                setPhotoUrls(data);
            } else if (typeof data === 'string') {
                setPhotoUrls([data]);
            }
        } catch (err) {
            console.log("Google place detail error:", err);
        }
    };

    const imageSrc =
        (photoUrls.length > 0 ? photoUrls[0] : null) ||
        (hotel?.hotel_image_url && !hotel.hotel_image_url.includes("example.com")
            ? hotel.hotel_image_url
            : "/placeholder.jpg");

    return (
        <div
            onClick={() => onSelect?.(imageSrc, photoUrls.length > 0 ? photoUrls : [imageSrc])}
            className="hover:scale-[1.02] transition-all cursor-pointer border rounded-xl shadow-sm bg-white overflow-hidden group"
        >
            <div className="relative h-[180px] w-full">
                <Image
                    src={imageSrc}
                    alt={hotel?.hotel_name || "Hotel Image"}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="p-4 flex flex-col gap-2 h-[160px] justify-between">
                <div>
                    <h2 className="font-bold text-lg line-clamp-1">{hotel?.hotel_name}</h2>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                        📍 {hotel?.hotel_address}
                    </p>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-green-700 font-medium">💵 {hotel?.price_per_night}</p>
                    <p className="text-sm font-bold">⭐ {hotel?.rating}</p>
                </div>
            </div>
        </div>
    );
}
export default HotelCardItem;

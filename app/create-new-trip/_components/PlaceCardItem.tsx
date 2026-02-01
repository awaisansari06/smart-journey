import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import type { Activity } from "./types";

type Props = {
    activity: Activity;
    onSelect: (image: string, images: string[]) => void;
};

function PlaceCardItem({ activity, onSelect }: Props) {
    const [photoUrls, setPhotoUrls] = useState<string[]>([]);

    useEffect(() => {
        if (activity?.place_name) GetGooglePlaceDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activity?.place_name]);

    const GetGooglePlaceDetail = async () => {
        try {
            const result = await axios.post("/api/google-place-detail", {
                placeName: activity?.place_name,
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
        (activity?.place_image_url && !activity.place_image_url.includes("example.com")
            ? activity.place_image_url
            : "/placeholder.jpg");

    return (
        <div
            onClick={() => onSelect(imageSrc, photoUrls.length > 0 ? photoUrls : [imageSrc])}
            className="hover:scale-[1.02] transition-all cursor-pointer border rounded-xl shadow-sm bg-white overflow-hidden group"
        >
            <div className="relative h-[180px] w-full">
                <Image
                    src={imageSrc}
                    alt={activity?.place_name || "Place Image"}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="p-4 flex flex-col gap-2 h-[160px] justify-between">
                <div>
                    <h2 className="font-bold text-lg line-clamp-1">{activity?.place_name}</h2>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                        {activity?.place_details}
                    </p>
                </div>
                <div className="flex flex-col gap-1 mt-2">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-blue-600 font-medium truncate">🎫 {activity?.ticket_pricing}</p>
                        <p className="text-sm text-yellow-600 shrink-0">⭐ 4.5</p>
                    </div>
                    <p className="text-xs text-orange-600 truncate">⏰ {activity?.time_travel_each_location}</p>
                </div>
            </div>
        </div>
    );
}
export default PlaceCardItem;

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import type { Activity } from "./types";

type Props = {
    activity: Activity;
};

function PlaceCardItem({ activity }: Props) {
    const [photoUrl, setPhotoUrl] = useState<string>();

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

            setPhotoUrl(result?.data);
        } catch (err) {
            console.log("Google place detail error:", err);
        }
    };

    const imageSrc =
        photoUrl ||
        (activity?.place_image_url && !activity.place_image_url.includes("example.com")
            ? activity.place_image_url
            : "/placeholder.jpg");

    return (
        <div className="hover:scale-[1.02] transition-all cursor-pointer border rounded-xl shadow-sm bg-white overflow-hidden">
            <div className="relative h-[250px] w-full">
                <Image
                    src={imageSrc}
                    alt={activity?.place_name || "Place Image"}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="p-4 flex flex-col gap-2">
                <h2 className="font-bold text-lg line-clamp-1">{activity?.place_name}</h2>

                <p className="text-xs text-gray-500 line-clamp-2">
                    {activity?.place_details}
                </p>

                <div className="flex flex-col gap-1">
                    <p className="text-sm text-blue-600 font-medium">🎫 {activity?.ticket_pricing}</p>
                    <p className="text-sm text-orange-600">⏰ {activity?.time_travel_each_location}</p>
                    <p className="text-sm text-yellow-600">⭐ {activity?.best_time_to_visit}</p>
                </div>

                <Link
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${activity?.place_name},${activity?.place_address}`
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
export default PlaceCardItem;

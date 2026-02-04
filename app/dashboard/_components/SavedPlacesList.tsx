"use client";

import React, { useContext, useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { UserDetailContext } from '@/context/UserDetailContext';
import HotelCardItem from '@/app/create-new-trip/_components/HotelCardItem';
import PlaceCardItem from '@/app/create-new-trip/_components/PlaceCardItem';
import TripItemModal from '@/app/create-new-trip/_components/TripItemModal';
import { ModalItem } from '@/app/create-new-trip/_components/types';
import { Heart } from 'lucide-react';

function SavedPlacesList() {
    const { userDetail } = useContext(UserDetailContext);
    const [selectedItem, setSelectedItem] = useState<ModalItem | null>(null);

    // Fetch Saved Places
    const savedPlaces = useQuery(api.savedPlaces.GetSavedPlaces,
        userDetail ? { userId: userDetail.email } : "skip"
    );

    return (
        <div className="mt-10 p-6 rounded-2xl bg-white/40 border border-white/40 shadow-sm backdrop-blur-sm">
            <h2 className='text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2'>
                <Heart className="w-5 h-5 text-red-500 fill-current" />
                Saved Places
                <span className="text-sm font-normal text-gray-400 ml-2">Favorites from your trips</span>
            </h2>

            {(!savedPlaces || savedPlaces.length === 0) ? (
                <div className="flex flex-col items-center justify-center py-10 text-center border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl bg-white/30 dark:bg-white/5">
                    <div className="p-4 bg-gray-100 dark:bg-white/10 rounded-full mb-3">
                        <Heart className="w-6 h-6 text-gray-400" />
                    </div>
                    <h3 className="text-gray-600 dark:text-gray-300 font-medium">No saved places yet</h3>
                    <p className="text-sm text-gray-400 mt-1 max-w-xs">Like hotels and places during your trip generation to save them here.</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {savedPlaces.map((place: any, index: number) => {
                        // Map ModalItem (metadata) back to component-specific types to fix UI rendering
                        const hotelData = {
                            hotel_name: place.metadata.title,
                            hotel_address: place.metadata.subtitle,
                            price_per_night: place.metadata.price,
                            hotel_image_url: place.metadata.imageUrl,
                            geo_coordinates: typeof place.metadata.geoCoordinates === 'object'
                                ? place.metadata.geoCoordinates
                                : { lat: 0, lng: 0 },
                            rating: Number(place.metadata.rating),
                            description: place.metadata.description
                        };

                        const activityData = {
                            place_name: place.metadata.title,
                            place_details: place.metadata.description,
                            place_image_url: place.metadata.imageUrl,
                            place_address: place.metadata.subtitle,
                            ticket_pricing: place.metadata.price,
                            time_travel_each_location: place.metadata.duration || "N/A",
                            best_time_to_visit: place.metadata.bestTime || "N/A",
                            geo_coordinates: typeof place.metadata.geoCoordinates === 'object'
                                ? place.metadata.geoCoordinates
                                : { lat: 0, lng: 0 }
                        };

                        return (
                            <div key={index} className="relative group transition-all duration-300 hover:scale-[1.02]">
                                {/* Country/Context Badge */}
                                {place.metadata.countryName && (
                                    <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-md text-white px-3 py-1 text-[10px] font-bold rounded-full border border-white/20 shadow-lg uppercase tracking-wider">
                                        {place.metadata.countryName}
                                    </div>
                                )}

                                {place.placeType === 'hotel' ? (
                                    <HotelCardItem
                                        hotel={hotelData}
                                        onSelect={(imageUrl, images) =>
                                            setSelectedItem({
                                                ...place.metadata,
                                                imageUrl: imageUrl,
                                                images: images && images.length > 0 ? images : [imageUrl]
                                            })
                                        }
                                    />
                                ) : (
                                    <PlaceCardItem
                                        activity={activityData}
                                        onSelect={(imageUrl, images) =>
                                            setSelectedItem({
                                                ...place.metadata,
                                                imageUrl: imageUrl,
                                                images: images && images.length > 0 ? images : [imageUrl]
                                            })
                                        }
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            <TripItemModal
                isOpen={!!selectedItem}
                onClose={() => setSelectedItem(null)}
                item={selectedItem}
            />
        </div>
    );
}

export default SavedPlacesList;

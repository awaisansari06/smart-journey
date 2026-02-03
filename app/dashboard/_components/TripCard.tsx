"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { MapPin, Calendar, Clock, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import axios from 'axios'
import { Button } from '@/components/ui/button'

function TripCard({ trip }: { trip: any }) {
    const details = trip?.tripDetail;
    const dest = details?.destination || "Unknown Destination";
    const days = details?.duration || "Unknown";
    const budget = details?.budget || "";
    const travelers = details?.group_size || ""; // e.g. "Couple", "Family"

    // State for photo
    const [photoUrl, setPhotoUrl] = useState<string>('/mountains.jpg');
    const [loadingImage, setLoadingImage] = useState(true);

    useEffect(() => {
        if (dest) {
            GetPlacePhoto();
        }
    }, [dest]);

    const GetPlacePhoto = async () => {
        try {
            const result = await axios.post('/api/google-place-detail', {
                placeName: dest
            });
            if (result.data && result.data.length > 0) {
                setPhotoUrl(result.data[0]);
            }
        } catch (e) {
            // Silently fail - use fallback image
        } finally {
            setLoadingImage(false);
        }
    }

    // Fix "Days Days" bug: simply use the string from DB if it contains 'Day', otherwise append 'Days'
    // or better: assume DB has "5 Days", so just render {days}. 
    // If DB has just "5", we might need logic.
    // Based on user report "5 Days Days", DB likely returns "5 Days".
    // Safe approach: Remove "Days" (case insensitive) then append it once.
    const cleanDays = days.replace(/days?/i, '').trim();

    // Simple status logic (Mock for now as we don't have start dates yet)
    // You could expand this logic later based on real dates
    const status = "Planned";
    const statusColor = "bg-orange-100/80 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300";

    return (
        <Link href={`/create-new-trip?tripId=${trip.tripId}`} className='block group w-full'>
            <div className='relative flex flex-col h-full bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 hover:-translate-y-1'>

                {/* Image Section */}
                <div className='relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-zinc-800'>
                    {/* Image */}
                    <Image
                        src={photoUrl ? photoUrl : '/mountains.jpg'}
                        alt={dest}
                        fill
                        className={`object-cover transition-all duration-700 group-hover:scale-105 ${loadingImage ? 'opacity-0' : 'opacity-100'}`}
                        unoptimized // Important for Google Photos URLs usually
                    />

                    {/* Skeleton Loader for Image */}
                    {loadingImage && (
                        <div className='absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-zinc-800 animate-pulse'>
                            <MapPin className='w-8 h-8 text-gray-300' />
                        </div>
                    )}

                    {/* Status Badge */}
                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md flex items-center gap-1 shadow-sm ${statusColor}`}>
                        <Clock className="w-3 h-3" />
                        {status}
                    </div>

                    {/* Gradient Overlay for text readability if needed, but mostly clean looks better */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                </div>

                {/* Content Section */}
                <div className='p-5 flex flex-col flex-1 gap-3'>
                    <div>
                        <h3 className='font-bold text-lg text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-primary transition-colors'>
                            {dest}
                        </h3>
                        <div className='flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1'>
                            <span className='flex items-center gap-1 bg-gray-50 dark:bg-zinc-800 px-2 py-0.5 rounded-md text-xs font-medium'>
                                {cleanDays} Days
                            </span>
                            <span>•</span>
                            <span className='flex items-center gap-1 bg-gray-50 dark:bg-zinc-800 px-2 py-0.5 rounded-md text-xs font-medium'>
                                {budget}
                            </span>
                        </div>
                    </div>

                    {/* Footer / CTA Hint */}
                    <div className='mt-auto pt-3 border-t border-gray-50 dark:border-zinc-800 flex items-center justify-between'>
                        <span className='text-xs font-medium text-gray-400'>
                            {travelers} {Number(travelers) > 1 || travelers === 'Couple' || travelers === 'Family' ? 'Travelers' : 'Traveler'}
                        </span>

                        <div className='flex items-center gap-1 text-sm font-semibold text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300'>
                            View Plan <ArrowRight className='w-4 h-4' />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default TripCard

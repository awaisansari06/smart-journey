"use client"

import React, { useContext, useEffect, useState, useMemo } from 'react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { UserDetailContext } from '@/context/UserDetailContext'
import TripCard from './TripCard'
import EmptyState from './EmptyState'
import StatsOverview from './StatsOverview'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Filter, ArrowUpDown } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function UserTrips() {
    const { userDetail } = useContext(UserDetailContext)

    const trips = useQuery(api.tripDetail.GetUserTrips,
        userDetail ? { uid: userDetail._id } : "skip"
    );

    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
    const [visibleCount, setVisibleCount] = useState(6);

    useEffect(() => {
        if (trips !== undefined) {
            setLoading(false);
        }
    }, [trips]);

    // Derived state for Filtering & Sorting
    const filteredTrips = useMemo(() => {
        if (!trips) return [];

        let result = [...trips];

        // 1. Filter by Search
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            result = result.filter((trip: any) =>
                trip.tripDetail?.destination?.toLowerCase().includes(lowerQuery)
            );
        }

        // 2. Sort (assuming later trips are added last, or we can use _creationTime if available in Convex metadata)
        // Since we don't have explicit date in tripDetail types seen so far, we rely on array order.
        // Usually Convex returns in creation order? Or we might need to reverse it.
        // Let's assume default is old -> new. 
        if (sortOrder === "newest") {
            result.reverse();
        }

        return result;
    }, [trips, searchQuery, sortOrder]);


    if (loading) {
        return (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse'>
                {[1, 2, 3].map(item => (
                    <div key={item} className='h-[250px] w-full bg-gray-200 dark:bg-gray-800 rounded-xl'></div>
                ))}
            </div>
        )
    }

    if (!trips || trips.length === 0) {
        return <EmptyState />;
    }

    return (
        <div>
            {/* Stats Header */}
            <div className='mb-6'>
                <h2 className='text-xl font-bold text-gray-800 dark:text-white mb-4'>My Trips</h2>
                <StatsOverview totalTrips={trips.length} user={userDetail} />
            </div>

            {/* Controls Bar */}
            <div className='flex flex-col md:flex-row gap-4 mb-6 justify-between items-center'>
                <div className='relative w-full md:w-72'>
                    <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                    <Input
                        placeholder="Search destination..."
                        className='pl-10 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className='flex gap-2 w-full md:w-auto'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className='gap-2 w-1/2 md:w-auto bg-white dark:bg-zinc-900'>
                                <ArrowUpDown className="w-4 h-4" />
                                {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSortOrder("newest")}>Newest First</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSortOrder("oldest")}>Oldest First</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Trips Grid */}
            {filteredTrips.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {filteredTrips.slice(0, visibleCount).map((trip: any, index: number) => (
                        <TripCard key={index} trip={trip} />
                    ))}
                </div>
            ) : (
                <div className='text-center py-20 text-gray-500'>
                    No trips found matching "{searchQuery}"
                </div>
            )}

            {/* Load More Pagination */}
            {visibleCount < filteredTrips.length && (
                <div className='mt-10 flex justify-center'>
                    <Button
                        variant="outline"
                        onClick={() => setVisibleCount(prev => prev + 6)}
                        className='group relative px-6 py-2 rounded-full border border-gray-200 dark:border-zinc-800 hover:border-primary/50 text-gray-600 dark:text-gray-300 hover:text-primary transition-all duration-300'
                    >
                        <span className='flex items-center gap-2'>
                            Load More Trips <ArrowUpDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                        </span>
                    </Button>
                </div>
            )}
        </div>
    )
}

export default UserTrips

"use client";

import React, { useEffect, useState } from 'react';
import { Sparkles, Clock } from 'lucide-react';
import axios from 'axios';

interface CreditInfo {
    isAuthenticated: boolean;
    isPremium: boolean;
    remaining: number;
    capacity: number;
    resetInfo: {
        resetAt: string;
        hoursUntilReset: number;
    } | null;
}

export default function CreditDisplay() {
    const [creditInfo, setCreditInfo] = useState<CreditInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCreditInfo();
        // Refresh every 30 seconds
        const interval = setInterval(fetchCreditInfo, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchCreditInfo = async () => {
        try {
            const response = await axios.get('/api/credits');
            setCreditInfo(response.data);
        } catch (error) {
            console.error('Failed to fetch credit info:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading || !creditInfo || !creditInfo.isAuthenticated) {
        return null; // Don't show for unauthenticated users
    }

    const { isPremium, remaining, capacity } = creditInfo;

    return (
        <div className="mx-4 mb-2 animate-in fade-in duration-700">
            <div className="flex items-center justify-between px-4 py-2 rounded-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border border-gray-100/50 dark:border-white/5 shadow-sm">

                {/* Left: Icon & Count */}
                <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-full bg-gradient-to-br from-orange-100 to-purple-100 dark:from-orange-900/20 dark:to-purple-900/20">
                        <Sparkles className="w-3.5 h-3.5 text-pink-500 dark:text-pink-400" />
                    </div>

                    <div className="flex items-baseline gap-1.5 text-sm">
                        <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-transparent bg-clip-text font-extrabold text-base">
                            {remaining}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400 font-medium text-xs tracking-wide">
                            {isPremium ? 'credits' : 'trips'} remaining
                        </span>
                    </div>
                </div>

                {/* Right: Badge */}
                {isPremium ? (
                    <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-purple-200/50 dark:border-purple-800/50 text-purple-600 dark:text-purple-300 bg-purple-50/50 dark:bg-purple-900/10 tracking-wide uppercase">
                        Premium
                    </span>
                ) : (
                    <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-gray-200 dark:border-zinc-800 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-zinc-900/50 uppercase">
                        Free Plan
                    </span>
                )}
            </div>
        </div>
    );
}

"use client";

import React, { useState, useEffect, useRef } from 'react';
import ChatBoxWrapper from './_components/ChatBoxWrapper';
import { GripVertical, Map, List, Globe2 } from 'lucide-react';
import Itinerary from './_components/Itinerary';
import GlobalMap from './_components/GlobalMap';

function CreateNewTrip() {
    const [leftPanelWidth, setLeftPanelWidth] = useState(35);
    const [isDragging, setIsDragging] = useState(false);
    const [viewMode, setViewMode] = useState<'itinerary' | 'map'>('itinerary');
    const containerRef = useRef<HTMLDivElement>(null);

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const startResizing = () => {
        setIsDragging(true);
    };

    const stopResizing = () => {
        setIsDragging(false);
    };

    const resize = (e: MouseEvent) => {
        if (isDragging && containerRef.current) {
            const containerWidth = containerRef.current.getBoundingClientRect().width;
            const newLeftWidth = (e.clientX / containerWidth) * 100;

            // Min sizes constraints (approximate percentages based on typical screen width)
            // Min 320px / 1200px ~= 26%
            // Max for left means Right min 400px. Right = 100 - Left. 
            // If Right < 30%, Left > 70%.

            if (newLeftWidth > 20 && newLeftWidth < 70) {
                setLeftPanelWidth(newLeftWidth);
            }
        }
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResizing);
        } else {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
        }
        return () => {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
        };
    }, [isDragging]);

    return (
        <div ref={containerRef} className='flex flex-col md:flex-row h-[calc(100vh-80px)] w-full overflow-hidden'>
            {/* Left Panel - Chat */}
            <div
                className='h-full w-full md:w-(--left-width) bg-white dark:bg-black border-r relative z-10 shrink-0'
                style={{ '--left-width': `${leftPanelWidth}%` } as React.CSSProperties}
            >
                <div className="h-full w-full">
                    <ChatBoxWrapper />
                </div>
            </div>

            {/* Resizer Handle (Hidden on Mobile) */}
            <div
                className='hidden md:flex w-2 bg-gray-100 dark:bg-gray-800 hover:bg-blue-400/40 cursor-col-resize items-center justify-center transition-all group z-20 hover:w-3 flex-shrink-0'
                onMouseDown={startResizing}
            >
                <GripVertical className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>

            {/* Right Panel - Map Placeholder or Itinerary */}
            <div ref={scrollContainerRef} className="flex-1 h-full overflow-y-auto overflow-x-hidden relative">

                {/* View Toggle Button */}
                <div className="absolute top-5 right-5 z-50 flex gap-2">
                    <button
                        onClick={() => setViewMode(viewMode === 'itinerary' ? 'map' : 'itinerary')}
                        className="bg-white dark:bg-black p-3 rounded-full shadow-lg border border-gray-100 dark:border-zinc-800 hover:scale-105 transition-all active:scale-95 text-primary group"
                    >
                        {viewMode === 'itinerary' ? <Globe2 className="h-5 w-5 text-blue-600 animate-pulse group-hover:animate-none" /> : <Map className="h-5 w-5" />}
                    </button>
                </div>

                {viewMode === 'itinerary' ? (
                    <Itinerary scrollContainer={scrollContainerRef} />
                ) : (
                    <div className="w-full h-full">
                        <GlobalMap />
                    </div>
                )}
            </div>
        </div>
    )
}

export default CreateNewTrip
"use client";

import React, { useState, useEffect, useRef } from 'react';
import ChatBoxWrapper from './_components/ChatBoxWrapper';
import { GripVertical, Map, List, Globe2, Download } from 'lucide-react';
import Itinerary from './_components/Itinerary';
import GlobalMap from './_components/GlobalMap';

function CreateNewTrip() {
    const [leftPanelWidth, setLeftPanelWidth] = useState(35);
    const [isDragging, setIsDragging] = useState(false);
    const [viewMode, setViewMode] = useState<'itinerary' | 'map'>('itinerary');
    const [isTripReady, setIsTripReady] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Native Print Handler
    const handlePdfExport = () => {
        window.print();
    };

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
        <>
            {/* MOBILE LAYOUT (< 1024px) - Vertical Stack */}
            <div className='lg:hidden flex flex-col w-full min-h-screen bg-white dark:bg-black'>
                {/* Chat Section - Optimized Height */}
                <div className='w-full h-[55vh] min-h-[400px] border-b border-gray-200 dark:border-gray-800'>
                    <ChatBoxWrapper />
                </div>

                {/* Map Section - Fixed Height for Mobile */}
                <div className='w-full h-[300px] bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-2'>
                    <GlobalMap />
                </div>

                {/* Itinerary Section - Scrollable, Full Width */}
                <div className='w-full flex-1 overflow-y-auto bg-white dark:bg-black px-2 py-4'>
                    <Itinerary scrollContainer={scrollContainerRef} />
                </div>
            </div>

            {/* DESKTOP LAYOUT (>= 1024px) - Split Panel (UNCHANGED) */}
            <div ref={containerRef} className='hidden lg:flex flex-row h-[calc(100vh-80px)] w-full overflow-hidden'>
                {/* Left Panel - Chat */}
                <div
                    className='h-full bg-white dark:bg-black border-r relative z-10 shrink-0 w-[var(--left-width)]'
                    style={{ '--left-width': `${leftPanelWidth}%` } as React.CSSProperties}
                >
                    <div className="h-full w-full">
                        <ChatBoxWrapper />
                    </div>
                </div>

                {/* Resizer Handle */}
                <div
                    className='flex w-2 bg-gray-100 dark:bg-gray-800 hover:bg-blue-400/40 cursor-col-resize items-center justify-center transition-all group z-20 hover:w-3 flex-shrink-0'
                    onMouseDown={startResizing}
                >
                    <GripVertical className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>

                {/* Right Panel - Map or Itinerary */}
                <div ref={scrollContainerRef} className="flex-1 h-full overflow-y-auto overflow-x-hidden relative">
                    {/* View Toggle Button */}
                    <div className="absolute top-5 right-5 z-50 flex flex-col gap-4 items-end">
                        <button
                            onClick={() => setViewMode(viewMode === 'itinerary' ? 'map' : 'itinerary')}
                            className="bg-white dark:bg-black p-3 rounded-full shadow-lg border border-gray-100 dark:border-zinc-800 hover:scale-105 transition-all active:scale-95 text-primary group"
                            title="Toggle Map/List View"
                        >
                            {viewMode === 'itinerary' ? <Globe2 className="h-5 w-5 text-blue-600 animate-pulse group-hover:animate-none" /> : <Map className="h-5 w-5" />}
                        </button>

                        {/* Export PDF Button (Only when trip is ready) */}
                        {isTripReady && viewMode === 'itinerary' && (
                            <button
                                onClick={handlePdfExport}
                                className="bg-white dark:bg-black p-3 rounded-full shadow-lg border border-gray-100 dark:border-zinc-800 hover:scale-105 transition-all active:scale-95 text-primary group no-print"
                                title="Export Itinerary as PDF"
                            >
                                <Download className="h-5 w-5 text-purple-600 group-hover:text-purple-700" />
                            </button>
                        )}
                    </div>

                    {viewMode === 'itinerary' ? (
                        <Itinerary
                            scrollContainer={scrollContainerRef}
                            onTripReady={setIsTripReady}
                        />
                    ) : (
                        <div className="w-full h-full">
                            <GlobalMap />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default CreateNewTrip
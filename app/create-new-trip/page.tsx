"use client";

import React, { useState, useEffect, useRef } from 'react';
import ChatBox from './_components/ChatBox';
import { GripVertical } from 'lucide-react';
import Itinerary from './_components/Itinerary';

function CreateNewTrip() {
    const [leftPanelWidth, setLeftPanelWidth] = useState(45);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

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
                className='h-full w-full md:w-(--left-width) overflow-hidden bg-white dark:bg-black border-r relative z-10'
                style={{ '--left-width': `${leftPanelWidth}%` } as React.CSSProperties}
            >
                <div className="h-full w-full">
                    <ChatBox />
                </div>
            </div>

            {/* Resizer Handle (Hidden on Mobile) */}
            <div
                className='hidden md:flex w-2 bg-gray-100 dark:bg-gray-800 hover:bg-blue-400/40 cursor-col-resize items-center justify-center transition-all group z-20 hover:w-3'
                onMouseDown={startResizing}
            >
                <GripVertical className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>

            {/* Right Panel - Map Placeholder */}
            <div>
                <Itinerary />
            </div>
        </div>
    )
}

export default CreateNewTrip
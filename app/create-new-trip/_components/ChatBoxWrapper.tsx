"use client";

import { Suspense } from 'react';
import ChatBox from './ChatBox';

export default function ChatBoxWrapper() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
            <ChatBox />
        </Suspense>
    );
}

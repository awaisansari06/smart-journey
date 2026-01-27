import React from 'react';
import { cn } from '@/lib/utils';
import { User, Users, Home, PartyPopper } from 'lucide-react';

export const SelectTravelesList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'Solo traveler',
        icon: User,
        value: 'Solo'
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two travelers in tandem',
        icon: Users,
        value: 'Couple'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun loving adv',
        icon: Home,
        value: 'Family'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekes',
        icon: PartyPopper,
        value: 'Friends'
    }
]

interface UiProps {
    onSelect: (value: string) => void;
    selected?: string;
    disabled?: boolean;
}

function GroupSizeUi({ onSelect, selected, disabled }: UiProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {SelectTravelesList.map((item) => (
                <div
                    key={item.id}
                    onClick={() => !disabled && onSelect(item.value)}
                    className={cn(
                        "p-4 border rounded-xl cursor-pointer hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-2 bg-white dark:bg-gray-800",
                        selected === item.value && "border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-500",
                        disabled && "opacity-50 cursor-not-allowed"
                    )}
                >
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                        <item.icon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    </div>
                    <h2 className="font-bold text-sm text-gray-800 dark:text-gray-200">{item.title}</h2>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                    {selected === item.value && (
                        <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default GroupSizeUi;

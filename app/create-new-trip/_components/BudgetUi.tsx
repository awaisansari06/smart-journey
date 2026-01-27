import React from 'react';
import { cn } from '@/lib/utils';
import { Wallet, PiggyBank, CircleDollarSign } from 'lucide-react';

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: Wallet,
        color: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
        borderColor: 'border-green-500',
        ringColor: 'ring-green-500',
        value: 'Low'
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: PiggyBank,
        color: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400',
        borderColor: 'border-yellow-500',
        ringColor: 'ring-yellow-500',
        value: 'Medium'
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Don\'t worry about cost',
        icon: CircleDollarSign,
        color: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
        borderColor: 'border-purple-500',
        ringColor: 'ring-purple-500',
        value: 'High'
    }
]

interface UiProps {
    onSelect: (value: string) => void;
    selected?: string;
    disabled?: boolean;
}

function BudgetUi({ onSelect, selected, disabled }: UiProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {SelectBudgetOptions.map((item) => (
                <div
                    key={item.id}
                    onClick={() => !disabled && onSelect(item.value)}
                    className={cn(
                        "p-4 border rounded-xl cursor-pointer hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-2 bg-white dark:bg-gray-800",
                        selected === item.value && cn("border-2 bg-opacity-50", item.borderColor, item.ringColor, "ring-1"),
                        disabled && "opacity-50 cursor-not-allowed"
                    )}
                >
                    <div className={cn("p-2 rounded-full", item.color)}>
                        <item.icon className="h-6 w-6" />
                    </div>
                    <h2 className="font-bold text-lg text-gray-800 dark:text-gray-200">{item.title}</h2>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                    {selected === item.value && (
                        <div className={cn("absolute top-2 right-2 text-white rounded-full p-1", item.color.split(' ')[0].replace('bg-', 'bg-').replace('-100', '-500'))}>
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

export default BudgetUi;

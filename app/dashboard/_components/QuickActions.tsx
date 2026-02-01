import React from 'react'
import Link from 'next/link'
import { Plus, Compass, Map, Palmtree } from 'lucide-react'

function QuickActions() {
    const actions = [
        {
            name: "Create Trip",
            icon: Plus,
            href: "/create-new-trip",
            color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
        },
        {
            name: "Inspire Me",
            icon: Compass,
            href: "/create-new-trip?type=inspire",
            color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
        },
        {
            name: "Hidden Gems",
            icon: Map,
            href: "/create-new-trip?type=hidden-gems",
            color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
        },
        {
            name: "Adventure",
            icon: Palmtree,
            href: "/create-new-trip?type=adventure",
            color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
        }
    ]

    return (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
            {actions.map((action, index) => (
                <Link key={index} href={action.href} className='flex flex-col items-center justify-center p-4 rounded-xl bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:shadow-md transition-all hover:scale-[1.02] cursor-pointer backdrop-blur-sm'>
                    <div className={`p-3 rounded-full mb-3 ${action.color}`}>
                        <action.icon className='w-5 h-5' />
                    </div>
                    <h3 className='font-medium text-sm text-gray-700 dark:text-gray-300'>{action.name}</h3>
                </Link>
            ))}
        </div>
    )
}

export default QuickActions

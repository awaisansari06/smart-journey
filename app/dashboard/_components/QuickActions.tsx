import React from 'react'
import Link from 'next/link'
import { Plus, Compass, Map, Palmtree } from 'lucide-react'

function QuickActions() {
    const actions = [
        {
            name: "Create Trip",
            icon: Plus,
            href: "/create-new-trip",
            color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
            hoverBg: "group-hover:bg-blue-50/80 dark:group-hover:bg-blue-900/20"
        },
        {
            name: "Inspire Me",
            icon: Compass,
            href: "/create-new-trip?type=inspire",
            color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
            hoverBg: "group-hover:bg-orange-50/80 dark:group-hover:bg-orange-900/20"
        },
        {
            name: "Hidden Gems",
            icon: Map,
            href: "/create-new-trip?type=hidden-gems",
            color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
            hoverBg: "group-hover:bg-purple-50/80 dark:group-hover:bg-purple-900/20"
        },
        {
            name: "Adventure",
            icon: Palmtree,
            href: "/create-new-trip?type=adventure",
            color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
            hoverBg: "group-hover:bg-green-50/80 dark:group-hover:bg-green-900/20"
        }
    ]

    return (
        <div className='relative'>
            {/* Visual Zone Title (Optional, keeping it clean as per request) */}

            {/* Container - Visual Zone */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white/40 border border-white/40 shadow-sm backdrop-blur-sm'>
                {actions.map((action, index) => (
                    <Link
                        key={index}
                        href={action.href}
                        className={`group relative flex flex-col items-center justify-center p-4 rounded-xl border border-transparent hover:border-white/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer overflow-hidden ${action.hoverBg}`}
                    >
                        {/* Soft tint background on hover is handled by hoverBg class */}

                        <div className={`p-3 rounded-full mb-3 ${action.color} transition-transform group-hover:scale-110 duration-300`}>
                            <action.icon className='w-5 h-5' />
                        </div>
                        <h3 className='font-medium text-sm text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors'>{action.name}</h3>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default QuickActions
